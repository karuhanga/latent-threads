# Architecture and deployment baseline

## Decisions — 12 September 2026
**Confirmed by Lincoln:** song first, coffee second. Windows Phone is the requested visual inspiration. The PM can make reversible implementation calls and delegate bounded work.
**PM baseline:** React + TypeScript + Vite; Node 24; versioned normalized JSON; local build → same-repository `gh-pages` branch → GitHub Pages; hash routing. SQLite remains an option if measurement justifies it. The earlier Postgres sketch was provisional and is superseded by the current self-contained app direction. Local publishing supersedes the initial custom Actions recommendation following Lincoln's request for a simpler route.
## Simplest delivery story
Curated JSON lives beside the code, is validated and bundled at build time, and is queried in the browser with maps/indexes. The deployed app has no runtime API or database service. Source updates follow the same reviewed Git change and deployment process as code.
Use a committed lockfile and one package manager. Local preview and CI use the same Node major. A bundled Node 24.19.0 runtime and pnpm 11.19.0 are available on this machine; LT-003 chooses and documents the reproducible project setup.
Build static assets into `dist/` locally after checks pass. Publish only its contents plus an empty `.nojekyll` file to the root of a dedicated `gh-pages` branch in the existing repository. Configure Pages with “Deploy from a branch”, `gh-pages`, `/ (root)`. Keep source and documentation on `main`; a separate deployment repository adds no needed capability for this public project. LT-011 will provide a repeatable publish command that records the source commit and preserves deployment history. A custom Actions build workflow is optional later automation.

The Vite base path must match the actual repository path. For a repository named latent-threads, the base is `/latent-threads/`; hash URLs such as `/latent-threads/#/explore/endeavor:song-release` let refreshed deep links load the static index page. Validate the exact production path. [Vite deployment guide](https://vite.dev/guide/static-deploy.html), [HashRouter documentation](https://reactrouter.com/api/declarative-routers/HashRouter).

**Preflight evidence:** local package installation, build, browser preview and Git pushes passed. After Lincoln resolved the provider account issue, PM reran the manual preflight: attempt 2 completed successfully on 12 September 2026, proving hosted-runner access is restored. [Successful runner job](https://github.com/karuhanga/latent-threads/actions/runs/34670129817/job/103491371204). Keep the local-build publishing baseline; this does not require switching back to custom Actions builds. No actual Pages deployment has been attempted yet. GitHub documents `.nojekyll` publishing without a Jekyll build, while its publishing guide says Pages still uses a managed deployment workflow. [Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [GitHub's legacy-worker announcement](https://github.blog/changelog/2024-07-08-pages-legacy-worker-sunset/).
This means self-contained runtime data, not a promise of offline reopening. Browser caching/PWA behavior and saved trails are later explicit features.
## Why JSON now
The first release is a small read-only curated graph, roughly 30–50 browsable entities. Readable JSON makes content review, diffs and validation straightforward. One thin data module exposes node, neighborhood, contribution, evidence and search queries.
SQLite in the browser is viable. Read-only sql.js can load a bundled database into memory; it adds a WASM asset and does not automatically persist edits. SQLite persistent storage choices have different worker/header/concurrency requirements; not every approach needs custom headers. Reconsider it for demonstrated query complexity, full-text requirements, loading cost or content scale. [sql.js](https://github.com/sql-js/sql.js), [SQLite browser persistence](https://sqlite.org/wasm/doc/trunk/persistence.md).
## GitHub decision and access
Lincoln created the public repository [karuhanga/latent-threads](https://github.com/karuhanga/latent-threads). Browser authentication and Git remote reads are verified; remote HEAD matched his initial commit a35d282. The GitHub CLI itself is unauthenticated, which is not a blocker while browser/Git routes are available.
GitHub Free supports Pages for public repositories. Private-source Pages requires an eligible plan; a private repository normally still publishes a public Pages site. Private site access is a separate Enterprise Cloud organization capability. Check eligibility before committing to a private-source configuration. [Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [Site publication](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Private access](https://docs.github.com/en/enterprise-cloud%40latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site).
Remote publication is LT-011. Local implementation and demos can proceed. Only app assets/data belong in `dist/`. Lincoln included the original conversation export in his initial commit. Preserve that history; do not bundle raw docs into the app. The repository also includes a concise product-context document.
## Tooling inventory
- Notion search/fetch/create/update/database/view tools: connected and verified.
- Local Git: user-created initial commit on main, origin configured; planning changes being prepared.
- Node runtime and package manager: bundled executables verified.
- GitHub: public repository and signed-in browser verified; Git reads work. CLI-only authentication is not currently needed.
- Subagents: ontology draft and official deployment review completed; no background builder is implied by a Ready ticket.
- Browser inspection: available for local visual and behavior checks when the app exists.
## Tradeoffs and revisit triggers
Static delivery makes public bundled content downloadable and supports no private server-side operations. Accounts, shared editing or protected content would require a new deployment decision. Keep user state separate from curated facts.
Pick the graph renderer during LT-007 based on the actual bounded neighborhood, accessibility and bundle cost. React Flow from the ideation is a candidate, not a settled dependency. A simple SVG/DOM view can be sufficient for the first slice.
## Related docs
- [Product scope](first-release.md)
- [Delivery plan](../pm/delivery-plan.md)
- [Decision log](../pm/decisions.md)
