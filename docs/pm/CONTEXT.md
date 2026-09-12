# Durable project handoff

**Snapshot: 12 September 2026.** Update this file at checkpoints and handoffs. This records durable context and the last verified state; fetch live ticket status from [the Notion board](https://www.notion.so/803ffa91974348c695efb98edde6300b?v=3d907031acb581ad800e000c9778c18b) before dispatching work. Do not mistake this snapshot for a live execution log.

## Confirmed user direction

- Act as technical PM: scope tickets, direct agents, make routine reversible decisions and ask for input when a consequential product, account/access or spending decision needs it. The user wants progressive, visible progress and conversation with PM rather than a large final reveal.
- **The repository is the source of truth for all substantial documentation, specifications, decisions and durable context.** Notion is only the kanban and live tracking surface. Write important memory down; do not leave it solely in chat or substantial Notion prose.
- Start with **produce and release a song**, then **coffee from Uganda to a European café**. The remaining seed endeavors are ontology stress tests and later content, not simultaneous implementation commitments.
- Center “How does X get done?” and exploration through contextual contributions into roles, knowledge, capabilities, tools and learning. Roles include creative, informal and trade work. The original audience includes the user's high-school sisters and the user.
- UI inspiration is Windows Phone: strong typography, flat color, generous space, restrained chrome and purposeful movement. Preserve keyboard/mobile usability, visible focus, labels and reduced-motion support.
- Prefer a small, self-contained JavaScript application, Git from the outset and the easiest deployment story. The user explicitly supports bounded subagents and asks us to obtain/use needed tooling.

## Architecture and scope baseline

Node **24**, **React + TypeScript + Vite**, curated normalized **JSON in Git**, build-time validation and in-memory traversal are the current implementation baseline. Keep renderer and storage access separate. Add SQLite or a backend only when concrete needs justify them. Following Lincoln's simpler deployment suggestion, build/check locally and publish dist contents plus .nojekyll to the existing repository's gh-pages branch; retain source/docs on main. Custom Actions builds are optional later automation. Pages branch publication is verified for Checkpoint B; final Wave 1 publication remains pending.

Wave 1 is one sourced song journey, approximately 30–50 browsable entities: 5–7 stages, 6–10 roles and 8–12 capabilities/concepts/tools, plus at least three checked learning resources across two concepts. These are coverage targets, never permission to invent data. The three review checkpoints are:

1. **Visual foundation:** runnable app and a reviewable visual shell showing the design direction.
2. **Song exploration:** follow a song through stages and contextual contributions without losing orientation.
3. **Discovery and learning:** search, a mixed curiosity surface, visible exploration trail, contextual learning/evidence and a verified production preview.

A five-minute release review should let the user find two distinct contributions, explain one connection, reach an unfamiliar concept, open a useful learning resource and return. Geography/time enter the schema in Wave 1; the user-facing geography lens follows sourced coffee content in Wave 2. World contains Africa; Kenya and Uganda are siblings. Missing evidence means unknown, never absence.

Accounts, sync, generative chat, assessments, user editing, salary dashboards, bulk occupation imports, historical slider, full semantic zoom, automatic tile flipping, persistent/shared trails and offline reopening are deferred.

## Canonical references

- [First release](../product/first-release.md): scope and acceptance; [delivery plan](delivery-plan.md): sequencing and checkpoints; [deployment](../product/deployment.md): architecture/deployment decisions and access state.
- [Ontology v0.1](../product/ontology-v0.1.md): PM-reviewed implementation contract. Artifact differs from endeavor; contribution binds one role, stage and endeavor; typed relations and source evidence constrain content.
- [Ticket specifications](../tickets/): repository copies of LT-001 through LT-019 define substantive scope and acceptance. Read the relevant file alongside live Notion dependencies/status before starting.
- [AGENTS.md](../../AGENTS.md): execution rules. Original discussion is preserved under `docs/ideation/`; do not rewrite it or treat illustrative claims as verified content.
- [Public repository](https://github.com/karuhanga/latent-threads), [Notion HQ](https://www.notion.so/3d907031acb58172be89cad68e89e362), [Notion board](https://www.notion.so/803ffa91974348c695efb98edde6300b?v=3d907031acb581ad800e000c9778c18b).

The first-release, delivery-plan, deployment, decision log and LT-001–LT-019 specification files now exist in the repository. Notion documentation pages and cards now link to these canonical files. Any older document saying scope or substantial context lives in Notion is superseded by the confirmed repository/Notion split above.

## Last verified progress and access

- Public `karuhanga/latent-threads`, main, origin HTTPS. User's initial `a35d282` includes ideation; preserve it. Git pushes and signed-in browser work. `gh` is unauthenticated but is not needed. Account billing blocker is resolved; hosted runner and app checks passed.
- LT-001–LT-006 accepted. Foundation `d18a95a`, visual shell `847e7fb`, validator and sourced catalog `5da60d1`: 31 nodes, 8 contributions, 24 relations, 70 evidence records. Source review is separate from schema validation.
- Checkpoint B / LT-007 accepted by PM: actual data powers six stages, System/Team and bounded connections. PM walked mixing → audio mixing → sound waves and songwriting → harmony → Ableton, with contribution context retained; interpretation/source notes visible. Mobile width/scrollWidth 360/360. All 21 tests, data validation, typecheck and production build passed. Lincoln said “loving the direction”; preserve the visual approach.
- Publisher code through `22e8988` has clean-source guards, isolated reproducible builds, allowlisted output and history-preserving publication. First remote attempt failed temporary-checkout authentication; publication now uses the authenticated source checkout. Actual root cause was PATH selecting fallback/git. System Git pushed the checked deployment `40458a3` from source `15d6ea2`; Pages run 34672533908 passed, live home and refreshed deep link verified at https://karuhanga.github.io/latent-threads/. README now orders system Git before fallback tools. Final publisher run must verify corrected PATH end to end. No current user action is required.
- Active user-authorized goal: finish/test/deploy Wave 1 with bounded subagents and visible checkpoints, then stop for review. No recurring automation. PM owns acceptance, docs, tracking and publication.

## Agent dispatch and truth protocol

PM delegates independent, bounded tickets with explicit file ownership, satisfied dependencies and acceptance criteria. Keep at most two builder agents active alongside PM/review; coordinate shared files. Subagents report exact changed files, checks actually run, unresolved risks and the next action. Use a Notion `Agent` assignment and `In progress` only when work begins; move to `In review` with evidence; PM verifies acceptance before `Done`.

Keep three kinds of truth separate: original ideation records what was discussed; repository specifications record current decisions and intended behavior; code, sourced data and observed checks establish implemented behavior. An illustrative fixture is not publishable factual content. A valid schema is not fact-checking; a generated build is not a working deployment; a ready ticket is not started work. Free access and open licensing need separate evidence.

At each checkpoint or handoff, update this snapshot with the actual completed result, checks, meaningful decisions, open facts and one concrete next action. Store detailed decisions/spec changes in their canonical repository files and link them here. Reflect live status in Notion. Preserve original ideation and do not claim unrun checks, unseen previews, user approvals, commits, deployments or background work.

## Next action and unresolved facts

**Next action:** LT-008 and LT-009 passed PM acceptance, including 360px learning cards, real search/history/refresh and external lesson return. Independent navigation review found and fixed repeated-trail keyboard focus loss; PM confirmed main focus and following Tab. All 36 tests/build/type/data checks pass. Publish the clean combined Wave 1 revision with corrected system-Git PATH, verify live source/Pages/deep link, close LT-010/LT-011 and stop for user review. Detailed QA is in `wave-1-review.md`. No builders are editing files now. Local production preview remains port4179 (session69716); agent development preview port4181 (session59243) can be stopped at completion.

Checkpoint B source15d6ea2/deployment40458a3 is currently hosted at https://karuhanga.github.io/latent-threads/. Full Wave 1 hosted verification is still pending. No user input is needed.
