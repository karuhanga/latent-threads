# Latent Threads

An interactive map of how people get things done. Explore endeavors, the roles and contributions behind them, the knowledge and tools involved, and something worth learning next.

**Stage:** runnable app foundation under review; visual shell and sourced song content are in active delivery.

- [Project HQ](https://www.notion.so/3d907031acb58172be89cad68e89e362)
- [Wave 1 kanban](https://www.notion.so/803ffa91974348c695efb98edde6300b?v=3d907031acb581ad800e000c9778c18b)
- [Product scope](docs/product/first-release.md)
- [Delivery plan](docs/pm/delivery-plan.md)
- [Decisions](docs/pm/decisions.md) and [deployment](docs/product/deployment.md)
- [Durable context — start here](docs/pm/CONTEXT.md)
- [Ticket specifications](docs/tickets/README.md)

Notion is the source of truth for kanban tracking. The repository holds all substantial docs: scope, architecture, decisions, ticket specifications, durable context and implementation. Ticket sizes indicate focused effort, not promised dates.

## First release

Lincoln confirmed song first, Ugandan coffee second. Wave 1 has three visible checkpoints:

1. A responsive visual shell inspired by Windows Phone typography, color and spacing.
2. A sourced song journey connecting stages, contextual contributions, roles and concepts.
3. Mixed discovery, search, exploration trails, learning links and a verified demo.

The planned stack is React, TypeScript and Vite with validated JSON data bundled into a static app. The public repository is `karuhanga/latent-threads`; browser access and Git pushes are verified. Build and check locally, then publish only the contents of `dist/` plus `.nojekyll` to a `gh-pages` branch in the same repository. Pages branch publishing remains to be verified. Local previews come first.

## Technical context

- [Product context](docs/product/project-context.md)
- [Ontology v0.1](docs/product/ontology-v0.1.md)
- [Static deployment decision](docs/product/deployment.md)
- [Agent workflow](AGENTS.md)

## Local setup

Use Node **24.19.0** (pinned in `.node-version`) and **pnpm 11.19.0** (pinned in `package.json`). Install that Node version with your usual version manager, then install pnpm if needed:

```sh
npm install --global pnpm@11.19.0
pnpm install --frozen-lockfile
pnpm dev
```

The dev URL is `http://127.0.0.1:5173/latent-threads/`. Package caches stay in ignored `.local/`; dependencies and build output are also ignored. The lockfile is versioned.

On this Codex machine, the verified bundled runtime can be used when Node is absent from the shell path:

```sh
export PATH="/Users/karuhanga/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/karuhanga/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH"
pnpm install --frozen-lockfile
```

Run the same checks as CI and inspect production output:

```sh
pnpm check
pnpm preview
```

`check` runs `typecheck`, Node's test runner and `build`; each is also available separately. LT-005 will add release-data validation to this pipeline. Open `http://127.0.0.1:4173/latent-threads/`, follow the exploration route, refresh, and try an invalid hash such as `#/unknown` to verify recovery to home. The current page is a foundation preview with no release content.

Vite's base defaults to `/latent-threads/`. To verify another hosting path, use `pnpm build --base=/another-path/` and `pnpm preview --base=/another-path/`. Rebuild with `pnpm build` before publishing to the actual repository path. CI checks the app; publication remains the local-build/`gh-pages` flow owned by LT-011.

The original conversation export is under `docs/ideation/` and was included in the user's initial commit. Ignore rules prevent accidental additions but do not untrack that history. The product context above is the portable project brief. Only app assets belong in the deployed `dist/` output.
