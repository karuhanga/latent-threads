# Proposal — content depth and education

Status: accepted by “Go ahead /goal” on 12 September 2026. [Wave 3](wave-3.md) is the implementation scope. Wave 2 remains the deployed baseline. User requests richer descriptions and examples across the existing six domains, and education such as courses, hierarchies and specializations.

## Observed gap

The deployed catalog has six endeavors, six artifacts, 36 stages, 38 roles, 24 capabilities, 18 concepts, 18 tools, 11 learning resources and 41 contextual activities. Most descriptions/actions are one sentence. Courses already fit learning_resource, but currently lead outward; the existing field/subject model is not populated or exposed clearly, and program/module structure is not modeled. Existing specializes connects roles only. Useful explanatory scope sometimes sits in notes hidden by the sources preference.

## Proposed editorial structure

Keep short summaries for tiles and connections. Add a readable explanation on detail pages, a concrete example and useful next connections. Aim for roughly 80–150 words on substantial pages where needed; smaller entities may need less. Word counts guide editing, not acceptance.

Adapt depth to the entity:

- Endeavor/output: what is made, who it serves, the main constraints, a coherent example followed through its process, and selected alternative approaches.
- Stage/activity: what comes in, what someone actually does, what comes out, a meaningful decision or tradeoff and how the result affects another activity in this context.
- Role: responsibility, typical decisions and deliverables, work settings and neighboring roles/specializations. Keep roles distinct from people and avoid universal collaboration claims.
- Concept/skill: plain explanation, example in use, common confusion, and an approachable practice exercise when suitable.
- Tool: job it helps with, concrete use, what skill the operator still needs, and a small number of meaningful alternatives.
- Learning resource: what the learner will be able to do, intended audience, prerequisites, format/effort, access and relevant curriculum connections.

Explanatory content, examples and required setup are normal product content. Source citations, attribution, review dates and evidence reasoning remain behind the existing details preference. Examples written by us are labeled as examples; factual case studies require sources.

## Example of the proposed reading experience

An illustrative Mixing page could move beyond “balance recorded parts” to a concrete situation: a vocal is difficult to hear once the other instruments enter. Walk through the decision to change a level or adjust a competing part, then connect that choice to balance, arrangement and listening. Show the input (recorded parts), output (a mix), and an introductory listening exercise. This is a draft editorial scenario, not a sourced case study or final release copy.

The aim is a small explanation that makes the existing links meaningful. Keep optional deeper material below the main explanation, rather than crowding discovery tiles or hiding ordinary explanations with attribution controls.

## Education model

Make education browsable through the same graph. Distinguish:

- Fields of study and specializations: broad and narrower subject areas. Subjects can belong to multiple broader fields.
- Programs, courses and modules: actual learning offerings with supported composition relationships. A program can contain courses; a course can contain modules. Not every provider uses the same structure.
- Skills/concepts taught and prerequisites: cross-links to existing content, independent from course containment.
- Credentials: what a particular offering awards, if anything; do not equate a course, subject, role or credential.

A study specialization, a specialized occupation and a provider's branded course series are different meanings of specialization. UI labels and relationships must distinguish them. Do not turn every degree, course and job into one universal hierarchy.

Reuse existing knowledge nodes (field, subject, topic and concept) and their part_of relations for subject structure. Preserve courses as learning_resource with structured kinds/composition; keep curriculum kind separate from delivery format. Add a precise curriculum-containment relation, distinct from prerequisites and role specialization. Keep explicit teaches claims: membership does not imply that a course teaches an entire discipline. Separate provider-required prerequisites from editorial suggested preparation. Reuse shared module identities, validate cycles and source membership. Start credential outcomes as verified metadata unless a concrete navigable example warrants standalone identity. The precise schema extension requires a small reviewed contract before implementation. No backend is needed. Programs and course structures should follow provider evidence; our suggested learning sequences must be clearly editorial.

Education should include vocational courses, supervised practical training, apprenticeships, self-directed learning and academic programs. Start with concrete course examples and subject branches; selectively add sourced local providers, without a directory or enrollment integration. A learning link does not establish professional qualification or permission to practice.

## Candidate enrichment by domain

| Existing domain | Deeper work examples | Education subjects to research |
| --- | --- | --- |
| Music | Carry a demo through arrangement, recording, mixing and release; explain decisions and handoffs | Music theory, audio engineering, songwriting |
| Coffee | Follow a selected batch from harvest to cup; explain quality decisions and processing alternatives | Agronomy, post-harvest processing, sensory skills, barista training |
| Housing | Follow a small home from brief and drawings through trades and coordination | Architecture, surveying, construction management, carpentry, electrical installation |
| Clothing | Follow a T-shirt from design and fabric through cutting, sewing and inspection | Textile technology, fashion design, pattern cutting, garment construction |
| Diagnostics | Explain the path from a sample to a report, including quality and equipment roles, without clinical operating instructions | Laboratory science, biomedical equipment maintenance, quality management |
| Mobile apps | Follow a small app from user need through prototype, implementation, testing and support | Computer science, interaction design, software engineering, testing |

These are research candidates, not verified course offerings or claims of universal curricula.

## Suggested progressive scope

1. Build a complete depth prototype in music and housing: professional/creative work and hands-on trades. Show endeavor, activity, role, concept, tool and course pages. Across the pair, prove one complete sourced education example: broader subject → narrower topic → actual activity, plus a provider course → two named modules with explicit teaching links and prerequisites. Include a role-specialization example separately. Choose providers after reviewing their published curricula.
2. Apply the reviewed content structure to all current pages across the six domains, prioritizing the 41 activities and their outputs/decisions. Every existing entity gets an editorial pass; do not add paragraphs mechanically.
3. Add a small education layer across every domain: target two or three verified learning options spanning an approachable start, structured course/training and deeper study. Reuse suitable existing resources. Extend course breakdowns after reviewing the prototype; prioritize useful provider evidence rather than imposing a curriculum quota per domain.

Keep the three strands separate in acceptance: prose depth, concrete examples/connections, and educational exploration. A page succeeds when someone can explain the work, give an example, see a useful connection and identify a plausible next learning step. Defer further verticals, full institution directories, admissions/credential equivalence engines and automated career recommendations.

Independent ontology review confirmed that the existing knowledge kinds and part_of relationships can support the subject hierarchy. No new course/provider availability was researched in this proposal pass.
