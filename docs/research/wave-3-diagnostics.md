# Wave 3 diagnostics depth and learning review

Reviewed 12 September 2026 for [LT-034](../tickets/LT-034.md), against the [Wave 3 contract](../product/wave-3.md). This extends the original [diagnostics research](diagnostics.md). The schema 0.3 pack contains 25 nodes, seven activities, 19 relations, 17 sources and 125 evidence records.

## Scope and content decisions

Every node and activity now has an explanation and an original example. Activities identify an input, output and decision. Existing IDs, short summaries, source records, evidence, relations and shared links are preserved. Readiness remains recurring work; the six stages are a reading order, not a clinical protocol. Blood collection, microscopy and automated cell counting remain selected examples rather than a universal sequence.

New Medical laboratory science and Laboratory information management nodes connect the study branch to reporting, identification and the existing quality-management concept. The two broader/narrower edges are explicitly reviewed editorial inferences. They organise knowledge for browsing, not an accredited curriculum or a role qualification.

No clinical thresholds, sample-collection steps, instrument settings, treatment decisions, staffing rules or current regulatory requirements are introduced. The explanations concern work, information and quality at a high level. Suggested practice uses made-up records without specimens or patient data.

## Primary-source mapping

Sources were opened and read during this pass. The WHO PDF passages below were read as text, not inferred from their download titles. Added `evidence:wave3-*` records cover the expanded claims and sit alongside the original evidence. Source IDs in this table use the `source:diagnostics-` prefix.

| Source | Reviewed passage | Expanded content |
| --- | --- | --- |
| `workflow` — [WHO Quality Management](https://extranet.who.int/lqsi/node/336) | Core process, process controls and quality-system essentials | Endeavor; readiness, analysis and reporting stages; quality concept; analysis activity |
| `information` — [WHO Information Management content sheets](https://extranet.who.int/hslp/who-hslp-download/package/501/material/313) | PDF pages 1–4 | Report, reporting activity, information-management subject, associated guide and teaching/work edges |
| `sample-management` — [WHO Sample Management content sheets](https://extranet.who.int/hslp/who-hslp-download/package/501/material/179) | PDF pages 1–8, especially 6–8 | Preparation stage, skill and activity |
| `organization` — [WHO Organization content sheets](https://extranet.who.int/hslp/who-hslp-download/package/501/material/320) | PDF pages 2–7 | Quality manager, quality assurance and organisational responsibilities |
| `maintenance` — [WHO maintenance programme overview](https://www.who.int/publications/i/item/9789241501538) | Publication-page overview | Inspection, preventive and corrective maintenance distinction |
| `phlebotomy` — [BLS Phlebotomists](https://www.bls.gov/ooh/healthcare/phlebotomists.htm) | What They Do / Duties | Collection stage/activity, phlebotomist and identification skill |
| `laboratory` — [BLS Clinical Laboratory Technologists and Technicians](https://www.bls.gov/ooh/healthcare/clinical-laboratory-technologists-and-technicians.htm) | Duties; education's subject areas | Scientist, examination methods, automated counter and field of study |
| `repair` — [BLS Medical Equipment Repairers](https://www.bls.gov/ooh/installation-maintenance-and-repair/medical-equipment-repairers.htm) | Duties, fault investigation and records | Technician and maintenance activity |
| `physician` — [BLS Physicians and Surgeons](https://www.bls.gov/ooh/healthcare/physicians-and-surgeons.htm) | What They Do / Duties | Physician and interpretation activity |
| `results` — [MedlinePlus laboratory results](https://www.medlineplus.gov/lab-tests/how-to-understand-your-lab-results/) | Test purpose, units, reference ranges and other health information | Report units, interpretation stage/concept and public learning article |
| `microscopy` — [CDC Basic Microscopy](https://www.cdc.gov/lab-training/php/courses/basic-microscopy.html) | Overview and objectives | Microscope explanation; no operating steps or course-credit claim |
| `cdc-qms` — [CDC Fundamentals of Quality Management Systems](https://reach.cdc.gov/course/fundamentals-quality-management-systems) | Description, audience, objectives, duration | New course metadata and explicit teaching connection |
| `cdc-faq` — [OneLab REACH FAQs](https://reach.cdc.gov/faqs) | How do I launch a course? | Account requirement in visible course preparation |
| `cdc-education` — [CDC educational materials](https://www.cdc.gov/laboratory-systems/php/educational-materials/index.html) | About | Free access policy for DLS courses |

BLS is used for occupational duties and subject areas, without transferring US licensing, salaries or education-entry requirements to other settings. Historical WHO training material supplies general principles; its ISO references, retention instructions, numbering recipe and collection procedures are not reproduced as current requirements. WHO's LQSI overview displayed server warnings but its content was readable. The toolkit landing page was intermittent; the selected direct Information Management PDF opened successfully.

## Three learning options

- `resource:medlineplus-lab-results` is an article for the public. It teaches Clinical context. It was readable without an account; preparation is reading and optional discussion of a fictional report. No result values or clinical diagnosis exercises are supplied.
- `resource:who-laboratory-information-guide` is a standalone reading guide comprising the toolkit's Information Management content sheets. It teaches the new subject and Sample identification. The public 10-page PDF was readable without sign-in; pages 1–4 are the suggested start. A paper exercise traces made-up identifiers across a request, worksheet and report. It is our exercise, not a provider assessment or an operational numbering scheme.
- `resource:cdc-quality-management` is the provider's basic one-hour course for clinical and public health laboratory professionals. It teaches Laboratory quality management. The public listing and objectives were reviewed, and CDC's FAQ confirms sign-in is required to launch. The free-course policy was independently read. Content behind sign-in was not launched or completed. Its CME/CEU instructions have an August 1, 2026 deadline, so no current credit or credential is promised.

All three have visible kind, preparation and outcomes. Free access is separate from reuse permission, which remains unverified. Suggested preparation is prose; no provider prerequisite or competence is inferred through a `learning_requires` edge. Current course-launch availability after authentication has not been independently exercised.

## Original examples and rationale

All 32 examples are original educational scenarios, covered by reviewed direct evidence pointing to this note through `source:wave3-diagnostics-editorial`. They are not reports of patients, laboratories or incidents. Identifiers, records, service logs, observations and choices in them are invented for explanation.

The examples make the sourced work understandable: a copied identifier illustrates loss of connection between records; a blank review step distinguishes recording from completed reporting; a service history makes maintenance work traceable; a question about a report connects it with clinical context. None asserts a numerical performance result, diagnostic outcome or guaranteed improvement. The paper practice requires no private data and makes no claim to certify a learner for clinical work.

## Verification

- Aggregate `assertCatalog` passed in release mode dated 2026-09-12.
- Focused diagnostics audit passed for all 32 pages: complete explanations/examples, new reviewed external-detail evidence and direct editorial-example evidence.
- All seven activities contain input/output/decision fields. All three offerings contain visible setup and explicit teaching links.
- Every diagnostic node/activity is reachable from `endeavor:laboratory-testing`, using paginated graph traversal. Field/subject browsing connects to existing work.
- All original IDs, relations, sources and evidence were compared with `HEAD` and preserved. Organization/geography/presence/taxonomy files remain byte-for-byte unchanged.
- `node --test tests/content-depth.test.mjs` passed all 14 tests, including PM's final all-seven-pack gates. No full suite or UI review was run by this builder.

Passing validation does not fact-check the copy; the source review above is separate. No collection, examination, repair, clinical interpretation or authenticated course exercise was performed. PM owns integrated acceptance, interface review and publication.
