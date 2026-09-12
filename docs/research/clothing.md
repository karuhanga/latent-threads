# Clothing content review

Reviewed 2026-09-12 by `agent:deployment_review` for [LT-024](../tickets/LT-024.md), using the [Wave 2 contract](../product/wave-2.md). The pack contains 27 nodes, 6 activities, 19 relations, 2 learning resources and 65 evidence records. Nine primary sources were read before authoring; the tenth source records this editorial review.

## Scope, framing and limits

The endeavor is T-shirt production and retail. The selected route covers knitted fabric, design, cutting, sewing, quality assessment and retail. A T-shirt is the concrete output. This is a useful cut-and-sew example, not a claim that every garment uses these methods. Stage positions are editorial reading order. Design decisions and quality work can recur throughout production.

Six roles span textile machinery, creative design, practical cutting/sewing, inspection and customer-facing retail. Occupational sources support specific work descriptions, not exact taxonomy mappings, credentials or universal duties. O*NET describes work in the United States; the pack does not project its employment conditions, pay, qualifications or occupation statistics onto other places. No organization, country-presence claim, factory sequence or supplier relationship is asserted.

## Primary-source review

| Source | Read section and supported scope |
| --- | --- |
| [CottonWorks: Knit Basics](https://cottonworks.com/learning-hub/knitting/knit-basics/) | What are Knits?, Knit Properties and Weft Knitting: yarn loops, stretch, machinery and T-shirts. |
| [CottonWorks: Garment Construction](https://cottonworks.com/learning-hub/garment-manufacturing/garment-construction/) | T-Shirt Construction, Pattern Engineering, Marker Making and Cutting Methods: assembly, cutting and material utilization. |
| [CottonWorks: Garment Quality Control](https://cottonworks.com/learning-hub/garment-manufacturing/garment-quality-control/) | Fabric Quality & Grading Systems and Inspection: fit, seams and defects. |
| [O*NET: Textile knitting and weaving machine work](https://www.onetonline.org/link/summary/51-6063.00) | Tasks: setup, threading, operation and adjustment of fabric machinery. |
| [O*NET: Fashion Designers](https://www.onetonline.org/link/summary/27-1022.00) | Tasks: sketches, materials, construction specifications and samples. |
| [O*NET: Cutters and Trimmers, Hand](https://www.onetonline.org/link/summary/51-9031.00) | Tasks: textile cutting, templates, dimensions, marking and tools. |
| [O*NET: Sewing Machine Operators](https://www.onetonline.org/link/summary/51-6031.00) | Tasks: matching and joining garment parts, stitch defects and ruler checks. |
| [O*NET: Inspectors, Testers, Sorters, Samplers, and Weighers](https://www.onetonline.org/link/summary/51-9061.00) | Tasks: dimensional conformance, defect inspection and records. |
| [O*NET: Retail Salespersons](https://www.onetonline.org/link/summary/41-2031.00) | Tasks: selection, product advice, fitting and purchase transactions. |

Each displayed factual node, activity and relation has reviewed external support in [evidence.json](../../data/clothing/evidence.json). Exact locators and sections appear in [sources.json](../../data/clothing/sources.json). Sources are linked with concise paraphrases, not imported diagrams or substantial source text. Cotton Incorporated is a textile-industry organization; its manufacturing explanations are used without adopting marketing or environmental claims.

## Learning and cross-catalog connections

Both CottonWorks learning pages were publicly readable without an account on the review date. The Knit Basics article connects to knit structure; Garment Construction connects to pattern cutting and pattern yield. Their introductory descriptions refer to the written overviews; Knit Basics also includes diagrams. Embedded video playback was not separately tested. These are learning introductions, not machine-operator training or a complete sewing course.

Access is marked free. Reuse is marked restricted because the pages reserve copyright; no open license is asserted. The app links to the original resources.

Fabric cutting and garment inspection both reference existing `knowledge:measurement`: one locates cuts using dimensions; the other compares a finished garment with dimensional requirements. Their evidence is specific to those applications. No shared record is copied or redefined.

## Verification

An in-memory merge of the enabled catalog (`song`, `shared`, `housing`, `coffee`) plus `clothing` passed the current `validateCatalog` release checks with zero errors on 2026-09-12. Additional Node assertions passed for six stages/activities/roles, all clothing entities reachable, reviewed external evidence for every factual subject, the artifact’s reverse route, cutting/inspection → measurement → coffee, three learning paths, two reviewed free resources, no copied shared measurement node, and valid local document links.

Source support was reviewed separately from structural coverage. The plain-language explanation of seam integrity is explicitly labeled as an inference from the source’s quality criterion. This builder did not enable the pack in `data/catalog.json`, inspect the UI or publish it. PM source review and UI acceptance remain separate integration steps.
