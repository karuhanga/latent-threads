# Wave 3 — Content depth and education

Authorized 12 September 2026 by “Go ahead /goal”, accepting the content-depth proposal. Deliver and deploy richer descriptions/examples across all six current domains, plus browsable education. [Proposal rationale](content-depth-proposal.md). Routine decisions are delegated to PM; show checkpoints, then stop for user review.

## Acceptance and checkpoints

1. Music + housing prototype: readable depth on every current node/activity in those packs; shared explanation UI; subject hierarchy; at least one verified course with two named curriculum modules and explicit teaching connections; one sourced role specialization distinct from subject hierarchy. Show before broadening acceptance.
2. Coffee + clothing depth and education, preserving the prototype standard. Show usable checkpoint.
3. Diagnostics + software plus shared content; final all-six audit, test and publish.

Every current node/activity receives concise useful explanatory depth and a concrete labeled example, with safe optional practice when suitable. Do not pad to word counts. Activities explain input, output and a decision; roles explain responsibilities/deliverables; concepts/tools make an example intelligible. Existing summaries remain short for tiles. Keep explanations and practical learning setup visible by default; provenance stays behind Details. Details must not assert unsourced facts or pass editorial examples off as actual cases.

Each domain gets a browsable field/subject branch connected to its work and two or three suitable verified learning options (reuse existing). Across the release include structured courses and hands-on/trade learning, not only academic degrees. Every new resource is reachable through explicit teaches edges and/or reviewed curriculum membership; no orphan course directory. Actual programs/credentials are optional only when a useful sourced example warrants them. Do not infer qualification from course completion.

## Reviewed v0.3 implementation contract

Extend Node and Contribution with optional `details`:
`{ explanation: string, example: { title: string, body: string }, inputs?: string, outputs?: string, decision?: string, practice?: string }`.
All strings nonempty when present; object/shape validation, reject empty arrays/unknown fields. Explanation and example required together. Example is our explicitly labeled editorial scenario, supported by the underlying factual explanation. Add reviewed external evidence for new factual detail, and editorial evidence/rationale for invented examples. Existing external node evidence does not automatically substantiate arbitrary expanded copy. Research notes map expanded content to source support.

Learning resources may add `resourceKind`: `program | course | module | tutorial | guide | article | workshop | apprenticeship`; keep existing `format` separate. Optional `preparation`, `effort`, `credential` are nonempty strings; optional `outcomes` is a nonempty array of nonempty strings. Preparation and relevant access/equipment/credential conditions remain visible, not hidden in notes. Unknown credential is omitted, not “none”. Current access/license fields remain intact.

Reuse knowledge.kind field/subject/topic/concept and existing child→broader `part_of`; use entity-specific type labels throughout discovery and exploration. Existing role→role specializes remains distinct.

Add `curriculum_part_of`: learning_resource→learning_resource, child module/course to parent course/program; validate structured kinds, evidence, self/duplicate/cycle rejection. Allow shared child identities with multiple parents. Add `learning_requires`: learning_resource→learning_resource/knowledge/capability, for sourced provider prerequisites; cycles among resources invalid. Keep editorial suggested preparation as prose, not this relation. Neither containment nor prerequisites imply teaches or qualification.

Support schemaVersion 0.3 in pack/aggregate loaders while preserving legacy 0.1/0.2 loading. New fields/relations require 0.3 in authored packs. PM owns aggregate manifest/schema updates; builders update their owned pack manifest when using 0.3. Do not require all packs to upgrade simultaneously during prototype delivery. Final acceptance tests require depth in every enabled node/activity and useful education in each domain.

## Ownership and delivery

LT-028 platform contract/validator/graph; LT-029 PM reader UI; LT-030 music; LT-031 housing; LT-032 coffee; LT-033 clothing; LT-034 diagnostics; LT-035 software; LT-036 final review/deployment. At most two builders alongside PM. Data builders own only their domain pack and its wave-3 research note; PM owns data/shared, aggregate manifest, UI, docs integration and release. Shared node additions require coordination. No commits/pushes by builders.

Continue static implementation and existing Pages publication. No new verticals, backend, accounts, institution directory, enrollment, licensing engine, assessments or Rabbit Hole feature. Source-review quality and readable examples matter more than volume. Real desktop/mobile/keyboard and source-preference inspection, semantic negative tests, existing regression suite and exact hosted provenance required.

## Editorial acceptance guardrails

Every enriched node/activity, including newly added education nodes, has details. Activities include inputs, outputs and decision. Learning resources include resourceKind, preparation and outcomes. Lightweight automated checks reject explanations below 20 words and examples below 15 words as likely omissions; these are lower guardrails, not writing targets or substitutes for editorial review. PM may record a justified exception when shorter copy communicates better.
