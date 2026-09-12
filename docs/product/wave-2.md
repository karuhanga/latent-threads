# Wave 2 — Five new verticals

## Authorized outcome
Lincoln accepted adding coffee alongside four other verticals with a mix of professional, technical, trade, agricultural, service and creative work. Deliver coffee, housing, clothing, diagnostic testing and mobile apps alongside the existing music journey. The active “let’s go” goal means implement, test and deploy this agreed expansion, showing usable checkpoints. It is not complete after coffee alone.

## Checkpoints
1. Coffee + housing and lightweight Uganda organization examples.
2. Clothing + diagnostic testing.
3. Mobile apps, meaningful connections across the catalog, final review and publication.

Each checkpoint must be usable and shown before the next content pair is accepted. Keep the full end state intact throughout.

## Content acceptance
Each new vertical has one concrete artifact/output entry, one endeavor, approximately 4–6 stages with real contextual activities, at least four distinct roles spanning kinds of work, and useful capability/concept/tool branches. These are minimum useful route targets, not permission to invent facts. At least one accessible introductory learning resource per new vertical connects to an actual concept/skill. Diagnostic testing is educational process exploration, not clinical advice or instructions for performing tests. Prefer primary sources; read the source and keep claim-level evidence plus a compact research review per pack.

Reuse entities only when meanings match. At least two researched concepts/skills should connect genuinely distinct verticals, with visible paths proving reuse. Do not manufacture universal role collaboration or an organization-to-organization supply chain. Keep current uncluttered UI, global discovery and independent entities.

## Organizations and place
Keep organizations as small example cards linked to activities and countries. Approximately three researched coffee examples in Uganda establish the local edge. Other verticals may add examples where meaningful, without requiring country coverage everywhere. No full organization profiles, directory, country-wide relevance score or broad country selector. Missing examples imply no statement about local absence.

## Minimal data contract extension — v0.2
The aggregate catalog uses schemaVersion 0.2; old standalone v0.1 packs remain readable. Existing node and relation types remain unchanged. Add an optional organizationExamples array (defaults empty), each row:
`{id, name, summary, url, contributionId, placeId, placeContext, editorialStatus}`.
Use namespaced `example:` IDs. Each example references one actual contribution and one Place; `placeContext` states the precise country connection, e.g. an organization roasting in Uganda, rather than inferring from headquarters. External reviewed evidence must cover each published example's identity/activity/place claim. URLs must be ordinary public http(s), without credentials or executable schemes. Cards use the existing source-detail setting. Show relevant examples on their activity and parent stage/endeavor, with activity links; no new independent hierarchy.

## Pack contract
Keep each domain in data/<pack>/ with the existing manifest and array files. Optional organizationExamples.json is named in its manifest. Shared nodes are defined once in data/shared; packs can reference existing IDs without copying records. Explicit data/catalog.json lists enabled packs, so unreviewed content cannot publish accidentally. Default loadCatalog() merges enabled packs; explicit directory still loads a single pack. Reject duplicate IDs, unsafe pack paths and incompatible schemas. Validate the merged graph; standalone cross-pack references are expected to need the merged context.

PM owns data/catalog.json, data/shared, docs and release integration. Builders must not enable unfinished packs themselves. A new pack can use schemaVersion 0.2, empty places/assessments/mappings, and reference the places already defined in song. Shared reserved concept: knowledge:measurement (PM owns); use it only with source support for the specific activity. Additional shared entities require coordination.

## Completion evidence
Relevant automated checks, content review, desktop/mobile/keyboard previews, preference/motion regressions, all six endeavors discoverable, source-backed cross-domain paths, readable local examples and learning exits. Publish reviewed source through the existing Pages route; verify exact release metadata and refreshed hosted links. Record source/deployment hashes and Notion acceptance. No paid service, backend or future Rabbit Hole work.
