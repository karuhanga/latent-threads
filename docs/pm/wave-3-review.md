# Wave 3 review and delivery

**Final status: deployed and ready for user review, 12 September 2026.** The sections below retain checkpoint evidence in order; the final verified release supersedes their earlier pending states.

## Foundation checkpoint — 12 September 2026

Authorized outcome and acceptance: [Wave 3](../product/wave-3.md). LT-028–036 tracked on the [Wave 3 board](https://www.notion.so/803ffa91974348c695efb98edde6300b?v=3d907031acb58189bfe0000c68abad8c). Planning source bcbb7ea pushed. No Wave 3 application deployment yet.

PM implemented the reader UI: concise summary, expanded explanation, distinct labeled example, optional input/output/decision/practice; ordinary content visible with source details off. Existing graph below continues exploration; learning titles link to local resource pages and practical metadata stays visible. Source setting renamed Sources and attribution. Entity labels distinguish field, subject, topic, course and module.

Shared Measurement, Project planning and NIST resource enriched with primary-source review and original editorial examples; [research evidence](../research/wave-3-shared.md). Typecheck and data validation passed before music integration. PM reviewed real desktop and 360 × 800 Measurement in the port 4181 development preview: readable explanatory layout, stacked example on mobile, document width 360 with no horizontal overflow. This is an early foundation check, not acceptance of the music/housing checkpoint or complete wave.

PM reviewed the platform diff and independently ran the 19 focused education/pack tests: all pass. Negatives cover malformed/partial depth, metadata ownership, legacy version misuse, curriculum/prerequisite endpoints and cycles, missing editorial/example evidence, and unsupported inferred provider relations. Expanded claim support still requires content review.

LT-028 accepted by PM. Builder also reports all 80 regression tests and TypeScript passing before domain enrichment. Music and housing content builders now run independently. Final integrated checks remain required after content changes.

Additional PM UI check: Sources and attribution on exposes external explanation evidence and explicitly editorial example rationale; off preserves the full explanation/example and practical setup. Keyboard Enter on the internal learning-card title opens the NIST article page; its outcomes/preparation are visible with attribution off. Mobile viewport remains temporarily 360 × 800 until prototype review completes.

PM independently opened OpenLearn Sound overview and its linked sections 1.1/2.1. Overview confirms course outline, introductory level, 20-hour estimate, reading without sign-up and account conditions for full activities/participation statement. Actual curation and rendered curriculum remain to be accepted.

## Music and housing prototype accepted

PM inspected the richer music/house explanations and examples, including actual work inputs, outputs and decisions. Independently sampled Berklee’s top-line role description, OpenLearn course overview and curriculum sections, OpenLearn FAQ’s linked BY-NC-SA 4.0 licence, NCARB architecture explanation, and the 2015 Camosun/BCcampus drawing PDF hosted by eCampusOntario. The drawing resource retains edition/context and licence exceptions; it is not presented as current local construction requirements. [Music research](../research/wave-3-song.md) and [housing research](../research/wave-3-housing.md) hold claim mappings.

`pnpm check` passes all **86 tests**, TypeScript, catalog validation and production build with music/housing/shared depth gates enabled. Repaired two stale test assumptions: a topic can now have multiple legitimate teaching resources, and the organization fixture must retain the catalog’s schema version. Added explicit acceptance for the real course/two modules and role specialization. Bundle is approximately 140 kB gzip at this checkpoint; Vite reports its advisory 500 kB uncompressed chunk warning.

Real development UI reviewed: desktop Mixing shows explanation, concrete chorus example and work input/output/decision; keyboard Enter navigates from course to module, followed module → subject; subject → broader field and role specialization links render correctly. Housing drawing guide reviewed at 360 × 800 with no horizontal overflow, source attribution off and preparation/outcomes visible. Viewport restored. Prototype shown to the user before starting the next domains. No provider exercises, sign-ups or course completion performed. This checkpoint is local; full Wave 3 publication follows the remaining domains.

Prototype committed and pushed as `05ad50d`; LT-029–031 accepted Done in Notion. LT-032/033 started with explicit coffee/clothing ownership.

Production-output preview on port 4182 additionally verified global search for Sound basics, keyboard focus/Enter on the result, and refresh of its module deep link under /latent-threads/. Module content, parent course and teaching links survived refresh.

GitHub App checks for exact prototype source `05ad50d30a83dcdf421393bdfe5e1c74af3dfe2e` completed successfully: [run 34708838195](https://github.com/karuhanga/latent-threads/actions/runs/34708838195). This is source validation, not a Wave 3 Pages deployment.

## Coffee and clothing review in progress

PM read all 36 clothing explanations/examples and learning setup; the festival shirt scenario makes design revisions, complete cutting bundles and inspection findings concrete. Sampled source bodies independently: CottonWorks Knit Basics and Garment Construction, plus USU Designer Pillowcase (woven fabric, machine sewing and pressing). Desktop Fabric cutting renders the work decision clearly; Machine sewing has an explicit learning exit to the pillowcase project with woven-material scope and equipment shown. Full pair acceptance waits for coffee integration and checks.

Coffee sources sampled independently: Blue Bottle pour-over procedure and setup, UCDA 2019 Arabica Handbook printed pages 85–86 on processing, and UC Davis research areas. These support a brewing/processing learning split. Existing company/place examples remain a separate, unchanged evidence set.

Coffee/clothing integration passes **90 tests**, type/data validation and production build (approximately 162 kB gzip). PM read all 36 coffee pages and requested removal of one visible evidence-scope aside from Green coffee export. Independently fetched Diedrich training/engineering URLs timed out; the builder's reviewed source passages and claim mapping remain the evidence for the expanded roasting detail. This is a recorded sampling limit, not a claim that PM read those pages.

Production preview: Moisture in coffee leads to Coffee processing and the UCDA learning guide. The guide renders its example/practice and useful starting-page instructions. Desktop Fabric cutting and coffee guide screenshots shown as checkpoint two. The reviewed depth gate now includes shared, music, housing, coffee and clothing; diagnostics/software remain required before release.

Coffee export copy refinement complete, focused JSON/release validation and content-depth tests passed; organization-related files and existing IDs/relations/evidence preserved by builder comparison. All builder writes stopped. LT-032/033 accepted by PM after the shown checkpoint.

## Final pair in progress

Checkpoint two source `d699383` pushed; LT-032/033 are Done in Notion. Diagnostics and software builders now own their packs/research. PM's release depth gate explicitly includes all seven enabled packs, so the pending final pair cannot be omitted accidentally.

PM independently reviewed MedlinePlus interpretation/context content and Google's Android course overview, Unit 1 and first-app codelab. Android overview confirms its computer/math preparation, Android Studio-capable computer, optional device, and named first unit with three pathways/10-hour provider estimate. Course/units remain linked to explicit learning claims, with tutorials retained separately. Final source/copy/UI acceptance is still pending.

## Complete catalog and release review

Final catalog: **181 nodes, 41 activities and 135 relations** across the seven enabled packs. All **222 pages** have explanations and original examples; every activity has input/output/decision fields. **20 learning resources** comprise five courses, three modules, three tutorials, five guides and four articles. Each domain has two or three nonmodule offerings. Shared content is included in the acceptance gate.

PM read every new domain explanation/example and learning setup. The final pair passed `pnpm check`: **94 tests**, type/data validation and production build. Builders separately verified their final evidence records, original IDs/shared links and scope. The publisher will rerun checks against the exact committed release source.

Production preview review after refreshing to the current build: Android course → Unit 1 keyboard navigation, explicit teaching links, the provider's 10-hour unit estimate and setup; CDC course at 360 × 800 with no horizontal overflow, account/audience conditions visible and no credential claim. Source preference remains checked across refresh; switching it off restores normal reading while retaining explanations, examples, preparation and outcomes. Viewport restored. The laboratory information subject screenshot shows the final checkpoint. Initial navigation in an already-loaded older preview correctly required a reload to load newly added IDs.

LT-034/035 accepted by PM; LT-036 final release review is active. Both builders stopped writes and are performing read-only peer reviews of the other builder's three domains. Publication remains pending those results and the clean-source release.

The production JavaScript bundle is approximately **183 kB gzip**. Vite warns about the uncompressed single chunk exceeding 500 kB. Current desktop/mobile preview checks found no loading issue; the static implementation remains appropriate for this catalog size. Provider exercises and authenticated course content were not executed. No real patient information or real-event examples were added.


## Peer review accepted

Both builders completed read-only reviews of the other builder's three domains with no material blockers. The housing/clothing/software reviewer independently sampled OpenLearn Energy in buildings, USU Designer Pillowcase and Android Unit 1. The music/coffee/diagnostics reviewer independently sampled OpenLearn Sound, UCDA 2019 processing/storage pages and CDC QMS. Each also read the current copy, learning setup and hierarchy evidence. Their limited samples agreed with the displayed claims; authenticated exercises and unsampled source passages remain outside those spot checks.

PM corrected six minor indefinite-article errors in music examples (A engineer/artist/arranger → An). No semantic claims changed. All agent writes are stopped. The complete wave is accepted for exact-source publication; all 94 checks will run again inside the publisher.

## Final verified release — 12 September 2026

The complete wave is live at https://karuhanga.github.io/latent-threads/.

- Reviewed source: `63a3d646daabb3519c653538ce9d6c8dad3a9098`.
- Deployment: `bb4b07b36881f8969cdb72477a1dfc13caf4c4df`.
- [Exact-source CI succeeded](https://github.com/karuhanga/latent-threads/actions/runs/34710304656).
- [Pages build and deployment succeeded](https://github.com/karuhanga/latent-threads/actions/runs/34710325851).
- The publisher installed from the locked, isolated committed snapshot and passed all 94 tests, type/data validation and production build. Deployment contains app assets, index.html, .nojekyll and release.json only, preserving gh-pages history.
- The public release.json returned the exact source commit above. PM refreshed the public Android course deep link and verified explanation, example, outcomes, preparation, Unit 1 and teaching links. Public home displayed the updated catalog and controls. Global Surprise me opened Audio signal processing; following its Mixing link showed the enriched live activity page. The browser was left on Mixing for user review.
- All nine Wave 3 tickets, LT-028–036, are Done in Notion, confirmed by a live board query. LT-036 moved through In review before PM acceptance. Both builders have finished; there are no remaining release blockers.

The outcome authorized by the active goal is achieved. Documentation-only handoff updates do not change the deployed source. Stop here for user review; do not infer another implementation wave. An already-open app tab should be refreshed to load the current catalog.
