# Working on Latent Threads

Read `docs/pm/CONTEXT.md`, `README.md`, the current product scope and the relevant `docs/tickets/LT-xxx.md` before implementing. Repository docs are authoritative for scope, architecture, decisions, ticket specifications and durable context. Notion is used only for kanban tracking: priority, status, dependencies, assignment and completion evidence.

## Preserve context

- Write important decisions to `docs/pm/decisions.md` and update the affected specification in the same change.
- Update `docs/pm/CONTEXT.md` at meaningful checkpoints, blockers and handoffs. Keep it short: confirmed preferences, actual state, evidence, unresolved facts and the precise next action.
- Give subagents the relevant ticket and context files, explicit file ownership and acceptance criteria. Ask them to return changed files, checks and remaining uncertainties.
- Treat the context file as a dated snapshot; check live Notion status and Git state when resuming. Do not keep multiple competing copies of specifications in Notion.

## Delivery

- Work in small visible increments: visual shell, song exploration, discovery and learning. Coffee/local relevance follows. Do not expand into future roadmap features while a current ticket is unfinished.
- PM delegates bounded tickets with explicit file ownership, dependencies and acceptance criteria. Keep at most two builder agents active alongside PM/review; coordinate shared-file edits.
- `Role` on a ticket is planned responsibility. Set `Agent` and `In progress` only when work actually starts. Move to `In review` with deliverables and relevant check results. PM confirms acceptance before `Done`.
- Ready tickets have satisfied dependencies. Backlog can contain future scope or dependency-waiting work. Blocked records the specific issue and who can resolve it.
- Record meaningful decisions and ask the user for missing account/access facts, paid commitments or material product-direction changes. Routine reversible implementation choices belong to PM/agents.

## Product and data

- Preserve the endeavor-centered question: how does X get done? Roles include trades, informal and creative work.
- Contributions belong to a role, stage and endeavor. Do not assert universal role-to-role collaboration.
- Use the reviewed v0.1 contract. Keep illustrative fixtures distinct from release content. Sources must support the displayed claim; passing a schema validator is not fact-checking.
- Geography/time have schema support in Wave 1. The geography UI follows sourced coffee content in Wave 2. Missing evidence means unknown, not absence; Uganda and Kenya are siblings under Africa.
- Prefer the smallest static implementation. Node 24, React/TypeScript/Vite and normalized JSON are the baseline. Revisit SQLite or a backend only with concrete needs.
- UI inspiration: strong typography, flat color, generous space and purposeful movement. Preserve mobile and keyboard usability, visible focus, type labels and reduced-motion support.

## Review and publication

- Run checks relevant to the change. Data validators need meaningful negative cases; UI needs a real preview and keyboard/mobile inspection. Avoid redundant tests for low-impact document edits.
- Keep `.local/` local. The user included the original ideation export in the initial Git commit; preserve it and do not rewrite history or remove files without authorization. Avoid adding new raw conversation exports by accident. Only app output belongs in `dist/`.
- The user configured `origin` as `https://github.com/karuhanga/latent-threads.git`. Consult LT-011 for the latest verified visibility/access and deployment state before remote operations. No tokens in code or chat.
- Do not claim background execution, a live deployment, passed checks or user approval without evidence.
