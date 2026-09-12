# Latent Threads ontology v0.1

**Status: PM-reviewed implementation baseline for LT-005, 12 September 2026.**
This is the v0.1 design contract; executable validation and source-backed content remain separate tickets. It is neither a verified content dataset nor a permanent taxonomy.

## Product boundary

The model answers **“How does X get done?”** through the contributions people make, then gives the explorer a route into knowledge, capabilities, tools and learning. It supports a small bundled JavaScript application. Lincoln confirmed **Produce and release a song** first and Ugandan coffee second on 12 September 2026. The six endeavors below pressure-test the model; they are not six simultaneous content commitments.

The authoritative direction comes from the [research brief](../ideation/latent-threads-export/02-product-research-brief.md), [project snapshot](../ideation/latent-threads-export/04-project-snapshot.json) and original user decisions in transcript turns [2–4](../ideation/latent-threads-export/01-conversation-transcript.md). In particular: endeavors are central; roles extend beyond professions; collaboration follows from contributions in context; geographic gaps should be visible; and learning resources belong beside concepts. The current project request favors a self-contained JavaScript app and progressive delivery, superseding the earlier assistant proposal to begin with Postgres.

## Canonical records

Use stable, namespaced IDs unrelated to display labels. The public graph is a set of `Node` records plus typed relations. Contributions, sources and evidence are separate normalized records that the UI can project into cards and graph links.

| Record | Meaning and boundary | Required fields beyond `id` |
|---|---|---|
| `Node` (base) | One reusable concept. IDs remain stable when wording changes. | `type`, `label`, `summary`, `editorialStatus` |
| `endeavor` node | Coordinated activity with an intended outcome, e.g. produce and release a song. A reusable explanation of a process, not a specific commissioned project. | Base fields |
| `stage` node | A named part of exactly one endeavor. Stage names need not form a strictly linear sequence. | Base fields, `endeavorId`, `displayOrder` |
| `artifact` node | A thing made or transformed, physical or digital; a song recording, building or app. | Base fields |
| `service` node | A delivered service, such as emergency medical care. Keeps services representable without pretending they are physical products. | Base fields |
| `role` node | A part someone plays in doing work: songwriter, farmer, mixing engineer, community volunteer. One person may occupy several roles. | Base fields |
| `capability` node | An ability to perform work, e.g. audio mixing. Skill is an optional subtype for a narrower proficiency. | Base fields; optional `kind: "capability" \| "skill"` |
| `knowledge` node | Something one understands: signal processing, acoustics, physics. Fields, subjects and topics are optional granularity labels, not separate entity types. | Base fields; optional `kind: "field" \| "subject" \| "topic" \| "concept"` |
| `tool` node | An instrument, material system or technology used in work; e.g. a digital audio workstation. | Base fields |
| `learning_resource` node | A specific external course, book, lecture or similar resource; a resource can teach multiple concepts. | Base fields, `url`, `provider`, `format`, access and license fields below |
| `Contribution` | An explanatory unit saying which role does what in one stage of one endeavor. This is where contextual collaboration begins. | `id`, `endeavorId`, `stageId`, `roleId`, `action`, `editorialStatus` |
| `Relation` | One typed, directed assertion with stable identity. Endpoint types are restricted below. | `id`, `type`, `fromId`, `toId`, `editorialStatus` |
| `Source` | A retrievable publication, official page or explicitly labeled internal editorial source. Not a claim by itself. | `id`, `title`, `kind`, `locator`, `retrievedAt`, `reuseStatus` |
| `Evidence` | A source-backed statement about one record, including what exactly the source supports and its limits. | `id`, `subjectId`, `sourceId`, `claim`, `support`, `reviewStatus` |
| `Place` | A geographic scope; not a labor-market rating. | `id`, `label`, `kind`, `parentIds` |
| `PresenceAssessment` | A dated judgment about one node or relation in one place, supported by evidence where available. | `id`, `subjectId`, `placeId`, `state`, `reviewedAt`, `scopeNote` |

`editorialStatus` is `draft`, `illustrative` or `published`. Only `published` content enters the default public dataset. An explicitly labeled preview can show illustrative fixtures. These labels describe editorial readiness; they do not replace evidence.

Keep aliases on a node as an optional string array for search. Do not create duplicate nodes merely to support alternate names. Initial records describe general concepts, not named individuals, actual patients, personal career histories or individual projects.

### Distinctions that must survive the UI

- **Artifact versus endeavor:** “A song recording” and “Produce and release a song” are different nodes. The artifact can lead into the endeavor that produces it. An endeavor may have several outputs, and an output may be associated with several endeavors.
- **Role versus occupation:** a role is useful in an endeavor even when it is unpaid, informal, performed by a founder, or part of another person's job. An occupation is an external labor-taxonomy category. For v0.1, keep optional role-to-taxonomy mappings, with scheme, code, source version, mapping relation (`exact`, `close`, `broader`, `narrower`) and evidence. Do not create canonical occupation nodes or assume one role equals one occupation. Neither mapping direction nor equivalence is inferred from matching names.
- **Activity versus capability versus knowledge:** “adjust the balance of recorded tracks” is a contribution's `action`; “audio mixing” is a capability; “signal processing” is knowledge. Activities can be promoted to reusable nodes later if repetition justifies it. Capabilities should not replace the people/role layer.
- **Learning versus qualifications:** a linked course can teach a capability without granting a degree, certification, employment eligibility or permission to practice. Degrees, credentials and pathways are later entities with their own verification needs.

### Contribution context and cardinality

Every contribution references **exactly one endeavor, one stage and one role**. Its stage must belong to the referenced endeavor. Each stage belongs to exactly one endeavor; roles can recur across any number of contributions and endeavors. An endeavor has one or more stages; a published stage has one or more contributions. A contribution can have zero or more linked capabilities, knowledge concepts, tools and outputs.

Split a jointly performed action into one contribution per role, and connect those contribution records only when a source supports an actual coordination or handoff claim. Do not duplicate the role node. If an action spans the whole endeavor, create an explicit cross-cutting stage, such as “Coordination throughout,” instead of leaving context null. The first version forbids nested endeavors and reusable stages; both can be added later without changing role identity.

There is no universal `works_with` assertion. Contributions in the same stage support the modest derived label **“Contributes in this stage.”** That grouping does not establish that the contributors directly interact. Explicit `coordinates_with` and `hands_off_to` relations connect contribution records and are labeled within their endeavor. Same role in two different endeavors does not connect the teams.

## Typed relations

IDs in structural fields (`stage.endeavorId`, `contribution.roleId`, etc.) are authoritative references. Generate their graph links at runtime; do not also store duplicate structural relation rows.

| Type | Allowed source → target | Meaning |
|---|---|---|
| `produces` | endeavor or contribution → artifact or service | An output; use UI wording “delivers” for a service. |
| `depends_on` | stage → stage, or contribution → contribution | A documented prerequisite inside the same endeavor. The source depends on the target. Display order alone does not imply this assertion. |
| `uses` | contribution → tool | Tool use in this contribution, not a universal requirement of the role. |
| `requires_capability` | contribution → capability | Ability needed for the described action in this context. Avoid interpreting this as a hiring requirement. |
| `draws_on` | contribution or capability → knowledge | Conceptual grounding. It is not a measured importance score. |
| `teaches` | learning_resource → knowledge or capability | The linked resource addresses this concept or ability. |
| `hands_off_to` | contribution → contribution | A documented transfer of work or output, inside one endeavor. Describe what moves in optional `summary`. |
| `coordinates_with` | contribution ↔ contribution | A symmetric coordination assertion inside one endeavor; store one row in canonical ID order. |
| `specializes` | role → role | Narrower role to broader role; no automatic occupation mapping. |
| `part_of` | knowledge → knowledge | Narrower topic/concept belongs to a wider area. A concept can have multiple parents. |

All types except `coordinates_with` are directed. Each record may have an optional human-readable `summary`, evidence and temporal context. Traversal may show both incoming and outgoing edges, using explicit reverse wording: an incoming `teaches` relation becomes “Learn this with.”

For v0.1, do not add arbitrary `related_to` edges to rescue an unclear relationship. Add a precise relation in a reviewed schema revision if a real content case needs one. No arbitrary numeric weight, salary, demand score, predicted fit or probability is implied by this contract.

## Evidence, provenance and editorial truth

Evidence attaches to a record by `subjectId` and states the supported claim in plain language. One record may have multiple evidence rows and one source can support many records. For a contribution, the evidence must support the role/action/context combination. For a relation, it must support that particular relationship. A source URL without a claim is insufficient.

`Source.kind` is `external` or `internal_editorial`. `locator` is an external URL or a repository path. External source metadata can also include publisher, author, publication date, dataset release/version and a pinpoint reference. `reuseStatus` is `link_only`, `licensed`, `public_domain` or `unreviewed`; retain specific license details when known. Source provenance is separate from the learning resource's access and license labels. Prefer our own concise summaries and links; importing or redistributing source material requires a verified basis.

`Evidence.support` is `direct`, `inference` or `illustrative`; `reviewStatus` is `pending`, `reviewed` or `contested`. Reviewed evidence also records `reviewedAt` and a reviewer identifier. Inferences must name the reasoning and its limitations in `notes`; `contested` claims retain the disagreement instead of silently choosing a side. Do not convert editorial confidence into a probability.

Publishing a node's factual summary, contribution, typed relation, resource access/license label or positive presence assessment requires reviewed, non-illustrative evidence covering the relevant claim. Editorial groupings such as stage names/display order can use an internal editorial rationale, explicitly presented as “one way to break this down.” Internal rationale cannot verify external facts such as local availability or course licensing. Name/ID plumbing and generated structural links do not require duplicate evidence.

The release validator checks evidence coverage and metadata; a human/agent content review must judge whether the source actually supports the statement. Validation passing is not fact-checking. Record `reviewAfter` when a source contains a deadline, dated offer or changing institutional detail. Undated process descriptions still carry retrieval and review dates. A later refresh policy can refine cadence; the first slice must not show known expired access claims as current.

### Learning resource access

Use independent fields:

```text
access: free | audit_free | paid | mixed | unknown
licenseStatus: open | restricted | unknown
licenseUrl?: URL
accessReviewedAt?: YYYY-MM-DD
```

“Openly licensed” requires a verified license; “Free access” requires current access evidence and says nothing about reuse. Use `mixed` when parts differ and explain the distinction. A public URL alone establishes neither free course access nor open licensing. Level and duration are optional sourced metadata. Credentials and certificate fees are not inferred from course access.

The Wave 1 implementation names optional level metadata `learnerLevel` and uses `notes` for access/license exceptions. Sources may use `publisher`, `pinpoint` and `notes`. The source manifest has `schemaVersion` and a `files` map naming bare-array JSON files. `pnpm validate:data` checks these records and generates an ignored application bundle. Author data under `data/song/`, never `src/generated/`.

## Geography and unknowns

Start with this explicit place structure:

```text
World
└── Africa
    ├── Kenya
    └── Uganda
```

Store `parentIds` as an array to allow non-tree geographic scopes later, but the first four scopes have one parent each except World. Kenya and Uganda are siblings. A relation's geographic assessment is independent from its endpoint nodes: a role and a learning resource can each be present locally without the resource constituting a verified local pathway for that role.

`PresenceAssessment.state` is `established`, `limited`, `unknown` or `conflicting`. Use these display labels:

| State | Display meaning |
|---|---|
| `established` | Verified presence within the stated scope; it does not imply widespread availability, high demand, easy access or salary. |
| `limited` | Evidence supports limited or emerging presence; retain the source's definition in `scopeNote`. |
| `unknown` | We have not verified presence here. This includes unresearched and insufficiently evidenced cases, distinguished in `scopeNote`. |
| `conflicting` | Evidence disagrees or cannot be reconciled; explain the disagreement. |

No row means **unknown**, never absent. There is deliberately no `absent` enum in v0.1. A missing course, employer or search result cannot establish that a capability or ecosystem does not exist.

Do not copy national assessments to siblings or down from Africa/World. A positive Uganda assessment may support “verified somewhere in Africa,” but that is a derived coverage indicator with its origin shown; it does not automatically justify `established` across Africa. Keep continent/nation presence claims explicit. World is the discovery overview, not a claim that each node exists everywhere.

A selected lens changes emphasis while keeping unknown nodes discoverable. De-emphasized styling must have text such as “Local presence unverified”; visual greying cannot silently mean nonexistence. Global cards must not become “Africa salaries,” and presence is not a proxy for job demand. Regional hubs, country-level market data and verified local pathways are later content, not inferred from a place ID.

## Optional temporal precision

Keep editorial timestamps separate from when a claim was true. Nodes, contributions, relations and presence assessments may carry an optional `validTime`:

```json
{
  "start": { "value": "2020", "precision": "year", "qualifier": "approximate" },
  "end": null
}
```

Each bound uses `year`, `month` or `day` precision, with a matching ISO-shaped value; `qualifier` is `exact` or `approximate`. An omitted/null bound means unknown or unspecified, not “always” or “continues today.” Absence of `validTime` means chronology is unmodeled. `end` is inclusive at its stated precision; compare ranges only when precision allows a valid conclusion. Keep older periods and contested emergence dates in sourced prose until the schema deliberately supports them. A display order is never a historical date. No history slider or historical succession relation is required in the first implementation.

## Illustrative song fixture shape

This compact fixture demonstrates identity, contribution context, incoming/outgoing links and learning metadata. **Every row is illustrative; no particular course, local ecosystem, occupation equivalence or production sequence is being asserted as verified.** The placeholder URL must never enter published data. This is a shape example, not the complete song dataset or a canonical production workflow.

```json
{
  "schemaVersion": "0.1",
  "nodes": [
    { "id": "endeavor:song-release", "type": "endeavor", "label": "Produce and release a song", "summary": "Illustrative endeavor.", "editorialStatus": "illustrative" },
    { "id": "stage:song-mixing", "type": "stage", "label": "Mix the recording", "summary": "Illustrative stage.", "endeavorId": "endeavor:song-release", "displayOrder": 1, "editorialStatus": "illustrative" },
    { "id": "artifact:song-recording", "type": "artifact", "label": "Song recording", "summary": "Illustrative output.", "editorialStatus": "illustrative" },
    { "id": "role:mixing-engineer", "type": "role", "label": "Mixing engineer", "summary": "Illustrative role.", "editorialStatus": "illustrative" },
    { "id": "capability:audio-mixing", "type": "capability", "label": "Audio mixing", "summary": "Illustrative ability.", "editorialStatus": "illustrative" },
    { "id": "knowledge:signal-processing", "type": "knowledge", "label": "Signal processing", "summary": "Illustrative knowledge topic.", "editorialStatus": "illustrative" },
    { "id": "tool:daw", "type": "tool", "label": "Digital audio workstation", "summary": "Illustrative tool category.", "editorialStatus": "illustrative" },
    { "id": "resource:placeholder", "type": "learning_resource", "label": "Placeholder learning resource", "summary": "Replace with a verified resource before publication.", "url": "https://example.com/placeholder", "provider": "Illustrative provider", "format": "course", "access": "unknown", "licenseStatus": "unknown", "editorialStatus": "illustrative" }
  ],
  "contributions": [
    { "id": "contribution:song-mix", "endeavorId": "endeavor:song-release", "stageId": "stage:song-mixing", "roleId": "role:mixing-engineer", "action": "Adjust the balance of recorded tracks.", "editorialStatus": "illustrative" }
  ],
  "relations": [
    { "id": "relation:song-output", "type": "produces", "fromId": "endeavor:song-release", "toId": "artifact:song-recording", "editorialStatus": "illustrative" },
    { "id": "relation:mix-capability", "type": "requires_capability", "fromId": "contribution:song-mix", "toId": "capability:audio-mixing", "editorialStatus": "illustrative" },
    { "id": "relation:mix-knowledge", "type": "draws_on", "fromId": "contribution:song-mix", "toId": "knowledge:signal-processing", "editorialStatus": "illustrative" },
    { "id": "relation:mix-tool", "type": "uses", "fromId": "contribution:song-mix", "toId": "tool:daw", "editorialStatus": "illustrative" },
    { "id": "relation:resource-teaches", "type": "teaches", "fromId": "resource:placeholder", "toId": "knowledge:signal-processing", "editorialStatus": "illustrative" }
  ],
  "places": [
    { "id": "place:world", "label": "World", "kind": "world", "parentIds": [] },
    { "id": "place:africa", "label": "Africa", "kind": "continent", "parentIds": ["place:world"] },
    { "id": "place:kenya", "label": "Kenya", "kind": "country", "parentIds": ["place:africa"] },
    { "id": "place:uganda", "label": "Uganda", "kind": "country", "parentIds": ["place:africa"] }
  ],
  "sources": [
    { "id": "source:fixture-design", "title": "Ontology shape example", "kind": "internal_editorial", "locator": "docs/product/ontology-v0.1.md", "retrievedAt": "2026-09-12", "reuseStatus": "unreviewed" }
  ],
  "evidence": [
    { "id": "evidence:fixture-mix", "subjectId": "contribution:song-mix", "sourceId": "source:fixture-design", "claim": "Illustrates the contribution record shape only.", "support": "illustrative", "reviewStatus": "pending" }
  ],
  "presenceAssessments": [],
  "taxonomyMappings": []
}
```

This example intentionally lacks publication-ready evidence. It should pass a draft structure validator and fail a public-release validator. Empty presence assessments must produce “Local presence unverified” for Kenya/Uganda, without fabricated geography or default positive labels.

## Stress test across the six seed endeavors

These are hypothetical modeling cases to test the ontology, not researched assertions about standard procedures or availability.

| Endeavor | Concrete edge case | Expected representation / boundary |
|---|---|---|
| Produce and release a song | One independent artist writes, performs and handles distribution; another production uses several specialists. | Distinct roles and contributions; neither separate people nor a universal team size are implied. A recording is an artifact and the release process is an endeavor. First slice need not identify performers. |
| Build a skyscraper | An approval may block a building stage, while several design activities overlap. | Approval is a contribution with a responsible role and action; an evidenced stage or contribution dependency expresses the prerequisite. Display order remains a reading aid. Agencies and legal requirements need later organization/credential records and jurisdiction evidence. |
| Deliver emergency medical care | Teams reassess a patient repeatedly, and the outcome is a service rather than a manufactured object. | A service output, stages as a conceptual grouping, multiple role contributions and contextual coordination. Do not force a linear protocol or treat the graph as medical instructions. Patient records and clinical decision rules are out of scope. |
| Get Ugandan coffee from farm to a European café | Farming, export logistics and retail take place in different countries; one person's farmer and business-owner roles overlap. | Reuse role IDs, give contributions their own stages, and assess presence at the supported scope. Expand `Place` with the actual destination only when sourced; “Europe” does not identify a country. Traceability of a particular shipment and detailed trade rules are later features. |
| Launch and operate a satellite | A capability may exist globally while a particular country's facilities or local study options are unverified. | Unknown presence stays visible and explainable; no downward inheritance from World. Launch and ongoing operation can be separate stages. Organization/facility nodes are a later extension; do not force them into tools to bypass that cutline. |
| Build and operate a mobile app | The app artifact changes over time; design, implementation and operation recur, and a founder plays several roles. | One conceptual artifact, stages that can be revisited, separate contextual contributions and optional dated claims. `depends_on` models prerequisites, not an execution engine. Release histories, incident workflows and actual team rosters are deferred. |

The model passes these **conceptual** tests without making a service an artifact, a capability a person, or a geography gap a negative fact. Concrete source-backed content may reveal new needs; those should trigger a versioned change, not an untyped edge.

## Validation requirements

Build-time validation must cover:

1. **Identity and references:** globally unique IDs across record arrays; permitted node/record types; all references resolve; nonempty display labels/actions; correctly shaped metadata. Renaming a label does not break a trail.
2. **Contribution context:** required role/stage/endeavor references have correct types; stage belongs to endeavor; published endeavors have stages and published stages have contributions. No contribution has multiple role IDs or null stage context.
3. **Relation semantics:** enforce every endpoint pair above; no self-links; no duplicate same-type/same-endpoint assertions without a deliberate distinct context; canonical ordering for symmetric links; collaboration/dependency endpoints share one endeavor. `specializes`, `part_of` and stage/contribution prerequisite graphs are acyclic; ordinary graph traversal must still be cycle-safe because other relations and reverse exploration can produce loops.
4. **Geography:** place parents resolve and are acyclic; World has no parent; Kenya/Uganda are sibling country scopes; assessment state and subject type are valid; at most one current assessment per subject/place. Missing rows remain unknown. Positive assessments require reviewed non-illustrative supporting evidence.
5. **Provenance:** evidence subjects and sources resolve; reviewed entries have reviewer/date; public factual claims have sufficient non-illustrative reviewed coverage; preserve inference/contested labels. URLs are valid HTTP(S) addresses where external links are expected; public data excludes placeholders. Link health is a separate content check.
6. **Temporal data:** timestamp/date formats match precision; validity bounds are coherent where comparable; unknown bounds never imply modern presence. Preserve editorial timestamps separately.
7. **Release boundary:** public bundles contain published records only, all their references resolve within the bundle, and none of their required supporting evidence is illustrative. Resource badges match evidence and known expiry/review restrictions. Taxonomy mappings specify source/version and explicit mapping direction.
8. **Traversal contract:** structural projections and relation traversal expose the same IDs; expanding an artifact finds its producing endeavor; expanding a role finds contributions with stage/endeavor labels; moving contribution → knowledge → resource has correctly worded links. A place selection changes emphasis, not underlying identity or evidence.

Meaningful negative cases for implementation: reject a contribution whose stage belongs to another endeavor; reject a role→role `uses`; reject Kenya as Uganda's parent in the initial four-place fixture; reject a placeholder resource in a public bundle; reject a published `limited` assessment without evidence; retain an unknown node when a country is selected. The fixture above is expressly not evidence-complete.

## Storage and first implementation cutline

Keep curated source data as small normalized JSON files in Git: nodes, contributions, relations, sources, evidence, places and presence assessments, with a manifest containing `schemaVersion`. Empty optional arrays are allowed. Generate a validated, compact read-only bundle for the app at build time. Do not author into generated bundles.

The first runtime can load the bundle once and build maps by ID, outgoing/incoming relation indexes and contribution indexes by role/stage/endeavor. Expose an adapter with `getNode`, `searchNodes`, `getNeighborhood`, `getContributions`, `getEvidence` and `getPresence`. Make scope/cursor limits explicit in `getNeighborhood` so the canvas never renders the whole dataset by accident. Browser persistence is only for UI state/trails; curated facts remain in Git.

This supports a static-site deployment without a backend, accounts or database service. Introduce a SQLite build artifact/browser adapter only if measured bundle size, loading or queries justify it; do not bring SQLite/WASM, Postgres or a graph server into the first slice by default. Schema and stable IDs stay independent of the renderer and storage engine.

**First implementation:** executable schema/validator, one small reviewed song dataset, context-preserving traversal, source details, basic concept→learning links, schema/query support for the four geographic scopes with honest unknown fallback, and a visible trail. The user-facing geography lens is Wave 2, after sourced local content. The UI can use typography, whitespace, restrained color and motion inspired by Windows Phone; graph type and evidence state must also have text so color is not the only signal.

**Deferred:** five more complete endeavor datasets, real people and team rosters, organizations/facilities, degrees/certifications/pathways, occupation imports, salaries/demand, automated recommendation scores, historical topology, nested endeavors, resource scraping, user-edited facts and multiuser sync. The first data pack should not add pseudo-nodes solely to suggest those features already exist.

## Consequential decisions to revisit with the PM

- Song first and coffee second are user-confirmed sequencing decisions. The model keeps content order independent of its structure.
- A curriculum-like exploration must remain evidence-grounded and accessible to teenagers, while avoiding implying that linked courses alone constitute an employment or licensing pathway.
- A country lens will initially show many **unverified** labels. Filling local evidence is a research task, and the release story should accurately describe its coverage.
- The initial broad role model intentionally delays imported occupation taxonomy and credential logic. Revisit those boundaries when a verified content case requires them, not as a prerequisite to the first playable graph.

PM review found the contract sufficient for the first implementation: all six conceptual stress tests are covered, contribution context is explicit, and the fixture is clearly separated from publishable evidence. LT-005 implements the executable schema; LT-006 curates source-backed content. No additional user decision is required for those bounded tasks.

## Display refinement — LT-020

Contributions may carry an optional nonempty `label` for their conventional activity name (Production, Recording, Mixing). The full `action` still states the specific contribution and its evidence; roleId continues to identify the person’s role. Labels are editorial names, not new factual relationship claims. The UI calls contributions Activities and knowledge Concepts. Shared concepts, skills, tools and roles are independent nodes; process membership belongs to stages and contextual contributions.

## Wave 2 extension
[Wave 2](wave-2.md) specifies v0.2: optional contextual organization example records and aggregate pack loading. Existing node/relation semantics remain. This supersedes only the blanket organization-example deferral; full organization/facility profiles remain deferred.

## Wave 3 extension

[Wave 3](wave-3.md) is the accepted v0.3 extension for structured explanatory depth, learning-resource kinds and curriculum/prerequisite relationships. It activates existing field/subject knowledge hierarchy and retains distinct role specialization. The original v0.1 contract remains the historical baseline; current schema and source validation support legacy packs plus this explicit extension.
