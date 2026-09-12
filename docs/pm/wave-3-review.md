# Wave 3 review and delivery

## Foundation in progress — 12 September 2026

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
