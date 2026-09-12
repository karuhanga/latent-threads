# Durable project handoff

**Snapshot: 12 September 2026.** Update this file at checkpoints and handoffs. This records durable context and the last verified state; fetch live ticket status from [the Notion board](https://www.notion.so/803ffa91974348c695efb98edde6300b?v=3d907031acb581ad800e000c9778c18b) before dispatching work. Do not mistake this snapshot for a live execution log.

## Confirmed user direction

- Act as technical PM: scope tickets, direct agents, make routine reversible decisions and ask for input when a consequential product, account/access or spending decision needs it. The user wants progressive, visible progress and conversation with PM rather than a large final reveal.
- **The repository is the source of truth for all substantial documentation, specifications, decisions and durable context.** Notion is only the kanban and live tracking surface. Write important memory down; do not leave it solely in chat or substantial Notion prose.
- Music is deployed. Wave 2 adds coffee, housing, clothing, diagnostic testing and mobile apps, delivered in three visible checkpoints. See the active scope below.
- Center “How does X get done?” and exploration through contextual contributions into roles, knowledge, capabilities, tools and learning. Roles include creative, informal and trade work. The original audience includes the user's high-school sisters and the user.
- UI inspiration is Windows Phone: strong typography, flat color, generous space, restrained chrome and purposeful movement. Preserve keyboard/mobile usability, visible focus, labels and reduced-motion support.
- Prefer a small, self-contained JavaScript application, Git from the outset and the easiest deployment story. The user explicitly supports bounded subagents and asks us to obtain/use needed tooling.

## Architecture and scope baseline

Node **24**, **React + TypeScript + Vite**, curated normalized **JSON in Git**, build-time validation and in-memory traversal are the current implementation baseline. Keep renderer and storage access separate. Add SQLite or a backend only when concrete needs justify them. Following Lincoln's simpler deployment suggestion, build/check locally and publish dist contents plus .nojekyll to the existing repository's gh-pages branch; retain source/docs on main. Custom Actions builds are optional later automation. Full Wave 1 Pages publication is verified.

Wave 1 is one sourced song journey, approximately 30–50 browsable entities: 5–7 stages, 6–10 roles and 8–12 capabilities/concepts/tools, plus at least three checked learning resources across two concepts. These are coverage targets, never permission to invent data. The three review checkpoints are:

1. **Visual foundation:** runnable app and a reviewable visual shell showing the design direction.
2. **Song exploration:** follow a song through stages and contextual contributions without losing orientation.
3. **Discovery and learning:** search, a mixed curiosity surface, catalog search, contextual learning/evidence and a verified production preview.

A five-minute release review should let the user find two distinct contributions, explain one connection, reach an unfamiliar concept, open a useful learning resource and return. Geography/time enter the schema in Wave 1; the user-facing geography lens follows sourced coffee content in Wave 2. World contains Africa; Kenya and Uganda are siblings. Missing evidence means unknown, never absence.

Accounts, sync, generative chat, assessments, user editing, salary dashboards, bulk occupation imports, historical slider, full semantic zoom, persistent/shared trails and offline reopening are deferred.

## Canonical references

- [First release](../product/first-release.md): scope and acceptance; [delivery plan](delivery-plan.md): sequencing and checkpoints; [deployment](../product/deployment.md): architecture/deployment decisions and access state.
- [Ontology v0.1](../product/ontology-v0.1.md): PM-reviewed implementation contract. Artifact differs from endeavor; contribution binds one role, stage and endeavor; typed relations and source evidence constrain content.
- [Ticket specifications](../tickets/): repository copies of LT-001 through LT-020 define substantive scope and acceptance. Read the relevant file alongside live Notion dependencies/status before starting.
- [AGENTS.md](../../AGENTS.md): execution rules. Original discussion is preserved under `docs/ideation/`; do not rewrite it or treat illustrative claims as verified content.
- [Public repository](https://github.com/karuhanga/latent-threads), [Notion HQ](https://www.notion.so/3d907031acb58172be89cad68e89e362), [Notion board](https://www.notion.so/803ffa91974348c695efb98edde6300b?v=3d907031acb581ad800e000c9778c18b).

The first-release, delivery-plan, deployment, decision log and LT-001–LT-020 specification files now exist in the repository. Notion documentation pages and cards now link to these canonical files. Any older document saying scope or substantial context lives in Notion is superseded by the confirmed repository/Notion split above.

## Review revision — LT-020

User requested global catalog framing, a randomly arranged large/small tile wall with Windows Phone style motion, global Shuffle/Surprise, optional source details, conventional activity names, and no visible trail or forced endeavor hierarchy. Implemented by two bounded builders and PM. The current data still has one endeavor; no extra content was invented. Automatic shuffle is approximately seven seconds and pauses during interaction; both display preferences persist locally. Repo specs and decisions reflect this revised direction.

## Last verified progress and access

- **Wave 1 and review revision LT-020 deployed, ready for user review.** Live demo: https://karuhanga.github.io/latent-threads/. Reviewed application source `d84d0c45821e7335bebc0d608357cd74fbf41284`; deployment `12c0bb28c503f49cd15c87d26a1b7cd3d9584198`. Later docs-only commits record release evidence and do not change the app.
- LT-001–LT-011 and LT-020 accepted by PM. Original visual checkpoint A `847e7fb`, sourced exploration B `15d6ea2`, discovery/learning C `8ded5ff`; user review revision `d84d0c4`. User feedback informed the revision; no subsequent user acceptance is claimed.
- Data: 31 nodes + 8 contextual contributions, 6 stages, 24 relations, 70 evidence records and 3 learning resources. All 45 tests, data/type checks, reproducible build and exact-source CI passed. Revised desktop/mobile, keyboard, automatic/manual movement, preference persistence, catalog search and independent entity views were reviewed. Hosted home, global Surprise, refreshed skill deep link and exact release provenance verified. Detailed evidence/limits: [LT-020 review](lt-020-review.md); historical [Wave 1 review](wave-1-review.md).
- Public origin is https://github.com/karuhanga/latent-threads.git. Git pushes/browser work; gh CLI authentication is unnecessary. Billing issue resolved. Publisher works with system Git ahead of bundled fallback tools in README PATH. Pages uses gh-pages root, .nojekyll, no runtime backend.
- Repo docs/specs remain authoritative; Notion LT-020 tracking is complete. Both builders handed off and no recurring automation exists. The original Wave 1 stop is superseded by the active Wave 2 goal below. Do not begin Rabbit Hole.

## Agent dispatch and truth protocol

PM delegates independent, bounded tickets with explicit file ownership, satisfied dependencies and acceptance criteria. Keep at most two builder agents active alongside PM/review; coordinate shared files. Subagents report exact changed files, checks actually run, unresolved risks and the next action. Use a Notion `Agent` assignment and `In progress` only when work begins; move to `In review` with evidence; PM verifies acceptance before `Done`.

Keep three kinds of truth separate: original ideation records what was discussed; repository specifications record current decisions and intended behavior; code, sourced data and observed checks establish implemented behavior. An illustrative fixture is not publishable factual content. A valid schema is not fact-checking; a generated build is not a working deployment; a ready ticket is not started work. Free access and open licensing need separate evidence.

At each checkpoint or handoff, update this snapshot with the actual completed result, checks, meaningful decisions, open facts and one concrete next action. Store detailed decisions/spec changes in their canonical repository files and link them here. Reflect live status in Notion. Preserve original ideation and do not claim unrun checks, unseen previews, user approvals, commits, deployments or background work.

## Active goal and next action

Lincoln accepted the five new verticals: coffee, housing, clothing, diagnostic testing and mobile apps alongside music. Active goal “let’s go” means complete/test/deploy all five with progressive checkpoints, not coffee alone. See [Wave 2](../product/wave-2.md) and LT-021–027. The earlier stop-for-review and coffee-only sequencing are superseded by this authorization.

Organizations stay lightweight: contextual examples linking actual activities to places, without deep profiles or a broad country filter. PM approved the minimal v0.2 extension recorded in Wave 2. Current hosted checkpoint: source 7daab21 / deployment 67d6fae, coffee + housing alongside music. Exact-source CI, Pages, public release metadata and refreshed hosted coffee route verified.

Checkpoint two accepted and shown locally: song/shared/housing/coffee/clothing/diagnostics enabled, 131 nodes, 35 activities, 87 relations. All 64 tests, type/data checks and build pass; desktop/mobile/keyboard and learning paths reviewed. See wave-2-review.md. LT-021–025 Done. Next: publish checkpoint two, build LT-026 mobile apps, then complete LT-027 integrated release review. Measurement and Project planning now connect distinct domains. No access blocker known.

[Active Wave 2 kanban](https://www.notion.so/803ffa91974348c695efb98edde6300b?v=3d907031acb5815ca00e000cc3c1a19b) tracks LT-021–027.
