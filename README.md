# Latent Threads

An interactive map of how people get things done. Explore endeavors, the roles and contributions behind them, the knowledge and tools involved, and something worth learning next.

**Stage:** product scope and data-model baseline established; app implementation is next.

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

The planned stack is React, TypeScript and Vite with validated JSON data bundled into a static app. The public repository is `karuhanga/latent-threads`; browser access and Git remote reads are verified. GitHub Actions will deploy `dist/` to GitHub Pages once the app and workflow exist. Local previews come first.

## Technical context

- [Product context](docs/product/project-context.md)
- [Ontology v0.1](docs/product/ontology-v0.1.md)
- [Static deployment decision](docs/product/deployment.md)
- [Agent workflow](AGENTS.md)

LT-003 owns the app scaffold and reproducible install/check/build commands. These commands are not implemented yet. Do not infer a working app from this planning baseline.

The original conversation export is under `docs/ideation/` and was included in the user's initial commit. Ignore rules prevent accidental additions but do not untrack that history. The product context above is the portable project brief. Only app assets belong in the deployed `dist/` output.
