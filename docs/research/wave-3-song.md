# Wave 3 music depth review

Reviewed 12 September 2026 for [LT-030](../tickets/LT-030.md) against [Wave 3](../product/wave-3.md). Owned changes are in `data/song/` and this note. The pack now uses schema 0.3: 37 nodes, eight activities and 33 explicit relations. Existing IDs, short summaries and contextual activity assignments are preserved.

## Editorial method

Every node and activity has an explanation and a concrete example. Every activity also states its input, output and decision. Sources below were opened and their relevant content read; new `evidence:wave3-*` records state the claims supporting expanded copy. Passing validation is a structural check, not independent fact-checking.

Examples are original hypothetical teaching situations, displayed under the interface's Example label. They describe no actual singer, recording, session or course participant. Each has reviewed direct internal editorial evidence, with a rationale connecting it to the sourced subject. Natural scenario wording replaces repetitive credibility disclaimers. No source's actual case study, song lyrics, audio, diagrams or images are copied.

Activity input/output/decision statements are a scoped synthesis of the cited work, not a mandatory production procedure. The six stage groups remain editorial navigation. Responsibility overlap, returning to earlier choices and arrangement priorities describe the scope of our example route, not universal collaboration edges. Optional practice and preparation explicitly called “suggested” are editorial choices; they create no provider prerequisite relation.

## Expanded-content source map

The evidence file maps every individual record. This table identifies the reviewed passages and the content they support; role, skill and activity remain distinct records even when their underlying source overlaps.

| Primary source and reviewed passage | Music records and supported detail |
| --- | --- |
| [Berklee: Performing songwriter](https://www.berklee.edu/careers/roles/performing-songwriter), role description and skills | Songwriting stage, role, skill and activity; melodic/lyrical development and demos. Independent artist responsibility; endeavor's writing material. |
| [Berklee: Arranger](https://www.berklee.edu/careers/roles/arranger), role description | Arranger, arranging and arrangement activity; instrumentation/harmony/tempo choices; shaping stage and endeavor. |
| [Berklee: Music producer](https://www.berklee.edu/careers/roles/music-producer), role description | Producer and production activity; session planning and creative direction in the shaping stage. Scope varies by project. |
| [Berklee: Session musician](https://www.berklee.edu/careers/roles/session-instrumentalist), preparation and work | Session musician, performance activity and recording stage; supplied parts and responsive performance. |
| [Berklee: Recording engineer](https://www.berklee.edu/careers/roles/recording-engineer), setup responsibilities | Recording role, stage and activity; capture-system preparation. |
| [Berklee: Mixing engineer](https://www.berklee.edu/careers/roles/mixing-engineer), role description | Mixing role, stage and activity; recorded parts to a combined musical result. |
| [Berklee: Mastering engineer](https://www.berklee.edu/careers/roles/mastering-engineer), role description | Mastering role and skill; complete-mix perspective and balance. |
| [iZotope: Mixing and mastering](https://www.izotope.com/community/blog/what-is-the-difference-between-mixing-and-mastering), definitions and workflow | Endeavor, mastering stage/activity; mix versus overall master. Product recommendations and universal loudness claims are not imported. |
| [iZotope: EQ or compression](https://www.izotope.com/community/blog/eq-before-or-after-compression), processing relationship | Signal processing and mixing engineer; competing frequency ranges, level variation and processing order. |
| [Ableton: Live concepts](https://www.ableton.com/en/manual/live-concepts/), clips, tracks, audio/MIDI and mixer | Recording artifact, DAW and mixing skill; file references, timeline arrangement and distinct musical material. |
| [Ableton: Mixer](https://www.ableton.com/en/manual/mixing/), section 18.1 | Expanded Mixing stage/activity; level, stereo placement, muting and soloing. The guitar/vocal scenarios are our application of these controls. |
| [Shure: Microphone transducers](https://www.shure.com/en-ASIA/insights/mic-basics-transducers), transducer designs | Microphone explanation; sound-to-signal conversion and condenser power. |
| [OpenLearn: Practical recording](https://www.open.edu/openlearn/history-the-arts/recording-music-and-sound/content-section-4), section 4 | Recording skill and course setup; planning, power/storage and optional recording equipment. |
| [OpenLearn: Recording log](https://www.open.edu/openlearn/history-the-arts/recording-music-and-sound/content-section-5), section 5 | Recording skill/stage/activity and course practice; retaining session context. |
| [OpenLearn: Microphone placement](https://www.open.edu/openlearn/history-the-arts/recording-music-and-sound/content-section-6), section 6 | Expanded recording stage/activity; performer/space balance and comparisons between positions. |
| [Spotify: Get started](https://artists.spotify.com/get-started), upload preparation | Distribution stage/activity and route-specific artist/endeavor detail; distributor, audio, artwork and identifying information. This remains a Spotify example, not the sole route to listeners. |
| [Spotify: Metadata](https://support.spotify.com/us/artists/article/metadata-formatting-guidelines/), names, roles and corrections | Release metadata; delivery controls presentation and updates. |
| [Ableton: Beat and tempo](https://learningmusic.ableton.com/make-beats/beat-and-tempo.html) and [Chords](https://learningmusic.ableton.com/chords/chords.html), lesson bodies | Rhythm/tempo and chord explanations plus suggested browser comparisons. |
| [Open University: Understanding music](https://www.open.ac.uk/courses/qualifications/details/a234/), module description | Music field and theory-to-music classification. No enrollment or qualification card is created from this source. |
| [OpenLearn: Music theory](https://www.open.edu/openlearn/history-the-arts/music/an-introduction-music-theory), description and contents | Theory subject, harmony detail and rhythm/harmony hierarchy; source's notation scope is visible. |
| [OpenLearn: Music and technology](https://www.open.edu/openlearn/science-maths-technology/engineering-technology/sound-music-technology-an-introduction/content-section-1.1) and [Describing sound](https://www.open.edu/openlearn/science-maths-technology/engineering-technology/sound-music-technology-an-introduction/content-section-1.3) | Music technology subject and Sound basics module. |
| [OpenLearn: Sine waves](https://www.open.edu/openlearn/science-maths-technology/engineering-technology/sound-music-technology-an-introduction/content-section-2.1) and [Pressure waves and cycles](https://www.open.edu/openlearn/science-maths-technology/engineering-technology/sound-music-technology-an-introduction/content-section-2.3) | Sound waves and Sinusoidal pressure waves module; local particle motion versus travelling pattern, and the model's limit. |
| [Berklee: Top-line songwriter](https://www.berklee.edu/careers/roles/top-line-songwritervocal-producer), role definition | New role and `specializes` edge to Songwriter: vocal writing for existing instrumental production. |

The knowledge `part_of` edges are marked as reviewed inferences from named curricular coverage. They are useful, nonexclusive subject classifications. The top-line relationship is an occupational specialization supported directly by the role definition; it does not turn a subject into a job.

## Learning and curriculum review

The three existing independent offerings remain: [Ableton Learning Music](https://learningmusic.ableton.com/), [Sound for music technology](https://www.open.edu/openlearn/science-maths-technology/engineering-technology/sound-music-technology-an-introduction) and [Recording music and sound](https://www.open.edu/openlearn/history-the-arts/recording-music-and-sound/content-section-0). All now have structured kind, visible preparation and outcomes. The sound course is introductory with a provider estimate of 20 hours; recording is intermediate with an eight-hour estimate. Reading is free; accounts enable tracked completion and all activities. Course completion statements are represented as the provider describes them, with no professional qualification inferred.

The sound course's published sections **1 Sound basics** and **2 Sinusoidal pressure waves** are modeled as `module` resources with `format: course section`. Direct reviewed `curriculum_part_of` edges point from each section to the course. Sound basics explicitly teaches Music technology; Sinusoidal pressure waves explicitly teaches Sound waves. These links are supported by the section content independently of containment. No module duration, standalone award or provider prerequisite is invented.

Sound study uses listening and graphs. Recording equipment is optional for understanding the recording course. Ableton's browser lessons require JavaScript/audio playback but no prior experience or additional music equipment. Course metadata was read; the complete courses and their interactive exercises were not performed during this review.

Existing license distinctions remain. OpenLearn's [FAQ](https://www.open.edu/openlearn/about-openlearn/frequently-asked-questions-on-openlearn) and the sound course's [acknowledgements](https://www.open.edu/openlearn/science-maths-technology/engineering-technology/sound-music-technology-an-introduction/content-section---acknowledgements) preserve exceptions for third-party materials. New section cards retain that scope. Only links and original paraphrases are published.

## Checks and handoff

Builder checks: standalone song release validation passed; the focused audit confirmed all 45 pages have depth, newly reviewed external detail evidence and direct editorial example evidence. Every activity has input/output/decision fields, all pages are reachable from the endeavor, all five resources have structured setup/outcomes, and both modules explicitly teach a connected subject. Internal editorial source paths and local research links resolve. No prerequisite edge was authored.

The builder's `pnpm check` passed validation and TypeScript and exposed two stale test expectations, which PM corrected outside this ticket's file ownership. After copy refinement, the builder's `pnpm build` passed aggregate validation and the production build. PM subsequently reported the full integrated `pnpm check` passing all 86 tests, including music/housing depth and the two-module prototype gates. Vite's single-bundle size warning remains; the integrated bundle was approximately 140 kB gzip. No code, test, global-manifest or remote changes were made by this builder.

PM sampled the refined copy and independently reviewed the top-line role and OpenLearn course/section sources. Content is accepted pending the shared reader's final visual checkpoint. Complete course participation, exercise execution and professional qualification assessment remain outside this content review.
