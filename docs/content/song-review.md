# Song journey content review

**LT-006 · agent review: 12 September 2026 · reviewer: `agent:ontology_first_slice`.** The normalized pack passed the current LT-005 release validator and is ready for PM source review. The `published` labels indicate that these authored records have reviewed support; they do not claim that PM acceptance, application integration or deployment has happened.

## Editorial framing

The journey is **one way to break this down**: write the song, shape the sound, capture the performance, mix the tracks, prepare the master and release to listeners. These six groups are an editorial navigation aid, not a universal sequence, mandatory team or complete production checklist. Their summaries invite exploration rather than prescribe a workflow. Stages may overlap or be revisited. The output is the recording concept; this pack contains no specific song, audio recording or invented production team.

The eight roles describe parts people can play. A person can do more than one. The producer contribution highlights arrangement development, creative direction and session planning; it does not imply producers stop contributing afterwards. The session musician contribution represents a recording with instrumental performance. The release contribution uses an independent artist delivering through a distributor to Spotify as one concrete route. Other release methods remain outside this pack.

This framing is the internal editorial source `source:song-editorial`. It supports the chosen groupings, scope and output mapping only. External factual support remains in the other source/evidence records.

## Pack and integration contract

[manifest.json](../../data/song/manifest.json) has `schemaVersion: "0.1"` and a `files` map. Each mapped file is a bare JSON array:

- [nodes.json](../../data/song/nodes.json): 31 nodes — one endeavor, one artifact, six stages, eight roles, five capabilities, five knowledge topics, two tools and three learning resources.
- [contributions.json](../../data/song/contributions.json): eight role/action/stage/endeavor contexts.
- [relations.json](../../data/song/relations.json): 24 directed, labeled assertions.
- [sources.json](../../data/song/sources.json) and [evidence.json](../../data/song/evidence.json): 25 source records and 70 claim-support records, with review dates and pinpoints.
- [places.json](../../data/song/places.json): World, Africa and sibling countries Kenya/Uganda.
- [presenceAssessments.json](../../data/song/presenceAssessments.json) and [taxonomyMappings.json](../../data/song/taxonomyMappings.json): empty by design.

The entry ID is `endeavor:song-release`. Optional fields used in addition to the ontology's required fields are node `aliases` and `notes`; resource `learnerLevel`, `notes`, `accessReviewedAt` and verified `licenseUrl`; source `publisher`, `pinpoint` and `notes`; evidence `reviewedAt`, `reviewer` and `notes`. The manifest and these optional fields were coordinated with PM. `learnerLevel` is `beginner` or `intermediate` here.

## Source review and limits

Berklee role profiles support the role summaries and scoped activities. For example, the [recording engineer profile](https://www.berklee.edu/careers/roles/recording-engineer) supports microphone setup, sound capture and basic acoustics; the [mixing engineer profile](https://www.berklee.edu/careers/roles/mixing-engineer) supports combining multitrack material. Career-entry, salary, demand and local-market generalizations from those pages were excluded.

The [iZotope EQ/compression explanation](https://www.izotope.com/community/blog/eq-before-or-after-compression) supports the processing concepts. `relation:mixing-sound` is explicitly an **inference**: connecting processing choices to sound-wave basics is a learning bridge, not a claim about mandatory physics qualifications. `relation:mix-to-master` models a workflow handoff; the [mixing/mastering source](https://www.izotope.com/community/blog/what-is-the-difference-between-mixing-and-mastering) also permits one engineer doing both. No unconditional role-to-role collaboration is stored.

The release action is confined to the [Spotify route](https://artists.spotify.com/get-started), while [Spotify's metadata documentation](https://support.spotify.com/us/artists/article/metadata-formatting-guidelines/) supports how supplied release information affects display. This pack does not recommend a distributor, quote fees or infer legal entitlement to release material.

All external source records are `link_only`: summaries are original and no third-party text excerpts, images, audio or course assets are redistributed. The internal editorial source's reuse status remains `unreviewed`; the pack does not invent a repository license.

## Checked learning routes

| Resource | Checked access and level | Reuse label and limit |
|---|---|---|
| [Learning Music](https://learningmusic.ableton.com/) | Beginner; landing page and beat/chord lesson pages opened. The [provider announcement](https://www.ableton.com/en/blog/learn-music-in-your-browser/) explicitly identifies free browser access. | `unknown`: no reuse license was established. |
| [Sound for music technology: An introduction](https://www.open.edu/openlearn/science-maths-technology/engineering-technology/sound-music-technology-an-introduction) | Free, introductory; description, sound lesson and acknowledgements opened. It includes graphs and calculations. | `open` for eligible OU-owned material under the default CC BY-NC-SA 4.0; course exceptions remain. |
| [Recording music and sound](https://www.open.edu/openlearn/history-the-arts/recording-music-and-sound/content-section-0) | Free, intermediate; description, recording-roles lesson and acknowledgements opened. | `open` for eligible course content; its [acknowledgements](https://www.open.edu/openlearn/history-the-arts/recording-music-and-sound/content-section---acknowledgements) explicitly exclude third-party material. |

OpenLearn's [license explanation](https://www.open.edu/openlearn/about-openlearn/frequently-asked-questions-on-openlearn) and the course-specific notices were checked. Both course cards retain the third-party exceptions and free-account caveat in `notes`. “Open” does not mean unrestricted reuse. Links were retrieved and their textual content reviewed on 12 September 2026; audio playback, account enrollment and every interactive exercise were not audited. Recheck access when reporting a broken link or before a materially later release.

## Review paths

- Song → mixing stage → mixing contribution → audio mixing → sound waves → OpenLearn sound course. The bridge's inference note must remain available to the learner.
- Song → writing stage → songwriting contribution → songwriting capability → chords and harmony → Ableton Learning Music.
- Recording engineer → recording contribution → DAW → mixing contribution. Shared tool use reveals a cross-connection without asserting a universal collaborator relationship.

## Verification and remaining acceptance

The author checked JSON parsing, manifest loading, unique IDs, references, contribution context, endpoint types, populated stages, evidence coverage, placeholder exclusion, geography structure and the three review paths. All passed after correcting an evidence-ID collision during authoring. Every published node, contribution and relation has reviewed non-illustrative evidence; all three learning resources have level, access and license metadata. Presence, salary and historical assertions are absent.

The current LT-005 `loadCatalog()` plus `validateCatalog(catalog, { release: true, today: '2026-09-12' })` passed using the bundled Node 24 runtime. This was a read-only validation call; it did not generate application assets. Structural validation is not PM source judgment. PM must independently sample the claims above and confirm the app preserves inference notes, platform scope and license exceptions before accepting LT-006. Local evidence covers the current compact song journey only; it should not be extrapolated into a global music-industry taxonomy.

## PM acceptance — 12 September 2026

PM independently opened the recording/mixing profiles, Ableton Learning Music, both OpenLearn course descriptions and acknowledgements, the OpenLearn license FAQ, Spotify's get-started page and the iZotope mixing/mastering comparison. Sampled role actions, beginner/intermediate levels, free reading, third-party license exceptions, Spotify-specific delivery and the contextual mix/master handoff agree with the authored claims. The FAQ's Creative Commons link points to BY-NC-SA 4.0. No source media is bundled. Acceptance covers this content pack; preserving its caveats in the app is part of LT-007/LT-009 and final QA.

PM ran the release validator, typecheck and 15 tests including structural, geographic, temporal, provenance and traversal negative cases. All passed. Independent validator review found three gaps (enum coercion, mixed-precision reversed dates and overly broad editorial evidence allowance); PM fixed each with a regression test before accepting LT-005.
