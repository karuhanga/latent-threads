# Wave 1 execution record

Goal accepted 12 September 2026: complete, test and deploy the first playable song exploration, with visible usable checkpoints. Stop when the deployed demo is ready for Lincoln's review.

## Ownership and integration

- LT-003: deployment_review owns scaffold/configuration, routing entry, package scripts and setup instructions. PM reviews before LT-004/LT-005 begin.
- LT-006: ontology_first_slice owns `data/song/*.json` and `docs/content/song-review.md`. PM reviews source support and runs the eventual release validator before integration.
- PM owns shared specifications, decisions, context, kanban status, acceptance and publication. At most two builders are active. Agents do not commit or push shared changes independently.

The song manifest uses `schemaVersion: "0.1"` and a `files` map naming bare-array JSON files for nodes, contributions, relations, sources, evidence, places, presenceAssessments and taxonomyMappings. Root endeavor ID is `endeavor:song-release`. This is the file layout for the existing normalized ontology, not a second data model.

## Checkpoint evidence

Foundation accepted at `d18a95a`; catalog/validator accepted at `5da60d1`. Local fresh locked install/check and browser refresh/recovery passed. [GitHub App checks](https://github.com/karuhanga/latent-threads/actions/runs/34671559465) also passed on `5da60d1` in 22 seconds, covering a hosted locked install, data validation, typecheck, 15 tests and build. This is app-check evidence, not deployment.

Each checkpoint records the exact reviewed source commit, preview URL, checks and screenshots when available. Pending work below is not verification evidence.

| Checkpoint | Required demonstration | Result |
|---|---|---|
| A: visual foundation | Home and explorer composition; desktop and 360px; keyboard focus; fixture label; reduced motion | Accepted: real Chrome/in-app previews, screenshots shown in task. Width/scrollWidth 1280/1280 and 360/360. Tab/Enter stage traversal and visible focus passed. Reduced-motion CSS inspected; runtime preference QA follows. |
| B: follow a song | Two distinct sourced contribution paths; stage/context preserved; labeled connections; back/home | Pending |
| C: discover and learn | Alias/partial/empty search; multi-hop trail; browser history; refreshed deep link; three learning cards; source/access/license review | Pending |
| Hosted release | Same reviewed build on Pages; real home and refreshed deep link; correct subpath assets; source/deployment commit recorded | Pending |

## Release review cases

1. Start at the song, choose a stage and find a role's specific contribution. Follow a concept and explain the connection using its source.
2. Return and follow a second role through a different stage. Verify that shared stages never assert universal collaboration.
3. Search for an alias and partial label across types. Search for unavailable content and recover from the empty result.
4. Navigate a three-hop trail, use browser back/forward, refresh a focal URL and open an unknown ID. Check useful recovery.
5. Open a beginner learning resource in a new tab and return to unchanged exploration. Confirm access and reuse-license labels are separate.
6. Repeat core controls with keyboard, inspect visible focus and 360px overflow, and verify reduced-motion behavior.
7. Run type, schema, negative-case and production checks. Measure compressed output and a basic interaction timing; record method and limits.

Content validity requires both executable validation and source review. Local preview acceptance does not establish public deployment. Optional user feedback is welcome at checkpoints but is not a gate for routine implementation.
