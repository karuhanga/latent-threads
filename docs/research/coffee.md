# Coffee content review

Reviewed 2026-09-12 by `agent:deployment_review` for [LT-022](../tickets/LT-022.md), using the [Wave 2 contract](../product/wave-2.md). Source pages and the cited PDF sections were read before claims were authored. The pack contains 26 nodes, 6 activities, 16 relations, 3 organization examples and 58 evidence records. Nine external primary sources support the factual content; one internal source records the editorial framing.

## Scope and framing

The endeavor is Coffee production and brewing, with a cup of coffee as its output. The six reading groups are Harvesting, Processing, Quality assessment, Export, Roasting and Brewing. Their order is editorial: it is not a mandatory sequence or a complete supply chain. Quality checks can recur; processing and brewing methods vary. Washed processing and pour-over brewing are selected examples, not universal methods.

Role labels describe the work represented by each activity; they do not assert professional credentials or universal collaboration. The three Uganda businesses are independent activity examples. No shipment, buyer relationship, partnership or supplier chain is inferred between them. The Namanve address is an office location, not a claim that every Kyagalanyi processing facility is there. Endiro is attached to brewing in Uganda, not to roasting there.

## Primary-source review

| Source | Read section and supported scope |
| --- | --- |
| [UCDA Robusta Coffee Handbook](https://ugandacoffee.go.ug/sites/default/files/2022-03/Robusta%20Coffee%20Handbook.pdf) | Preface; printed pp. 89–90: growers, progressive ripening and selective harvesting. |
| [UCDA Arabica Coffee Handbook](https://ugandacoffee.go.ug/sites/default/files/2022-03/Arabic%20Coffee%20Handbook.pdf) | Printed pp. 85–89: processing methods, pulping, drying and moisture during storage. |
| [Specialty Coffee Association courses](https://sca.coffee/education/courses) | Introduction, Barista Skills and Green Coffee: grading, sample assessment and service. |
| [Diedrich IR Series manual](https://www.diedrichroasters.com/wp-content/uploads/2017/05/IR-Series-Installation-Operation-Manual-2017.pdf) | Professional-operator notice and §9.2, printed pp. 19–20: roast observation and controls. |
| [Blue Bottle pour-over guide](https://bluebottlecoffee.com/us/eng/brew-guides/pour-over) | Introduction and steps 1–8: the learning exit and served drink. |
| [Blue Bottle brewing explanation](https://blog.bluebottlecoffee.com/posts/coffee-maker-vs-pour-over) | Extraction, grinding and “Use a Scale to Find the Right Brew Ratio.” |
| [Volcafe: Kyagalanyi, Uganda](https://www.volcafe.com/network/uganda/) | Processing facilities and office address: Kyagalanyi → washed processing, Uganda. |
| [Sucafina: Ugacof](https://group.sucafina.com/network/ugacof-ltd/) | Company and product description: Ugacof → green-coffee export, Uganda. |
| [Endiro wholesale FAQ](https://www.endirocoffee.com/wholesale-faq) | Brew methods and tree-to-cup answers: Endiro → pour-over brewing, Uganda cafés. |

Claim-level evidence and source locators are in [evidence.json](../../data/coffee/evidence.json) and [sources.json](../../data/coffee/sources.json). Company pages are self-descriptions, checked only for the displayed activity and place. Organization evidence has a review date of 2027-03-12; marketing claims, certifications, employment conditions and market rankings were not adopted.

## Learning and shared meaning

The public Blue Bottle guide was readable without an account on the review date. “Beginner” is an editorial audience assessment; it is one brewer’s method. Access is marked free and reuse permission unknown. Equipment is not included. No recipe quantities, roasting settings or machinery operating instructions are reproduced in the app.

Coffee brewing references the existing `knowledge:measurement` through measured coffee and water quantities, with its own Blue Bottle evidence. The pack does not redefine that shared concept or `place:uganda`. No broad country-presence assessment is inferred from these examples.

## Verification and limits

An in-memory merge of `song`, `shared`, `housing` and `coffee` passed the current `validateCatalog` release checks with zero errors on 2026-09-12. The coffee pack was not enabled by this builder in `data/catalog.json`. Structural validation establishes valid records, references and evidence coverage; it does not establish source truth. PM source review and actual UI acceptance remain separate integration steps.

Additional Node assertions passed: six stages/activities/roles; all coffee entities reachable from the endeavor; each example available on its activity, stage and endeavor; external reviewed evidence for every factual coffee subject; both extraction and pour-over skill leading to the guide; `contribution:song-mix` → measurement → coffee brewing; and valid local links in this document.
