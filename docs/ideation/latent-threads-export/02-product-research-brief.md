# Latent Threads — research and product brief

Exported 12 September 2026 from **Discuss Career Taxonomy App**. This is a synthesis of the discussion, not a finalized specification or a new market study. Turn references below point to the chronological transcript. Research claims describe what the conversation reported; recovered source links and their limitations are in [03-sources.md](03-sources.md).

## Current direction

**Latent Threads** is the selected working name. **See how the world gets done.** is the leading tagline proposed by the assistant; the user selected the name but did not separately finalize a tagline.

The concept is an interactive map of how people get things done. Start with an endeavor, artifact, service, role, subject, skill, tool, degree, certification or curiosity, then explore the people, contributions, knowledge, institutions, learning opportunities, geography and history behind it. The central invitation is **How does X get done?** Careers remain an important discovery route within this broader experience.

The original audience is the user's high-school sisters, plus the user themselves. The aim is to make exploration absorbing and informative: understanding possibilities, encountering unfamiliar work, seeing collaboration, finding something worth learning, and understanding what is locally accessible. The conversation did not settle monetization, deployment, budget or a launch date.

## Decision history and status

| Topic | Earlier idea | Latest direction and status |
|---|---|---|
| Product center | Career taxonomy; subjects → courses → jobs | User explicitly preferred “How does X get done?” in turn 3. |
| Scope of people | Professions | Broader roles, including trades, farming, creative work, entrepreneurship and research; distinguish roles from capabilities. |
| Geography | US / Africa / Uganda market toggle | User proposed Uganda / Kenya / Africa / World; latest proposal changes graph visibility using local-presence evidence. |
| Collaboration | Universal `works_with` edges | User endorsed contributions and what people do in context in turn 4. Collaboration emerges within endeavors and stages. |
| Starting dataset | Mathematics vertical | Latest assistant proposal: five diverse endeavors plus a sixth mobile-app example; all six appear in the next-step plan. |
| UI | Ego graph and information drawer | Immersive canvas, semantic zoom, changing topology, curiosity wall and lenses; detailed implementation remains proposed. |
| History | Optional historical evolution | User requested it; assistant proposed temporal support early and the visual time slider later. |
| Name | Career Atlas, Workings, Invisible Workings and others | User rejected “workings,” removed the “invisible” constraint, then selected Latent Threads in turn 8. |
| Execution | Discussion before project | Define ontology v0.1 first, then research/data and app implementation in parallel. No implementation was delivered in the source chat. |
| Product management | Collaborative brainstorming | User requested assistant-led PM work with input sought when needed; assistant proposed handling reversible decisions and escalating major or subjective tradeoffs. This records the prior agreement, not a new automation. |

## Adjacent products researched

| Product | What the discussion found useful | Position relative to Latent Threads |
|---|---|---|
| CareerGraph | Interactive clusters → careers → majors/certifications/pathways; the chat reported 16 clusters and 32 careers. | Closest visual reference; described as US-focused and relatively small. |
| CareerExplorer | Rich career/degree profiles, salary, demand, satisfaction and fit; chat reported 1,500+ profiles. | Assessment/recommendation and encyclopedia orientation. |
| Roadtrip Nation | Interviews, career stories and real people's pathways. | Reference for human stories, day-in-the-life and video content. |
| Student Hub / CareerSpaces | Ugandan secondary-school subjects, university choices and career planning. | Relevant local context and education-pathway comparison. |
| UDO | Africa-oriented guidance, mentorship, universities and opportunities. | Adjacent guidance offering rather than the same free-form exploration concept. |

The original assistant concluded that depth and freedom of graph navigation were differentiators. This was a preliminary product judgment, not evidence of an exhaustive competitor search. Product counts are historical claims from the discussion, not contractual dataset specifications. See the [grouped source register](03-sources.md#adjacent-products).

## Data foundations and content

The proposed approach combines existing taxonomies with curated connections in a normalized ontology:

| Source | Intended contribution |
|---|---|
| O*NET | Occupations, tasks, work activities, skills, knowledge, work context, education and related occupations. Knowledge importance and required level can support weighted relationships such as mathematics → occupation. |
| CIP–SOC crosswalk | Connect fields of education to occupations; avoid inventing all education-to-work mappings. |
| BLS Occupational Outlook Handbook | US duties, work environment, education/training, pay, outlook and similar occupations. |
| ESCO | Occupation, skill and knowledge relationships; skills–occupations matrices. Chat reported 3,039 occupations and 13,939 skills; version was not fixed. |
| UBOS | Ugandan labor-market evidence, including the 2025 Labour Market Survey and employment/income information. |
| Uganda NCHE | Licensed higher-education institutions and programs to ground local routes. |
| Curated resources | Articles, videos, practitioners, employers, professional bodies, excellent work, process descriptions and geographic evidence. |

No datasets were downloaded or merged in the conversation. Crosswalk reconciliation, geographic coverage, refresh policies, licensing and confidence rules remain implementation work. Numeric weights shown in examples, salary examples and hypothetical course counts were illustrative, not measurements. See [data sources](03-sources.md#datasets-and-geography).

## Open learning

The user explicitly requested links to available open courses. Learning should be adjacent to the concept being explored: signal processing could lead directly to course materials, books or lectures.

- **MIT OpenCourseWare:** broad university material, including advanced learning; the chat reported 2,500+ courses. “Signals and Systems” was an example, not a selected course edition.
- **OpenLearn:** free short courses; the chat reported nearly 1,000.
- **NPTEL:** free learning from Indian institutions; digital signal processing was an example. Course access and certification should be distinguished.
- **OpenStax:** openly licensed textbooks, including material relevant to high-school learners.
- **UNESCO OER definition:** grounds the distinction between access and permission to reuse/adapt.

Proposed resource badges were **Openly licensed**, **Free access**, **Audit free** and **Paid**. A resource card could show provider, title, level and time commitment. Free-to-view is not equivalent to open licensing. The source chat contains no course-level catalog, verified durations, or per-course licensing audit. See [open-learning sources](03-sources.md#open-learning).

## Geography model

Maintain one global graph with geographic evidence on nodes and potentially relationships. The latest lens order is **World · Africa · Kenya · Uganda**. World and Africa are broader scopes; Kenya and Uganda are sibling countries within Africa. The source chat's arrow notation should not be implemented as Uganda nested inside Kenya.

Selecting a place changes the graph's emphasis, not just salaries. Proposed presence states:

- Established / clearly present.
- Limited, small or emerging presence.
- No verified local presence.

Unavailable or unverified pathways remain visible as ghosted nodes. Clicking one explains the evidence gap, stronger nearby or global ecosystems and possible routes through study, mobility or specialization. Absence of verification must not be presented as proof that something does not exist.

Regional views should show hubs, countries with demand, regional employers, mobility, multinational opportunities and market-specific salary examples. An “Africa salary” aggregate was rejected as misleading. Country context can affect education, credentials, licensing, demand, employers, industries, working conditions, entry difficulty, entrepreneurship and international work. The initial US focus remains part of the history and a useful source of datasets; it is no longer one of the latest four default controls.

Examples involving quantum research, robotics ecosystems and Makerere-to-overseas-study routes were illustrative UX scenarios, not verified market findings.

## Core experience and UX ideas

**Discovery home.** A color-coded Curiosity Wall mixes endeavors, roles, knowledge, tools and qualifications. Cards vary in size and slowly replace or flip individually. Shuffle and Surprise me support exploration. The user's preference was for enticing mixed concepts rather than a category matrix.

**Search.** Lead with “How does ______ get done?” while accepting arbitrary subjects, people, courses, skills, certifications, industries and things. Searching microscope could offer who uses it, what for, underlying knowledge and learning resources. Search becomes multiple entry paths into the same graph.

**Canvas navigation.** Avoid displaying the whole network at once. The initial ego-graph proposal showed a focal node and nearby connections; the later proposal adds semantic zoom from broad territories to fields, specializations, roles, concepts and projects. Clicking feels like entering a place: enter → rearrange → discover → enter again. Broad territories included Built World, Life Sciences, Computing, Human Society, Money, Energy and Creative World.

**Process landscapes.** Endeavors expose stages with roles and contributions around the stage where they are active. A skyscraper example progresses through site, design, finance/approval, foundations, structure, envelope, systems, fit-out and operation. This is an illustrative decomposition, not an authoritative construction sequence.

**Persistent lenses.** SYSTEM shows process; TEAM shows contextual collaboration; KNOWLEDGE shows concepts; LEARN reveals courses/books/qualifications; WORLD changes geographic emphasis; TIME explains emergence and change. Earlier labels were Work, People, Knowledge, Path, World and History.

**Trails.** Keep a visible exploration breadcrumb and support saving/bookmarking it. Sharing trails is a later idea. Example: song → mixing engineer → signal processing → Fourier transform → electrical engineering → radar → aerospace. Another loop starts at mathematics and reaches quantitative finance, options trading, risk management and stochastic calculus. A “show me the path” feature could reveal intermediate learning and career nodes, including reverse exploration from an attractive role.

**Role depth.** Retain descriptions, actual activities, salary ranges, education, math/writing/people intensity, typical environment, outlook, entry difficulty, specializations, collaborators, articles/videos and a day-in-the-life. The detailed structural-engineer schedule in the transcript is an illustrative content format. Information panels can support the canvas; later discussion moved away from ordinary article pages as the core interaction.

**Excellent work.** Show how deep an area goes: long-span bridges, Burj Khalifa structures, Millau Viaduct, seismic buildings and stadium roofs; Linux, PostgreSQL, LLVM and Spanner; inflation targeting, auction design and development-impact evaluation; complex transplant work. These were curation ideas without specific links.

**Playful query lenses.** Explore people who use microscopes, work underground/outdoors/alone, travel internationally, use advanced math, touch blood, work on ships, write, work with politicians or children, work nights or might earn very high incomes. Private-jet ownership was a playful future query idea. Such questions belong in a query/lens system, not as canonical taxonomy categories; no predictive wealth model was specified.

**History.** Explain why a role exists, how knowledge growth creates specialization, and how technologies and institutions enable new work. A later time slider could change the visible network and explain predecessors, splits and replacements. Software/medicine timelines were conceptual sketches, not verified historical chronologies.

## Ontology concepts discussed

These are candidate concepts, not a finalized list of separate database tables.

| Family | Concepts |
|---|---|
| Accomplishment | Endeavor, Stage/Process, Problem/Mission, Artifact, Service, Outcome, Output |
| Participants | Role, Occupation, Specialization, Team, Organization, Industry, Practitioner, Employer, Professional Body |
| Doing | Contribution, Activity, Capability, Skill, Tool/Technology |
| Knowing | Knowledge, Subject, Topic, Field, Concept |
| Learning | Pathway, Degree, Course, Certification, Training, Institution, Learning Resource |
| Context | Place/geography, market profile, presence evidence, time/history, source/provenance/confidence |

An **Endeavor** is coordinated activity producing an outcome. A song is an **Artifact**; producing and releasing it is an **Endeavor**. A **Role** is a position or part someone plays, while an **Occupation** supports alignment with external datasets. **Activity** is an action (analyze soil samples); **Capability** is an ability (geotechnical analysis); **Skill** is a proficiency (statistical inference); **Tool** is an instrument (triaxial testing machine). **Knowledge** and **Field** describe what the work draws on.

The key later decision is to represent **Contribution** in the context of an endeavor and stage. In autonomous-vehicle development, mechanical engineers design suspension geometry, embedded engineers develop control firmware, ML engineers build perception models and safety engineers validate behavior. Their collaboration follows from those contributions. The model should not imply that every software engineer works with every mechanical engineer.

Candidate relationships included `heavily_used_in`, `leads_to`, `uses`, `works_in`, `can_specialize_as`, `produces`, `contributes_to`, `designs_with`, `relies_on`, `hands_off_to`, `coordinates_with`, `accountable_to`, `approves`, `supervises`, `advises`, `supplies`, `depends_on`, `reviews`, `operates` and `serves`. `works_with` survives as a historical/general idea but needs context or derivation. Weighted edges, confidence and sources were proposed. History concepts included `emerged_at`, `predecessor_of`, `split_into`, `enabled_by` and `replaced_by`.

The intellectual throughline: what we know → what we can do → roles people play → teams we form → things we build → the world we live in.

## Architecture and delivery proposals

Start with Postgres rather than introducing a dedicated graph database immediately. The initial sketch had `nodes` (id/type/slug/name/description), `edges` (source/target/type/weight/confidence/source), `market_profiles` (node/geography/pay/outlook/demand/entry requirements) and `resources` (node/type/title/url/quality score). Contextual contributions, presence, time and provenance require refinement before that sketch becomes a schema. React Flow was suggested as a frontend candidate, with the assistant's attribution to CareerGraph remaining an inference. Neither stack nor library was formally locked.

The early Mathematics Universe proposal comprised roughly 20–30 knowledge nodes, 20 fields, 40 occupations and 50 specializations, plus related material. Its proposed M0 included graph navigation, search, 6–8 node types, filters, detail drawer, geographic toggle, salary cards, daily work, routes, collaborators, specializations, media, excellent work and saved breadcrumbs. These numbers and the math-first scope were superseded by the diverse-endeavor approach; their interaction ideas remain useful.

Latest ontology stress tests:

1. Produce and release a song — creative work, production and distribution.
2. Build a skyscraper — engineering, finance, government and construction.
3. Deliver emergency medical care — services and tightly coordinated teams.
4. Get Ugandan coffee from farm to a European café — agriculture, logistics, trade, finance and geographic context.
5. Launch and operate a satellite — advanced science and geographically uneven ecosystems.
6. Build and operate a mobile app — software, design, product and business.

Other exploration examples included elections, cancer treatment, streaming media, auditing, court cases, airline flights, smartphone manufacturing, video games and clinical trials.

## Naming record

The sequence moved from Career Atlas to broader human-work names, then Workings / Invisible Workings, then sleeker names and finally **Latent Threads**. The user disliked “workings,” explicitly permitted dropping “invisible,” suggested Invisible Threads and selected Latent Threads.

All alternatives discussed: Career Atlas, Work Atlas, Atlas of Work, World of Work, Workscape, Pathfinder, Wayfinder, Cartograph, Skillscape, Vocata, The Human Stack, Civilization Map, Atlas, Workings, Worldworks, Done, Behind, Throughline, Machina, Human Systems, The Work Behind, Invisible Systems, Invisible Atlas, Invisible Work, Invisible Workings, Loom, Trace, Lattice, Praxis, Mesh, Relay, Strata, Thread, Nexus, Forge, Invisible Threads, Hidden Threads, Latent Threads, Veiled Threads, Underlying Threads, Quiet Threads, Unseen Threads, Hidden Fabric, Latent, Underlay, Undercurrent, Interwoven and Weave.

The assistant favored Loom for its weaving metaphor, Trace for trails, Lattice for graph structure, and later Latent for hidden connections. Latent Threads combines something present but not immediately visible with connections that can be followed through people, knowledge, tools, institutions, geography and time. Explorations become following a thread; contributions become threads coming together. Earlier Loom language mapped threads to roles/knowledge/tools/institutions, weave to endeavor/process, pattern to the system and trail to the user's journey.

Taglines and copy candidates:

- See how the world gets done.
- Follow the threads behind anything.
- How does a song get made? Follow the threads.
- You started with coffee and ended up at commodity derivatives.
- How does ______ get done?
- See how things come together.
- Follow how things get done.
- Discover what makes the world work.
- Explore what lies behind everything.
- See the connections behind how things get done.
- How the world gets done.
- Explore how everything gets done.
- See what it takes.
- Follow an idea through the people and systems that make it real.
- Explore the people, knowledge, tools, institutions and systems behind the things around you.
- Everything has workings. Find out what they are. (Earlier, superseded naming direction.)

Naming research reported existing businesses/projects for Invisible Systems, Invisible Atlas, Invisible Threads, Unseen Threads and Quiet Threads; Invisible Work also has established book/labor associations. Thread/Threads was considered crowded, including Meta association. The final chat reported an Australian clothing brand using Latent Threads and `latentthreads.com`, plus scholarly use in entity-history research. The storefront and academic reference were recovered during export; the Australian location claim has not been independently established here. These findings preserve a working-name caveat, not trademark clearance. See [naming sources](03-sources.md#naming).

## Next steps and open questions

The next agreed work area is **Ontology / Taxonomy v0.1**, still undelivered in the source conversation. Define canonical nodes and edges; contextual contributions; geography/presence; temporal relationships; provenance/confidence; a song example graph; and a relational schema. Stress-test against the remaining endeavors before proceeding into data acquisition and app implementation tracks.

Still to resolve: which candidate concepts are entities versus attributes; contribution cardinality and evidence; classification crosswalks; boundaries between role, occupation and specialization; how local presence is verified and dated; resources' licenses and access conditions; actual salary and market coverage; historical precision; the initial UI prototype and MVP boundary; and domain/brand diligence before final commitment. No launch-ready ontology, imported knowledge base, finished UI or registered brand should be inferred from this export.
