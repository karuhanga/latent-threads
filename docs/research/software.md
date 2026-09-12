# Mobile-app content review

Reviewed 2026-09-12 by `agent:deployment_review` for [LT-026](../tickets/LT-026.md), using the [Wave 2 contract](../product/wave-2.md). The pack contains 26 nodes, 6 activities, 15 relations, 2 learning resources and 55 evidence records. Eight primary pages were read before authoring; the ninth source records this editorial framing.

## Scope, framing and limits

The endeavor is Mobile app development, with a mobile-app artifact. Native Android provides the concrete development and testing example; Google Play provides an example of distribution and user support. These choices do not imply that all mobile apps use Android, Kotlin, Compose or a particular store.

Six reading groups cover research/planning, interaction design, development, testing, distribution and support. Their ordering is editorial. Research, design, testing and feedback can recur. Role labels describe the work someone does in this example, not six mandatory jobs, staffing rules or formal occupation mappings. No particular team or organization-to-organization relationship is asserted.

GOV.UK guidance supplies general service-research and prototyping practices. Applying those practices to this mobile-app exploration is an editorial selection; government-specific mandates, procurement rules, research intervals and participant counts are not carried into the app. Android documentation supplies platform-specific examples. Store policy details, fees, review times and version requirements are outside this pack.

## Primary-source review

| Source | Read section and supported scope |
| --- | --- |
| [GOV.UK: Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) | Needs, interviews, observation and recurring research. |
| [GOV.UK: Plan user research](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service) | Questions, participants, activities, practical arrangements and team planning. |
| [GOV.UK: Making prototypes](https://www.gov.uk/service-manual/design/making-prototypes) | Exploring and testing designs with sketches or interactive prototypes. |
| [Android: Create your first app](https://developer.android.com/codelabs/basic-android-kotlin-compose-first-app) | Prerequisites, project creation, code, interface changes and preview. |
| [Android: Your first Kotlin program](https://developer.android.com/codelabs/basic-android-kotlin-compose-first-program) | Browser-based programming, functions, running code and modifying output. |
| [Android: Testing fundamentals](https://developer.android.com/training/testing/fundamentals) | Manual/automated checks, functional testing and device-based tests. |
| [Android: Publish your app](https://developer.android.com/studio/publish) | Preparing a release, signing, promotional materials and distribution channels. |
| [Play Console: Ratings and reviews](https://support.google.com/googleplay/android-developer/answer/138230?hl=en) | Examining feedback and responding to reported app problems. |

Claim-level evidence appears in [evidence.json](../../data/software/evidence.json), with exact source locators and sections in [sources.json](../../data/software/sources.json). The content paraphrases narrowly supported claims and links to original material. It does not copy tutorial code or screenshots.

## Shared planning and learning

User research references the existing `capability:project-planning`. The specific application is organizing research objectives, rounds, participants, activities and practical requirements. That mapping is explicitly labeled as an inference with its rationale; it does not make the researcher responsible for managing the whole app project. The shared record is not copied or redefined.

Both learning pages were readable without an account. The first Kotlin program requires an internet-connected computer and browser; its browser editor teaches programming rather than building an Android app. The first-app tutorial requires basic Kotlin and Android Studio, and teaches a small practice app. Those prerequisites are visible in resource metadata. The exercises were reviewed but not executed, and Android Studio was not installed for this content task.

The tutorials separately declare CC BY 4.0 for page text, except where otherwise noted, and Apache 2.0 for code samples. Their access is marked free; the open-license link describes the page-text license. No store publication, developer-account access or paid service is needed to read the resources.

## Verification

An in-memory merge of the enabled catalog plus `software` passed the current `validateCatalog` release checks with zero errors on 2026-09-12: six endeavors, 157 nodes, 41 activities and 102 relations. Node assertions also passed for six software stages/activities/roles, reachability of every software entity, external reviewed evidence coverage, the artifact’s reverse route, two learning paths and resource metadata, no copied planning record, and valid local document links.

The checked cross-domain path is user research → Project planning → housing project management or diagnostic quality work. Structural coverage is separate from the primary-source review recorded above. This builder did not enable the pack in `data/catalog.json`, inspect the UI or publish it; PM source review and UI acceptance remain integration steps.
