# Wave 3 software depth review

Reviewed 12 September 2026 for [LT-035](../tickets/LT-035.md) under the [Wave 3 contract](../product/wave-3.md). Author/reviewer: `agent:ontology_first_slice`. PM owns acceptance, integrated checks and publication. The earlier [software review](software.md) remains intact.

## Content and examples

The pack preserves all 26 existing nodes, six activities and 15 relations. Every existing page has new explanation and example detail; activities identify inputs, outputs and a decision. Four added nodes comprise two study areas, an Android course and its first unit. The final candidate contains **30 nodes, six activities, 20 relations, 19 sources and 140 evidence records**, using schema 0.3.

Examples follow an original fictional reading-list app. Its team, readers, book entries, prototype choices, faults and release encounters are illustrative, not reported user research or an app we built. Descriptions explain sourced work; examples give that work a concrete setting. Separate internal editorial evidence on every page records this distinction. No tutorial is claimed to build the complete fictional app.

The route remains an editorial selection of native Android work. Research, design and testing recur; six role labels do not prescribe six people. The existing User research → Project planning connection remains an explicitly supported **inference about planning research**, not responsibility for managing the whole project. No shared entity, organisation or geography was added.

## Expanded-claim source map

Seventeen external primary sources were reviewed. The `source:software-*` records identify sections, and new `evidence:software-depth-*` rows attach expanded claims to their subjects. Existing evidence was retained.

| Primary source | Expanded claims reviewed |
| --- | --- |
| [GOV.UK user needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) | Endeavor, User researcher and User needs. Outcomes, current tasks, interviews/observation and recurring learning. |
| [GOV.UK research planning](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service) | Research stage/activity. Questions, participants and methods; no mandated cadence or participant count imported. |
| [GOV.UK in-depth interviews](https://www.gov.uk/service-manual/user-research/using-in-depth-interviews) | User research skill and researcher example. Open questions, follow-ups and concrete past experience. |
| [GOV.UK prototypes](https://www.gov.uk/service-manual/design/making-prototypes) | Design stage, interaction designer, prototyping skill/activity. Selected fidelity, comparison and revision; government-specific mandates excluded. |
| [BLS developers and testers](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm) | Endeavor, developer, tester and testing activity. Selected duties concerning requirements, implementation, maintenance and defect reports. No qualification or employment claims. |
| [Android first-app codelab](https://developer.android.com/codelabs/basic-android-kotlin-compose-first-app) | Development, Android skill, app/preview distinction and tutorial. Reviewed prerequisite, template, Compose edits, preview and conclusion. |
| [Android first Kotlin program](https://developer.android.com/codelabs/basic-android-kotlin-compose-first-program) | Browser tutorial and its learning setup. Reviewed goals, browser requirement, program changes and troubleshooting. |
| [Kotlin functions](https://kotlinlang.org/docs/functions.html) | Programming functions. Parameters, calls and possible return values; no provider code copied. |
| [Android testing fundamentals](https://developer.android.com/training/testing/fundamentals) | Testing stage, App testing and Functional testing. Differences of subject/scope and manual/automated checks. |
| [Android Studio overview](https://developer.android.com/studio/intro) | Studio and development. Project source/resources, integrated tools and building. No version-specific setup instructions. |
| [Android Emulator](https://developer.android.com/studio/run/emulator) | Test device. Virtual profiles and physical alternatives; no machine specification copied into the catalog. |
| [Android publication overview](https://developer.android.com/studio/publish) | Artifact, distribution stage, publisher and publication activity. Release version, preparation and distribution materials. No current store fee, policy threshold, review-time or installation instruction. |
| [Play Console reviews](https://support.google.com/googleplay/android-developer/answer/138230?hl=en) | Support stage/role/activity and Console. Review filters, relevant responses and reply permission; no console account was accessed. |
| [Android course overview](https://developer.android.com/courses/android-basics-compose/course) and [Unit 1](https://developer.android.com/courses/android-basics-compose/unit-1) | Course structure, selected teaching goals, prerequisites and Unit 1’s provider estimate. |
| [CS2023 final report](https://ieeecs-media.computer.org/media/education/reports/CS2023.pdf) | Computer science/SDF hierarchy and functions within SDF. Reviewed the knowledge-area model and printed pages 229–233, especially functions on page 231. |
| [Android content license](https://developer.android.com/license) | New course/unit license metadata. Content categories and exceptions are retained rather than assigning the codelab license to every linked item. |

The ACM HTML report intermittently returned an error/challenge. The final PDF from IEEE Computer Society opened and supplied the hierarchy evidence; no draft curriculum was substituted. BLS and GOV.UK supply general work descriptions in their own contexts. Applying selected practices to this app remains an editorial choice, not a universal occupational rule. All authored explanations and examples are original; code, diagrams, screenshots and course text were not copied.

## Study and learning structure

The child-to-broader branch is **Programming functions → Software development fundamentals → Computer science**. CS2023 explicitly places functions in SDF and SDF in its computer-science model. These are concept/subject/field relationships, distinct from course membership. The existing Android skill reaches the branch through Programming functions.

The two existing codelabs remain **tutorials** with their original IDs. **Android Basics with Compose** is a third nonmodule choice, modelled as a course. Its explicitly named **Unit 1: Your first Android app** is modelled as a module with one reviewed `curriculum_part_of` edge. Only this selected unit is represented. The unit and course each have their own reviewed teaching edge to Android app development; parent membership is not used to infer teaching.

Practical setup is visible:

- The first Kotlin program needs a browser and connected computer. It runs code in Kotlin Playground; Android Studio is unnecessary for that exercise.
- The first-app tutorial explicitly needs **basic Kotlin and Android Studio**. It uses preview; device execution is covered later.
- Course entry needs basic computer/maths skills and a computer capable of running Android Studio. A physical Android device is optional. Unit 1 includes setup; its **10-hour duration is the provider’s estimate**, not a guaranteed completion time.

No existing knowledge node exactly represents the first-app tutorial’s broad basic-Kotlin prerequisite. It remains prose rather than an inaccurate `learning_requires` edge. The other course entry requirements likewise do not justify inventing credential or curriculum links.

All four learning pages opened publicly without an account on 12 September 2026. Sign-in was not exercised. The two codelabs explicitly distinguish CC BY 4.0 page content from Apache 2.0 code samples, subject to exceptions. The course/unit link to Android’s broader content policy, which distinguishes content categories and excludes some linked media and brand assets. Open reuse and free access are separate metadata. No credential is asserted. Videos, quizzes, codelabs and Android Studio setup were reviewed as content, not completed or executed.

## Focused verification

Ran in-memory Node assertions against the actual enabled aggregate and software pack:

- Release validation: **0 errors**.
- **36/36** software pages have explanations and original examples meeting depth guards without repeating tile summaries; **6/6** activities have inputs, outputs and decision.
- **Four resources** have kind, preparation, outcomes and explicit teaching links; **three** are nonmodule offerings. Reviewed course/unit membership exists.
- All **six education items** are discoverable; graph traversal from Mobile app development reaches **all 36** software pages.
- Shared Project planning is reachable, is not duplicated, and retains its inference evidence. Organisation examples and presence assessments remain empty.

PM reviewed all explanations, examples and preparation with no copy revisions requested. Full regression tests, visual acceptance and publication remain PM-owned. These checks do not establish that the fictional app exists or that the learning exercises work on a particular learner’s machine.
