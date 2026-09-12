# Delivery plan — Small increments

## Delivery policy
Ship a small usable increment at each checkpoint. Notion holds priorities, dependencies and current status. The repository holds scope, decisions, ticket specifications, implementation and durable agent context. Estimates are ticket-sizing guides (half day to two focused engineering days), not calendar promises or predictions of agent runtime.
## Wave 1 sequence
1. **A — Visual foundation:** LT-001 project setup, LT-003 repository/app scaffold and LT-004 visual shell. Draft LT-002 ontology in parallel with reversible layout work.
2. **B — Follow a song:** finish LT-002, then LT-005 validated data loader and LT-006 sourced song content; integrate them with LT-007 exploration. Data contract review precedes content/app integration.
3. **C — Discover and learn:** LT-008 discovery/search/trail and LT-009 learning/source panels, then LT-010 end-to-end review. LT-011 GitHub Pages follows LT-003’s app scaffold, verification of an available write/deploy route and Pages configuration; do not let remote setup block local feedback.
## What follows
Wave 2: source Ugandan coffee, deliver the geography evidence lens, then consider local bookmarks. Later: stress-tested expansion to the remaining endeavors, selective external taxonomy imports, history, semantic zoom and naming/domain diligence.
Each later item is a refinement placeholder and must be split into bounded implementation tickets before assignment. Ticket specifications are in [docs/tickets](../tickets/).
## Agent dispatch
PM owns integration, prioritization, review and user communication. Delegate one bounded ticket at a time, naming allowed files, dependencies, acceptance criteria and required evidence. Agent roles: Platform, Data model, Content research, UI and Quality. The Agent field contains an actual dispatched agent only; Role alone is a planned responsibility.
Limit implementation work in progress to two builder agents plus PM/review. Separate file ownership where work can proceed in parallel. Schema changes require a brief contract note before consumers adopt them. Do not let two agents edit the same files without explicit coordination.
Keep tickets in Backlog until dependencies are satisfied. Move to Ready when scoped and unblocked, In progress only on actual dispatch, In review with evidence, and Done only when PM confirms acceptance. Blocked must include the concrete issue and who can resolve it. Future roadmap items are Backlog, not Blocked.
## Review and Done
Every ticket has an objective, scope boundary, checkable acceptance criteria, dependency relations, planned owner and size. Technical delivery adds a commit/file/preview reference and relevant validation evidence. User-visible implementation needs a working preview and basic keyboard/mobile inspection. Data changes need meaningful schema/content checks; avoid tests that simply copy implementation.
For release work, validate production output, direct links and subpath behavior. Track implemented locally versus published honestly. A draft design/spec can be In review without claiming implemented behavior.
## User input policy
Make reversible scope and implementation calls autonomously and record why. Ask Lincoln for subjective direction at visible checkpoints, unresolved facts only he can supply, paid purchases, external identity/access and material changes to the product promise. Continue unrelated work while questions are pending.
Lincoln confirmed song first, coffee second and created the public repository karuhanga/latent-threads. Browser authentication and Git remote reads are verified. No current user input is required for local work. Preserve the original ideation in his initial commit; only app assets belong in the deployed output.
## Progress communication
Report meaningful changes: a usable checkpoint, a decision, a failed check or blocker, or a question that requires Lincoln. Update the matching ticket when status changes and append evidence. Do not claim continuous background execution after the current task stops; a recurring run requires explicit scheduling.
## Starting state — 12 September 2026
Notion kanban and 19 tickets created, including 11 in Wave 1. LT-002 ontology was delegated and PM-reviewed. LT-003 scaffold and LT-006 curation are Ready; no app exists yet. The user created and pushed the public repository; browser authentication and Git remote reads work. Node 24.19.0 and pnpm 11.19.0 are available through the bundled runtime. The GitHub CLI itself is unauthenticated; use the available browser/Git tools unless CLI authentication becomes necessary.

## Durable context
Read [CONTEXT.md](CONTEXT.md), the current scope, the relevant ticket specification and live kanban before resuming. Update context at meaningful decisions, checkpoints, blockers and handoffs. Record exact completed work, evidence and next action; do not describe planned work as running.
