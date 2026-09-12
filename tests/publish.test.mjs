import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { collectOutput, inspectSource, prepareRelease, stageDeployment, pushDeployment } from '../scripts/publish.mjs';

function git(cwd, ...args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, `${args[0]}: ${result.stderr}`);
  return result.stdout.trim();
}
function temporary(t) {
  const path = mkdtempSync(join(tmpdir(), 'latent-threads-publish-test-'));
  t.after(() => rmSync(path, { recursive: true, force: true }));
  return path;
}
const identity = { name: 'Publisher test', email: 'publisher-test@invalid.test' };
function sourceFixture(t) {
  const dir = temporary(t);
  const source = join(dir, 'repository'); mkdirSync(source);
  git(source, 'init', '--quiet'); git(source, 'config', 'user.name', identity.name); git(source, 'config', 'user.email', identity.email);
  git(source, 'remote', 'add', 'origin', 'https://github.com/karuhanga/latent-threads.git');
  writeFileSync(join(source, '.node-version'), `${process.versions.node}\n`);
  writeFileSync(join(source, '.gitignore'), 'dist/\nnode_modules/\n.local/\n');
  writeFileSync(join(source, 'pnpm-lock.yaml'), 'lockfileVersion: 9\n');
  writeFileSync(join(source, 'package.json'), JSON.stringify({ packageManager: 'pnpm@11.19.0', scripts: { check: 'fixture-check' } }));
  writeFileSync(join(source, 'tracked.txt'), 'reviewed source\n');
  git(source, 'add', '.'); git(source, 'commit', '--quiet', '-m', 'Source fixture');
  const packageManager = join(dir, 'pnpm-fixture');
  writeFileSync(packageManager, `#!${process.execPath}\n${String.raw`
const fs = require('node:fs');
const args = process.argv.slice(2);
if (args[0] === '--version') console.log('11.19.0');
else if (args[0] === 'install') {
  if (args[1] !== '--frozen-lockfile') process.exit(41);
  fs.mkdirSync('.local', {recursive:true}); fs.writeFileSync('.local/locked-install', 'done');
} else if (args[0] === 'run' && args[1] === 'check') {
  if (!fs.existsSync('.local/locked-install')) process.exit(42);
  if (fs.existsSync('dist')) process.exit(43);
  fs.mkdirSync('dist/assets', {recursive:true});
  fs.writeFileSync('dist/index.html', '<html>fresh reviewed build</html>');
  fs.writeFileSync('dist/assets/app-hash.js', 'console.log("built");');
} else process.exit(44);
`}`, { mode: 0o755 });
  return { dir, source, packageManager };
}

test('release preparation builds only the committed snapshot, with locked install before checks', t => {
  const { source, packageManager } = sourceFixture(t);
  mkdirSync(join(source, 'dist')); writeFileSync(join(source, 'dist', 'index.html'), 'STALE WORKSPACE BUILD');
  const release = prepareRelease({ sourceDirectory: source, packageManager });
  t.after(() => rmSync(release.temporaryDirectory, { recursive: true, force: true }));
  assert.equal(readFileSync(join(source, 'dist', 'index.html'), 'utf8'), 'STALE WORKSPACE BUILD');
  assert.match(readFileSync(join(release.siteDirectory, 'index.html'), 'utf8'), /fresh reviewed build/);
  assert.deepEqual(JSON.parse(readFileSync(join(release.siteDirectory, 'release.json'), 'utf8')), { sourceCommit: git(source, 'rev-parse', 'HEAD') });
  assert.deepEqual(release.files, ['.nojekyll', 'assets/app-hash.js', 'index.html', 'release.json']);
  assert.deepEqual(readdirSync(release.temporaryDirectory), ['site']);
  assert.equal(git(source, 'branch', '--list', 'gh-pages'), '');
});

test('source guards reject dirty files, revision changes and another publishing destination', t => {
  const { source } = sourceFixture(t);
  const initial = inspectSource(source);
  writeFileSync(join(source, 'unreviewed.txt'), 'new content');
  assert.throws(() => inspectSource(source), /clean and committed/);
  rmSync(join(source, 'unreviewed.txt'));
  writeFileSync(join(source, 'tracked.txt'), 'changed source');
  assert.throws(() => inspectSource(source), /clean and committed/);
  git(source, 'add', 'tracked.txt'); git(source, 'commit', '--quiet', '-m', 'Later revision');
  assert.throws(() => inspectSource(source, initial.sourceCommit), /HEAD changed/);
  git(source, 'remote', 'set-url', '--push', 'origin', 'https://github.com/other/project.git');
  assert.throws(() => inspectSource(source), /approved/);
});

test('output guard rejects documents, source maps and symlinks without deleting them', t => {
  const dir = temporary(t); writeFileSync(join(dir, 'index.html'), '<html>app</html>');
  writeFileSync(join(dir, 'notes.md'), 'not for deployment');
  assert.throws(() => collectOutput(dir), /Unexpected output file: notes.md/);
  assert.ok(existsSync(join(dir, 'notes.md'))); rmSync(join(dir, 'notes.md'));
  mkdirSync(join(dir, 'assets')); writeFileSync(join(dir, 'assets', 'app.js.map'), 'source map');
  assert.throws(() => collectOutput(dir), /app.js.map/); rmSync(join(dir, 'assets', 'app.js.map'));
  symlinkSync(join(dir, 'index.html'), join(dir, 'favicon.svg'));
  assert.throws(() => collectOutput(dir), /Symlink/);
});

test('local deployment keeps history, removes old assets only in its owned checkout, and never force pushes', t => {
  const dir = temporary(t); const remote = join(dir, 'remote.git');
  git(dir, 'init', '--quiet', '--bare', remote);
  const site = join(dir, 'site'); mkdirSync(site); mkdirSync(join(site, 'assets'));
  writeFileSync(join(site, 'index.html'), '<html>first</html>'); writeFileSync(join(site, '.nojekyll'), '');
  writeFileSync(join(site, 'assets', 'first.js'), 'first');
  const firstSource = 'a'.repeat(40); writeFileSync(join(site, 'release.json'), JSON.stringify({ sourceCommit: firstSource }));
  const first = stageDeployment({ siteDirectory: site, deploymentDirectory: join(dir, 'first'), remoteUrl: remote, sourceCommit: firstSource, identity });
  assert.equal(git(remote, 'for-each-ref', '--format=%(refname)'), ''); // staging alone never pushes
  git(first.deploymentDirectory, 'push', 'origin', 'HEAD:refs/heads/gh-pages');
  rmSync(join(site, 'assets', 'first.js')); writeFileSync(join(site, 'assets', 'second.js'), 'second');
  const secondSource = 'b'.repeat(40); writeFileSync(join(site, 'release.json'), JSON.stringify({ sourceCommit: secondSource }));
  const second = stageDeployment({ siteDirectory: site, deploymentDirectory: join(dir, 'second'), remoteUrl: remote, sourceCommit: secondSource, identity });
  assert.equal(git(second.deploymentDirectory, 'rev-parse', 'HEAD^'), first.deploymentCommit);
  assert.ok(existsSync(join(first.deploymentDirectory, 'assets', 'first.js')));
  assert.equal(existsSync(join(second.deploymentDirectory, 'assets', 'first.js')), false);
  git(second.deploymentDirectory, 'push', 'origin', 'HEAD:refs/heads/gh-pages');
  const third = stageDeployment({ siteDirectory: site, deploymentDirectory: join(dir, 'third'), remoteUrl: remote, sourceCommit: secondSource, identity });
  assert.equal(third.changed, false); assert.equal(third.deploymentCommit, second.deploymentCommit);
  assert.deepEqual(git(remote, 'ls-tree', '-r', '--name-only', 'gh-pages').split('\n'), ['.nojekyll', 'assets/second.js', 'index.html', 'release.json']);
  // A racing publisher must fail an ordinary push; it cannot rewrite the winner.
  writeFileSync(join(third.deploymentDirectory, 'index.html'), '<html>concurrent</html>');
  git(third.deploymentDirectory, 'add', '.');
  git(third.deploymentDirectory, '-c', `user.name=${identity.name}`, '-c', `user.email=${identity.email}`, 'commit', '--quiet', '-m', 'Concurrent update');
  git(third.deploymentDirectory, 'push', 'origin', 'HEAD:refs/heads/gh-pages');
  const rejection = spawnSync('git', ['push', 'origin', 'HEAD:refs/heads/gh-pages'], { cwd: first.deploymentDirectory, encoding: 'utf8' });
  assert.notEqual(rejection.status, 0);
});

test('existing deployment with unexpected user files is not cleared', t => {
  const dir = temporary(t); const remote = join(dir, 'remote.git'); git(dir, 'init', '--quiet', '--bare', remote);
  const site = join(dir, 'site'); mkdirSync(site);
  const sourceCommit = 'c'.repeat(40);
  writeFileSync(join(site, 'index.html'), '<html>app</html>'); writeFileSync(join(site, '.nojekyll'), ''); writeFileSync(join(site, 'release.json'), JSON.stringify({ sourceCommit }));
  const first = stageDeployment({ siteDirectory: site, deploymentDirectory: join(dir, 'first'), remoteUrl: remote, sourceCommit, identity });
  writeFileSync(join(first.deploymentDirectory, 'CNAME'), 'custom.invalid'); git(first.deploymentDirectory, 'add', '.');
  git(first.deploymentDirectory, '-c', `user.name=${identity.name}`, '-c', `user.email=${identity.email}`, 'commit', '--quiet', '-m', 'User domain');
  git(first.deploymentDirectory, 'push', 'origin', 'HEAD:refs/heads/gh-pages');
  const next = join(dir, 'next');
  assert.throws(() => stageDeployment({ siteDirectory: site, deploymentDirectory: next, remoteUrl: remote, sourceCommit, identity }), /Unexpected output file: CNAME/);
  assert.equal(readFileSync(join(next, 'CNAME'), 'utf8'), 'custom.invalid');
  assert.equal(git(remote, 'show', 'gh-pages:CNAME'), 'custom.invalid');
});

test('publication reuses the source checkout without changing HEAD, worktree or FETCH_HEAD', t => {
  const { dir, source } = sourceFixture(t);
  const remote = join(dir, 'remote.git'); git(dir, 'init', '--quiet', '--bare', remote);
  git(source, 'remote', 'set-url', 'origin', remote);
  const sourceCommit = git(source, 'rev-parse', 'HEAD');
  writeFileSync(join(source, '.git', 'FETCH_HEAD'), 'preserved fetch state\n');
  const site = join(dir, 'site'); mkdirSync(site);
  writeFileSync(join(site, 'index.html'), '<html>reviewed</html>'); writeFileSync(join(site, '.nojekyll'), '');
  writeFileSync(join(site, 'release.json'), JSON.stringify({ sourceCommit }));
  const deployment = stageDeployment({ siteDirectory: site, deploymentDirectory: join(dir, 'deployment'), remoteUrl: remote, sourceCommit, identity });
  pushDeployment(source, deployment);
  assert.equal(git(remote, 'rev-parse', 'gh-pages'), deployment.deploymentCommit);
  assert.equal(git(source, 'rev-parse', 'HEAD'), sourceCommit);
  assert.equal(git(source, 'status', '--porcelain'), '');
  assert.equal(readFileSync(join(source, '.git', 'FETCH_HEAD'), 'utf8'), 'preserved fetch state\n');
  assert.equal(git(source, 'for-each-ref', '--format=%(refname)', 'refs/latent-threads/'), '');
});
