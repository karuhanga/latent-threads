# Decision log

Record consequential decisions here, with date, authority and why. Live status belongs on the [kanban](https://www.notion.so/3d907031acb58172be89cad68e89e362); the short working handoff is [CONTEXT.md](CONTEXT.md).

| Date | Decision | Authority and reason |
|---|---|---|
| 2026-09-12 | Repo docs; Notion tracking only | Explicit user preference, confirmed after discussion. Specs, ticket definitions, decisions and durable context are versioned with code. |
| 2026-09-12 | Song first, Ugandan coffee second | Explicit user selection. Complete one exploration loop before expanding into local relevance. |
| 2026-09-12 | Windows Phone visual inspiration | Explicit user preference. Typography, flat color, space and purposeful motion, while maintaining accessibility. |
| 2026-09-12 | Keep Checkpoint A visual direction | After viewing the preview, Lincoln said “loving the direction!” Preserve its typography, flat colors and focused composition while integrating real content. |
| 2026-09-12 | React + TypeScript + Vite, Node 24, normalized JSON | PM implementation baseline for a small static read-only graph; avoids database operations and supports reviewable data diffs. |
| 2026-09-12 | Local build → gh-pages branch → Pages | Supersedes the initial custom Actions recommendation after Lincoln proposed local builds. Use the same public repository, publish dist contents plus .nojekyll and retain source-commit evidence. Custom workflow automation can follow. Actual branch publishing remains unverified; its availability cannot be inferred from the failed custom runner preflight. |
| 2026-09-12 | Bounded neighborhood before semantic zoom | PM scope decision: prove understandable exploration before global map complexity. Renderer chosen during LT-007. |
| 2026-09-12 | Geography/time schema now, geography UI in Wave 2 | PM scope decision. Avoid ungrounded local claims; coffee supplies the second content test. |
| 2026-09-12 | v0.1 ontology accepted for implementation | PM reviewed agent output and all six conceptual stress tests. Executable validation and factual curation remain separate. |
| 2026-09-12 | Preserve user's initial Git history | The initial public commit includes ideation and ontology draft. Do not rewrite or remove it. Site deployment excludes raw docs. |

On 12 September 2026 Lincoln explicitly set the bounded goal: complete, test and deploy Wave 1 song exploration with autonomous subagents, visible usable checkpoints, repo docs and Notion tracking. Stop when the deployed demo is ready for review. Routine decisions are delegated; ask only for genuine blockers, paid purchases or material scope changes. No paid purchase, custom domain, broader backend or indefinite recurring automation is authorized.

- Publishing tooling correction: bundled fallback/git did not reuse the working system Git authentication. Keep /usr/bin before bundled fallback tools in this machine’s PATH; no credential copying or new account permission is needed. Checked source 15d6ea2 was published through system Git and Pages verified.

- Wave 1 navigation: optional `?via=` in the focal hash preserves a contribution when copying or refreshing a concept link. The bounded 30-entry trail stays in browser history state; this does not add persistent bookmarks or serialized shared trails.

- 12 September user review supersedes prototype UI: global animated mixed tile discovery; catalog-explicit search; generic home/header; no visible trail; sources/attribution off by default behind discreet Settings; conventional activity naming; independent concepts/skills/tools/roles, endeavor containment only for process stages/contextual contributions. Automatic rotation approved, with pause and reduced-motion behavior. LT-020 records implementation scope.
