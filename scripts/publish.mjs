import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const approvedOrigins = new Set([
  'https://github.com/karuhanga/latent-threads.git',
  'https://github.com/karuhanga/latent-threads',
  'git@github.com:karuhanga/latent-threads.git',
  'ssh://git@github.com/karuhanga/latent-threads.git',
]);
const branchRef = 'refs/heads/gh-pages';

function run(command, args, cwd, { capture = false, accepted = [0] } = {}) {
  const env = { ...process.env };
  // A caller's alternate index/worktree must not escape the owned checkout.
  for (const key of ['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_COMMON_DIR']) delete env[key];
  const result = spawnSync(command, args, { cwd, env, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit' });
  if (result.error) throw new Error(`Cannot run ${command}: ${result.error.message}`);
  if (!accepted.includes(result.status)) {
    const detail = capture ? result.stderr?.trim() : '';
    throw new Error(`${command} ${args[0] ?? ''} failed (${result.status ?? result.signal})${detail ? `: ${detail}` : ''}`);
  }
  return { status: result.status, output: result.stdout?.trim() ?? '' };
}
const git = (cwd, args, options) => run('git', args, cwd, { capture: true, ...options });

export function inspectSource(directory, expectedCommit) {
  const root = git(directory, ['rev-parse', '--show-toplevel']).output;
  const sourceCommit = git(root, ['rev-parse', '--verify', 'HEAD^{commit}']).output;
  if (expectedCommit && sourceCommit !== expectedCommit) throw new Error('Source HEAD changed during publishing. Review and rerun.');
  if (git(root, ['status', '--porcelain', '--untracked-files=all', '--ignore-submodules=none']).output) {
    throw new Error('Source must be clean and committed, including untracked files. Commit reviewed work before publishing.');
  }
  git(root, ['ls-files', '--error-unmatch', '--', 'package.json', 'pnpm-lock.yaml', '.node-version']);
  const fetchUrls = git(root, ['remote', 'get-url', '--all', 'origin']).output.split('\n');
  const pushUrls = git(root, ['remote', 'get-url', '--all', '--push', 'origin']).output.split('\n');
  if (fetchUrls.length !== 1 || pushUrls.length !== 1 || !approvedOrigins.has(fetchUrls[0]) || !approvedOrigins.has(pushUrls[0])) {
    throw new Error('origin must point only to the approved karuhanga/latent-threads GitHub repository.');
  }
  return { root, sourceCommit, remoteUrl: pushUrls[0] };
}

function allowedFile(path, deployed) {
  if (['index.html', 'favicon.svg', 'favicon.ico'].includes(path)) return true;
  if (deployed && ['.nojekyll', 'release.json'].includes(path)) return true;
  return /^assets\/[A-Za-z0-9_-][A-Za-z0-9._-]*\.(?:js|css|svg|png|jpe?g|webp|avif|gif|ico|woff2?|ttf|otf)$/.test(path);
}

/** Explicit allowlist: extend with review when the app gains a new asset format. */
export function collectOutput(directory, { deployed = false } = {}) {
  const rootStat = lstatSync(directory);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) throw new Error('Output must be a real directory, not a symlink.');
  const files = [];
  function visit(current) {
    for (const name of readdirSync(current).sort()) {
      const path = join(current, name);
      const key = relative(directory, path).split(sep).join('/');
      if (deployed && key === '.git') continue;
      const stat = lstatSync(path);
      if (stat.isSymbolicLink()) throw new Error(`Symlink rejected in output: ${key}`);
      if (stat.isDirectory()) {
        if (key !== 'assets') throw new Error(`Unexpected output directory: ${key}`);
        visit(path);
      } else if (stat.isFile() && allowedFile(key, deployed)) files.push(key);
      else throw new Error(`Unexpected output file: ${key}`);
    }
  }
  visit(directory);
  if (!files.includes('index.html') || !readFileSync(join(directory, 'index.html'), 'utf8').trim()) throw new Error('Output needs a nonempty index.html.');
  return files;
}

function copyOutput(from, to, files) {
  for (const file of files) {
    const destination = join(to, file);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(join(from, file), destination);
  }
}

/** Builds only the committed snapshot. It never reads an existing workspace dist. */
export function prepareRelease({ sourceDirectory = process.cwd(), packageManager = 'pnpm' } = {}) {
  const source = inspectSource(sourceDirectory);
  const temporaryDirectory = mkdtempSync(join(tmpdir(), 'latent-threads-publish-'));
  const buildDirectory = join(temporaryDirectory, 'source');
  const siteDirectory = join(temporaryDirectory, 'site');
  try {
    git(temporaryDirectory, ['clone', '--quiet', '--no-hardlinks', '--no-checkout', '--', source.root, buildDirectory]);
    git(buildDirectory, ['checkout', '--quiet', '--detach', source.sourceCommit]);
    const pinnedNode = readFileSync(join(buildDirectory, '.node-version'), 'utf8').trim();
    if (process.versions.node !== pinnedNode) throw new Error(`Use the pinned Node ${pinnedNode}; running ${process.versions.node}.`);
    const pkg = JSON.parse(readFileSync(join(buildDirectory, 'package.json'), 'utf8'));
    const expectedPnpm = /^pnpm@(\d+\.\d+\.\d+)$/.exec(pkg.packageManager ?? '')?.[1];
    if (!expectedPnpm) throw new Error('packageManager must pin an exact pnpm version.');
    if (run(packageManager, ['--version'], buildDirectory, { capture: true }).output !== expectedPnpm) throw new Error(`Use pinned pnpm ${expectedPnpm}.`);
    if (!pkg.scripts?.check) throw new Error('A committed check script is required.');
    // Only this new, owned clone is cleaned. User workspace output is never removed.
    rmSync(join(buildDirectory, 'dist'), { recursive: true, force: true });
    console.log(`Checking source ${source.sourceCommit}`);
    run(packageManager, ['install', '--frozen-lockfile'], buildDirectory);
    // The committed check pipeline validates data, typechecks, tests, and builds.
    run(packageManager, ['run', 'check'], buildDirectory);
    if (git(buildDirectory, ['status', '--porcelain', '--untracked-files=all', '--ignore-submodules=none']).output) throw new Error('Install/check changed source files in the isolated build.');
    if (git(buildDirectory, ['rev-parse', 'HEAD']).output !== source.sourceCommit) throw new Error('Build changed its source revision.');
    const dist = join(buildDirectory, 'dist');
    const files = collectOutput(dist);
    mkdirSync(siteDirectory);
    copyOutput(dist, siteDirectory, files);
    writeFileSync(join(siteDirectory, '.nojekyll'), '');
    writeFileSync(join(siteDirectory, 'release.json'), `${JSON.stringify({ sourceCommit: source.sourceCommit }, null, 2)}\n`);
    const current = inspectSource(source.root, source.sourceCommit);
    if (current.remoteUrl !== source.remoteUrl) throw new Error('origin changed during the build.');
    rmSync(buildDirectory, { recursive: true, force: true });
    return { ...source, temporaryDirectory, siteDirectory, files: collectOutput(siteDirectory, { deployed: true }) };
  } catch (error) {
    rmSync(temporaryDirectory, { recursive: true, force: true });
    throw error;
  }
}

/** Prepares a child commit in an owned checkout; does not push. Exported for local-remote tests. */
export function stageDeployment({ siteDirectory, deploymentDirectory, remoteUrl, sourceCommit, identity }) {
  if (existsSync(deploymentDirectory)) throw new Error('Deployment checkout must be a new owned directory.');
  const files = collectOutput(siteDirectory, { deployed: true });
  const release = JSON.parse(readFileSync(join(siteDirectory, 'release.json'), 'utf8'));
  if (release.sourceCommit !== sourceCommit || !files.includes('.nojekyll')) throw new Error('Release provenance/marker does not match the built source.');
  mkdirSync(deploymentDirectory);
  git(deploymentDirectory, ['init', '--quiet']);
  git(deploymentDirectory, ['remote', 'add', 'origin', remoteUrl]);
  const lookup = git(deploymentDirectory, ['ls-remote', '--exit-code', '--heads', 'origin', branchRef], { accepted: [0, 2] });
  const existing = lookup.status === 0;
  if (existing) {
    git(deploymentDirectory, ['fetch', '--quiet', '--no-tags', 'origin', `${branchRef}:refs/remotes/origin/gh-pages`]);
    git(deploymentDirectory, ['checkout', '--quiet', '-b', 'gh-pages', 'refs/remotes/origin/gh-pages']);
    // Refuse to silently replace an unrelated branch or custom-domain configuration.
    collectOutput(deploymentDirectory, { deployed: true });
    for (const name of readdirSync(deploymentDirectory)) if (name !== '.git') rmSync(join(deploymentDirectory, name), { recursive: true, force: true });
  } else git(deploymentDirectory, ['checkout', '--quiet', '--orphan', 'gh-pages']);
  copyOutput(siteDirectory, deploymentDirectory, files);
  git(deploymentDirectory, ['add', '--all']);
  const unchanged = existing && git(deploymentDirectory, ['diff', '--cached', '--quiet'], { accepted: [0, 1] }).status === 0;
  if (!unchanged) {
    if (!identity?.name || !identity?.email) throw new Error('Configure a Git author name and email before publishing.');
    git(deploymentDirectory, ['-c', `user.name=${identity.name}`, '-c', `user.email=${identity.email}`, 'commit', '--quiet', '-m', `Publish source ${sourceCommit}`]);
  }
  return { deploymentDirectory, deploymentCommit: git(deploymentDirectory, ['rev-parse', 'HEAD']).output, changed: !unchanged };
}

function main() {
  const args = process.argv.slice(2);
  if (args.some(arg => arg !== '--dry-run') || args.length > 1) throw new Error('Usage: node scripts/publish.mjs [--dry-run]');
  const dryRun = args.includes('--dry-run');
  const release = prepareRelease();
  console.log(`Review output: ${release.siteDirectory}\n${release.files.map(f => `  ${f}`).join('\n')}`);
  if (dryRun) {
    console.log('Dry run complete. No project deployment commit or GitHub publication was performed. Temporary output is retained for review.');
    return;
  }
  const author = git(release.root, ['var', 'GIT_COMMITTER_IDENT']).output.match(/^(.*) <([^>]+)> \d+ [+-]\d+$/);
  const deployment = stageDeployment({ ...release, deploymentDirectory: join(release.temporaryDirectory, 'deployment'), identity: author ? { name: author[1], email: author[2] } : undefined });
  const current = inspectSource(release.root, release.sourceCommit);
  if (current.remoteUrl !== release.remoteUrl) throw new Error('origin changed before publication.');
  if (deployment.changed) {
    // Ordinary push preserves history; concurrent remote advancement causes rejection.
    git(deployment.deploymentDirectory, ['push', '--porcelain', 'origin', `HEAD:${branchRef}`], { capture: false });
  }
  console.log(`${deployment.changed ? 'Pushed' : 'Already published'} deployment ${deployment.deploymentCommit} from source ${release.sourceCommit}.`);
  console.log('Verify the GitHub Pages result and a refreshed deep link before marking the release complete.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { console.error(`Publish failed: ${error.message}`); process.exitCode = 1; }
}
