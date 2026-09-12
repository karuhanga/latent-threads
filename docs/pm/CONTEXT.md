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

Node **24**, **React + TypeScript + Vite**, curated normalized **JSON in Git**, build-time validation and in-memory traversal are the current implementation baseline. Keep renderer and storage access separate. Add SQLite or a backend only when concrete needs justify them. Static GitHub Pages is the proposed initial deployment route; a repository existing on GitHub does not mean Pages has been configured or deployed.

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

- The user created and pushed public `karuhanga/latent-threads`, branch `main`, initial commit **`a35d282`**, including ideation and the ontology draft. Local `origin` is `https://github.com/karuhanga/latent-threads.git`; the local commit and remote configuration were rechecked for this handoff.
- PM verified Git reads and successfully pushed the planning baseline **2f1e9b7** to `origin/main`. The browser is signed in to GitHub. The `gh` CLI itself is unauthenticated; Git/browser routes are available, so CLI authentication is **not** a current user blocker. Pages/Actions execution remains unverified until LT-011.
- PM completed the planning/kanban baseline, reviewed the ontology and clarified Wave 2 geography UI. **LT-001 and LT-002 Done; LT-003 scaffold Ready; LT-006 song curation Ready** at this snapshot. The Needs Lincoln view was empty after access setup was resolved. Fetch live Notion status before acting.
- **There is no app implementation or verified deployment yet.** Ontology fixture JSON parsing, identity/reference checks, endpoint/context checks and local document links were checked when the draft was created. Those document/fixture checks are not an executable application schema, a build, source verification or UI acceptance.
- No new bounded goal or automation has been started. The user asks what architecture/deployment decisions and bounded goal to give before leaving the laptop. PM must respond with a concrete proposed boundary and record any accepted decision; do not imply unattended execution or scheduling already exists.

## Agent dispatch and truth protocol

PM delegates independent, bounded tickets with explicit file ownership, satisfied dependencies and acceptance criteria. Keep at most two builder agents active alongside PM/review; coordinate shared files. Subagents report exact changed files, checks actually run, unresolved risks and the next action. Use a Notion `Agent` assignment and `In progress` only when work begins; move to `In review` with evidence; PM verifies acceptance before `Done`.

Keep three kinds of truth separate: original ideation records what was discussed; repository specifications record current decisions and intended behavior; code, sourced data and observed checks establish implemented behavior. An illustrative fixture is not publishable factual content. A valid schema is not fact-checking; a generated build is not a working deployment; a ready ticket is not started work. Free access and open licensing need separate evidence.

At each checkpoint or handoff, update this snapshot with the actual completed result, checks, meaningful decisions, open facts and one concrete next action. Store detailed decisions/spec changes in their canonical repository files and link them here. Reflect live status in Notion. Preserve original ideation and do not claim unrun checks, unseen previews, user approvals, commits, deployments or background work.

## Next action and unresolved facts

**Next action:** confirm live dependencies, then dispatch LT-003 app scaffold and LT-006 sourced song curation as separate bounded work once the user sends the proposed Wave 1 goal. Proceed toward the visual-foundation checkpoint with review before expanding scope. The repository PM/spec migration is complete.

PM should settle the user's requested bounded-work proposal and architecture/deployment explanation before treating it as an accepted autonomous goal. Pages configuration, actual build/deployment permissions and a live URL remain to be verified. Content sources and learning-resource access/licensing still need curation. Latent Threads is the working name; brand/domain diligence and the proposed tagline are not finalized. None of these unresolved future decisions requires inventing a blocker to the ready scaffold or curation tickets.
