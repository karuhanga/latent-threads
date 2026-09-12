# Wave 3 coffee depth and learning review

Reviewed 12 September 2026 for [LT-032](../tickets/LT-032.md), against the [Wave 3 contract](../product/wave-3.md). This extends the original [coffee research](coffee.md). The authored pack is schema 0.3: 30 nodes, six activities, 22 relations, 19 sources and 145 evidence records.

## What changed

Every coffee node and activity now has an explanation and a concrete example. Activities also identify inputs, outputs and a decision. Existing short summaries, IDs, stage order and cross-pack references are preserved. The three Uganda organization records and their original evidence are unchanged. They establish separate examples of activity in a place, not a shipment or a relationship between the companies.

The study branch adds Coffee science, with Coffee processing and Coffee brewing as subjects. Existing moisture and extraction concepts provide paths into work. These broader/narrower classifications are reviewed editorial inferences, recorded as such on the four `part_of` edges; they are nonexclusive subject groupings, not provider curricula. No role hierarchy or qualification is inferred from them.

## Sources and expanded claims

Primary pages were opened and read, including the relevant PDF body text. New `evidence:wave3-*` records cover the expanded factual copy; they sit alongside, and do not replace, the original evidence. The table maps the added explanations to source sections. The source IDs below use the `source:coffee-` prefix.

| Source and locator | Reviewed section | Expanded content mapped to it |
| --- | --- | --- |
| `ucda-robusta` — [Robusta Coffee Handbook](https://ugandacoffee.go.ug/sites/default/files/2022-03/Robusta%20Coffee%20Handbook.pdf) | Chapter 8, printed 89–90 / PDF 99–100 | Harvesting stage, grower, selective harvesting, ripeness |
| `ucda-arabica` — [Arabica Coffee Handbook](https://ugandacoffee.go.ug/sites/default/files/2022-03/Arabic%20Coffee%20Handbook.pdf) | Printed 85–89 / PDF 93–97 | Processor, washed-processing activity, handbook resource and its teaching edges |
| `codex-processes` — [Coffee processing definitions](https://www.fao.org/input/download/standards/11250/CXP_069e.pdf) | Definitions, printed 1–5; paragraphs 12–21 | Endeavor transformations, roasting stage, pulper and harvest-capacity decision |
| `fao-processing` — [Arabica coffee manual: harvesting and processing](https://www.fao.org/4/ae939e/ae939e08.htm) | Chapter 6: processing, hulling, sorting | Processing stage and subject; distinction between visible inspection and sample evaluation |
| `fao-moisture` — [Post-harvest handling and processing in Kenya](https://www.fao.org/4/x6939e/X6939e11.htm) | Drying; Coffee Storage | Moisture concept |
| `sca-courses` — [SCA coffee skills courses](https://sca.coffee/education/courses) | Introduction, Barista Skills, Brewing, Green Coffee | Endeavor framing, quality role/skill/activity, barista responsibilities and brewing subject |
| `ugacof` — [Ugacof](https://group.sucafina.com/network/ugacof-ltd/) | About company; product | Export stage, role and activity |
| `bluebottle-pour-over` — [How to make pour-over coffee](https://bluebottlecoffee.com/us/eng/brew-guides/pour-over) | Illustrated recipe sequence | Cup, pour-over skill/activity, scale usage and resource setup |
| `bluebottle-brewing` — [Pour-over coffee vs. coffeemaker](https://blog.bluebottlecoffee.com/posts/coffee-maker-vs-pour-over) | Extraction and scale explanations | Extraction, brewing stage, scale and artifact |
| `baratza-adjustments` — [Switching grind settings with confidence](https://www.baratza.com/en-au/blog/product-guides/switching-grind-settings-with-confidence) | Why adjustments matter; tracking; recognising when adjustments are needed | Grinder, extraction, brewing stage and activity |
| `ucdavis-research` — [UC Davis Coffee Center research](https://coffeecenter.ucdavis.edu/faculty-research) | Interdisciplinary research areas | Coffee science and inferred subject containment |
| `diedrich-cupping` — [Factory acceptance testing at Diedrich](https://www.diedrichroasters.com/onyx-coffee-lab-completes-successful-factory-acceptance-testing-at-diedrich/) | From the Roaster to the Cupping Table | Roaster role; roast evaluation in stage/activity |
| `diedrich-training` — [Roast Summit May 2026](https://www.diedrichroasters.com/roast-summit-chicago-may-2026/) | Practical training description | Roast control and activity |
| `diedrich-engineering` — [Evolving the DR-280](https://www.diedrichroasters.com/evolving-the-dr-280/) | Drum/airflow design and controls | Roasting machine explanation |

The old Diedrich manual remains the original evidence for earlier claims. Repeated attempts to reopen its operating pages during this pass timed out. Added roasting detail uses the three readable manufacturer articles above. No new machine settings or operating procedure are claimed from the unread pages.

## Learning exits

`resource:coffee-bluebottle-pour-over` remains the practical brewing option. The public guide can be read without enrollment; brewing along needs its equipment and ingredients, now visible in preparation. It teaches the existing pour-over skill and extraction concept. Quantities and timing belong to the provider's recipe, not a universal standard. No study-duration or credential claim is made.

`resource:coffee-ucda-postharvest` points to the existing **2019 Arabica Coffee Handbook**, specifically printed pages 85–89. It is a guide to a selected chapter, not a new course title or curriculum module. Its explicit teaching edges reach Coffee processing and Moisture in coffee. The PDF was readable without sign-in. Introductory level, paper mapping and the suggested preparation are editorial learning guidance. Practical processing requires facilities and appropriate training; reading the chapter does not confer operational competence.

Both resources expose kind, preparation and outcomes. Access is free to read; an open reuse license and credentials were not verified. No `learning_requires` edge is inferred from suggested preparation. No third offering was needed to provide a useful choice between post-harvest handling and brewing.

## Original examples and editorial rationale

All 36 examples are original teaching scenarios authored for their pages, not reports about named people, farms or businesses. Each has reviewed direct evidence pointing here through `source:wave3-coffee-editorial`. The rationale is to make the externally supported mechanism or work decision concrete: a mixed branch makes selective picking visible; two drying inputs distinguish routes; differing samples distinguish observation from evaluation; comparing a preparation with its notes makes an adjustment intelligible.

Scenario details, observations and choices do not assert measured outcomes or guaranteed improvements. Paper exercises and suggested preparation are our proposals, not provider admission requirements. Company evidence never identifies an actual overseas customer, sale, shipment or eventual café. The default product copy describes the work; these scope limits remain in research and notes.

## Checks and limits

- Aggregate `assertCatalog` passed in release mode dated 2026-09-12.
- Focused coffee audit passed: all 36 pages meet the depth guard, have new reviewed external-detail evidence and direct editorial-example evidence; all six activities have input/output/decision fields.
- Both independent learning offerings have visible setup and explicit teaching links. Every coffee node/activity is reachable from `endeavor:coffee-cup`, traversing paginated graph neighborhoods.
- Original IDs, relations and evidence were compared with `HEAD`; retained exactly. Organization examples, places, presence assessments and taxonomy mapping files are byte-for-byte unchanged.
- `node --test tests/content-depth.test.mjs` passed all 10 tests, including PM's newly added coffee/clothing gates. The final export-copy edit removes review commentary without changing claims or structure.

Schema validity does not establish factual support. This pass separately read and mapped the sources. Historical FAO material supplies basic processing mechanisms; its local institutions, prices, numerical prescriptions and national generalisations are not carried into current Uganda claims. Manufacturer material is used for concrete work and equipment concepts, without performance superiority claims. No roasting, processing or brewing exercise was executed. PM owns integrated checks, interface review, acceptance and publication.
