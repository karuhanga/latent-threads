# Wave 3 clothing depth review

Reviewed 12 September 2026 for [LT-033](../tickets/LT-033.md) and the [Wave 3 contract](../product/wave-3.md). Candidate author/reviewer: `agent:ontology_first_slice`. PM owns acceptance, integration and publication. The earlier [clothing research](clothing.md) remains intact.

## Scope and editorial choices

The pack retains its existing 27 node IDs, six activities, stage order and shared Measurement links. It adds Textile technology, Knitted fabric technology and one practical learning resource. All 30 nodes and six activities now have an explanation and original example; each activity also identifies inputs, outputs and a decision. The pack uses schema 0.3.

The blue shirt for a community festival is an original fictional scenario, not a reported supplier case. Its organiser, samples, revisions, batch problems and customer encounters are invented to make choices intelligible. Other examples use observation, paper layouts or practice scraps. No numerical production result, factory staffing rule or local presence is implied. The app labels the examples; their titles therefore do not repeat that label. `source:clothing-depth-editorial` and a separate reviewed evidence row on each page record this rationale.

Stage order remains an editorial reading structure. Design and inspection may recur. Mechanism and responsibility claims have additional external evidence explicitly attached to the expanded page; old evidence was preserved. The `evidence:clothing-depth-*` rows identify which new factual claims were reviewed. Passing validation alone does not establish their accuracy.

## Expanded-claim source map

All external pages below were opened in this review on 12 September 2026. The source records contain precise sections; individual evidence rows name the supported claim.

| Primary source | Expanded pages and review boundary |
| --- | --- |
| [CottonWorks Knit Basics](https://cottonworks.com/learning-hub/knitting/knit-basics/) | Knit structure and its learning article. Reviewed loop terminology and jersey surfaces; history and promotional comparisons were not adopted. |
| [CottonWorks Knit Machinery](https://cottonworks.com/learning-hub/knitting/knit-machinery/) | Fabric production and Knitting machine. Reviewed circular-machine material path; no setup values or operating procedure imported. |
| [CottonWorks Garment Construction](https://cottonworks.com/learning-hub/garment-manufacturing/garment-construction/) | T-shirt artifact, cutting, Pattern yield and construction article. Reviewed T-shirt parts, marker and assembly sections. No diagrams, pattern or video transcript copied. |
| [CottonWorks Garment Quality Control](https://cottonworks.com/learning-hub/garment-manufacturing/garment-quality-control/) | Quality assessment. Used the distinction between dimensions and other garment qualities; no grading system or acceptance threshold adopted. |
| [USU Considerations for Knit Fabrics](https://extension.usu.edu/sewing/files/3pub__6760052.pdf) | Seam integrity and Garment sewing activity. Both PDF pages reviewed for sampling, stretch and seam observations. No numerical method or machine setting reproduced. |
| [USU Basic Sewing Supplies](https://extension.usu.edu/sewing/research/basic-sewing-supplies) | Fabric shears and Ruler. Reviewed tool functions; no product recommendation or purchase claim. |
| [BLS Fashion Designers](https://www.bls.gov/ooh/arts-and-design/fashion-designers.htm) | Endeavor, Design stage and Garment design skill. Reviewed duties and prototype revision. No wage, employment outlook, timeline or qualification claim imported. |
| [O*NET knitting operators](https://www.onetonline.org/link/summary/51-6063.00) | Textile knitting operator and Fabric knitting activity. Selected knitting-relevant duties from the broader knitting/weaving occupation. |
| [O*NET fashion designers](https://www.onetonline.org/link/summary/27-1022.00) | Fashion designer and Garment design activity. Selected documentation and sample-review duties. |
| [O*NET cutters](https://www.onetonline.org/link/summary/51-9031.00) | Garment cutter, Pattern cutting, Cutting stage and Fabric cutting activity. General cutting duties applied to the existing garment context. |
| [O*NET sewing operators](https://www.onetonline.org/link/summary/51-6031.00) | Sewing stage, operator, Machine sewing and Sewing machine. Selected garment guidance and stitch-monitoring duties. |
| [O*NET inspectors](https://www.onetonline.org/link/summary/51-9061.00) | Garment quality inspector, inspection skill and activity. General inspection duties are explicitly applied to this garment route. |
| [O*NET retail salespeople](https://www.onetonline.org/link/summary/41-2031.00) | Retail stage, role and activity. Product selection, information and transactions; no assumed retail employer or country. |
| [NC State Textile Technology](https://textiles.ncsu.edu/academics/undergraduate/textile-technology/) and [TT course catalogue](https://catalog.ncsu.edu/course-descriptions/tt/) | Field and subject scope, with TT 341 supporting Knitted fabric technology. The degree itself is not added as a learning offering. |
| [USU Designer Pillowcase](https://extension.usu.edu/sewing/research/designer-pillowcase) | Practical resource and its Machine sewing teaching link. Reviewed supplies, construction and pressing sections. Original overview only; no pattern or images copied. |

O*NET and BLS describe US occupational contexts. The pack uses selected work descriptions, not a claim that every worker has every duty or needs a particular credential. CottonWorks is an industry organisation; manufacturing explanations do not establish its broader promotional claims.

## Education connections and access

The branch is `Knit structure → Knitted fabric technology → Textile technology`, using child-to-broader `part_of`. NC State lists Knitted Fabric Technology within its Textile Technology catalogue. Nesting our loop-structure concept under that subject is an **inference**, explicitly labelled in evidence: it is a conceptual mapping, not a named provider module. Neither relation grants competence or qualification. Existing work reaches the branch through Fabric knitting and Knit structure.

Three nonmodule offerings are reachable through explicit `teaches` edges:

- **Knit basics**, article: Knit structure.
- **Garment construction**, article: Pattern cutting and Pattern yield.
- **Designer pillowcase**, guide: Machine sewing.

All three public bodies opened without an account; access checks are dated 12 September 2026. The two CottonWorks pages reserve copyright, so their existing restricted-reuse labels remain. The USU guide's reuse license is **unknown**; free reading does not establish permission to republish it. All external source content remains linked, without copied assets. Credential and completion-time fields are omitted because neither was established for these offerings.

The pillowcase is a woven-fabric exercise, not a knit T-shirt tutorial. Its visible preparation identifies fabric, thread, a sewing machine, an iron, basic supplies and prior machine familiarity. That familiarity is editorial preparation rather than a formal provider prerequisite, so no `learning_requires` edge was invented. Equipment and materials are separate from free access. The industrial articles also state the limits of reading an overview. Embedded videos were not played and the sewing project was not executed.

## Focused verification and remaining limits

Ran an in-memory Node assertion pass against the actual aggregate and clothing pack:

- Release validation: **0 errors**.
- Schema 0.3; **36/36** pages meet the depth guardrails, without repeating tile summaries; **6/6** activities have inputs, outputs and decision.
- **3/3** resources have kind, preparation, outcomes and teaching connections; both new study areas and all resources are discoverable.
- Graph traversal from the T-shirt endeavor reaches **all 36** clothing pages and the shared Measurement node.
- Organisation examples and presence assessments remain empty; no geography or shared identity was added.
- Existing vertical integration suite: **11/11 tests passed**, including six-domain discovery and reviewed shared bridges. `git diff --check` passed for the owned data changes.

PM independently sampled the source pages and reviewed all 36 explanations/examples with no requested content revisions. Integrated regression checks, visual acceptance and publication remain PM-owned. No local making exercise, textile test, machine operation or credential outcome has been verified. Resource access may change after the recorded review date.
