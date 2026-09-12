# Durable project handoff

**Snapshot: 12 September 2026.** Repo documents are authoritative; check live Git and [Wave 3 kanban](https://www.notion.so/803ffa91974348c695efb98edde6300b?v=3d907031acb58189bfe0000c68abad8c) when resuming.

## Confirmed direction

- Act as technical PM, scope tickets, delegate bounded work and show usable checkpoints. Make routine reversible decisions. Ask only for genuine blockers, paid commitments or material scope changes.
- Keep specifications, decisions, research and durable context in this repository. Notion is only tracking, dependencies, assignment and completion evidence.
- Preserve “How does X get done?” through artifacts/endeavors, contextual activities, roles, skills, concepts, tools and learning. Include trade, agricultural, service, professional and creative work.
- Windows Phone inspiration: typography, flat color, generous space, purposeful tile motion. Global catalog search, mixed large/small tile wall, Shuffle and Surprise me. Automatic rotation pauses during interaction. Display preferences persist; source details are hidden by default. No visible trail or forced endeavor hierarchy for independent concepts/skills/tools/roles.
- Organizations remain small activity/place examples. No deep company profiles, country-wide relevance score or broad geography selector. Missing evidence means unknown, not absence; Uganda and Kenya are siblings under Africa.

## Implemented architecture

Node 24.19.0, pnpm 11.19.0, React/TypeScript/Vite, curated normalized JSON bundled into a static app. No backend or SQLite needed. Seven explicit packs in data/catalog.json now support the reviewed v0.3 depth/education extension; legacy v0.1/v0.2 loading remains supported. Shared entities are defined once. Claims have reviewed evidence; schema validity alone is not fact-checking.

Public origin: https://github.com/karuhanga/latent-threads.git. Publish with `pnpm publish:pages`: isolated committed snapshot, locked install, checks/build, dist plus .nojekyll and release.json to gh-pages root. Preserve branch history and original tracked ideation. Keep .local ignored. Use README's pinned runtime PATH with /usr/bin ahead of bundled fallback Git; system Git authentication works. Billing blocker resolved. No additional account permission or paid service needed.

## Current release state

**Wave 3 depth and education is deployed and ready for user review:** https://karuhanga.github.io/latent-threads/. Reviewed source `63a3d646daabb3519c653538ce9d6c8dad3a9098`; deployment `bb4b07b36881f8969cdb72477a1dfc13caf4c4df`. Exact-source CI and Pages succeeded. Public `release.json` matches that source; refreshed Android course, home, Surprise me and Mixing were verified on the hosted app. Subsequent handoff commits are documentation only.

Music, coffee, housing, clothing, laboratory diagnostics and mobile apps now contain **181 nodes, 41 activities and 135 relations**. All 222 pages have explanations and original examples; activities add inputs, outputs and decisions. Twenty learning resources include five courses and three modules, with visible preparation/outcomes and linked subjects, fields and specializations. Sources and attribution remain optional and hidden by default. Independent entities retain graph connections rather than forced endeavor ownership.

All **94 tests**, type/data validation and production build passed, including the publisher's exact committed snapshot. PM desktop/mobile/keyboard, deep-link refresh, search, source-preference persistence and course/module navigation checks passed. Both builders completed peer content/source spot checks without material blockers. Provider exercises and authenticated course content were not executed. The approximately 183 kB gzip JavaScript bundle retains the static architecture; see [Wave 3 review](wave-3-review.md) for evidence and limits.

## Goal, tracking and next action

The user's “Go ahead /goal” authorized the completed [Wave 3 scope](../product/wave-3.md). Three usable checkpoints were shown: music/housing, coffee/clothing, and diagnostics/software. Source checkpoints `05ad50d`, `d699383` and final `63a3d64` are pushed. LT-028–036 are all **Done**, confirmed by a live Notion board query after release acceptance. Both bounded builders finished and are idle. No access blockers or recurring automation.

The authorized outcome is achieved; stop implementation and hand the deployed result to the user for review. No further scope is assumed. LT-014 bookmarks and future roadmap features remain deferred. Repo docs hold specifications and evidence; Notion holds tracking only.

## Canonical references and execution rules

- [Wave 3 scope](../product/wave-3.md), [review evidence](wave-3-review.md), [decisions](decisions.md), [ticket specifications](../tickets/README.md).
- [Ontology](../product/ontology-v0.1.md), [deployment](../product/deployment.md), [LT-011 access/release state](../tickets/LT-011.md).
- Historical [Wave 1 review](wave-1-review.md) and [LT-020 UI review](lt-020-review.md); original ideation in docs/ideation is preserved.
- Read AGENTS.md and relevant tickets before implementation. At most two builder agents alongside PM/review; explicit file ownership and acceptance criteria, no overlapping shared-file writes. Agent assignment and In progress mean actual started work; PM verifies before Done.
- Keep original discussion, current specifications and observed implementation evidence distinct. Never claim an unrun check, unseen deployment, user acceptance or background execution. Update this snapshot at meaningful checkpoints and handoffs.
