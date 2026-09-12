# LT-020 review — 12 September 2026

## Reviewed behavior

- Global catalog home: seven real entries across mixed tile sizes and three layouts. Manual Shuffle animates with staggered flip/slide movement; automatic rotation uses a seven-second interval when idle. Search and Surprise use all 39 published entities, including activities.
- Search explicitly names the catalog and identifies result types. Removed song-specific home/header marketing, slogans and visible trail.
- Sources, attribution, interpretation badges and empty learning audit panels are hidden by default. The accessible Settings gear enables detailed information and controls automatic shuffle; preferences survive reload and unavailable storage is handled.
- Skills, concepts, roles and tools show independent connections. Stages and activities retain their real endeavor context. Audio mixing is a skill connected to Mixing and Sound waves, without inheriting a song breadcrumb/process view.
- Conventional activity/stage names, including Production, Recording, Mixing and Mastering. Actual role names are preserved. Underlying sourced claims are unchanged.

## Verification

PM integrated `pnpm check`: 45 tests pass, release data validation, TypeScript and production build pass. Focused tests cover the complete published catalog, draft exclusion, a synthetic second endeavor, sparse catalogs, destination safety during animation, cancellation, instant reduced-motion transitions, storage failures and activity labels. The synthetic endeavor is test-only.

Browser review on the local app verified the manual leaving animation and completed destination change; automatic rotation changed tile content after an idle interval; a keyboard-focused tile remained stable through a longer interval. Turning automatic shuffle off also kept content stable. Settings and detailed-information persistence were checked through reload, with details restored off afterward. Search for mixing returned distinct Activity, Stage, Skill and Role results; Enter focused the first result. At 360px, the page had no horizontal overflow, Settings fit within the viewport and tiles/search remained usable. Desktop review checked the revised wall and independent Audio mixing/Production/Sound waves views. Reduced-motion scheduling and CSS were reviewed and the instant path is automated; this revision did not separately emulate an OS preference in the browser.

## Scope and limits

The published catalog still contains one endeavor and its sourced connections. All tiles are real content, so music-related entities remain while home/navigation framing is generic. A second endeavor requires content research, not UI changes. No new research, backend or future Rabbit Hole feature is included. The existing navigation history implementation remains internally; the visible trail and forced inherited hierarchy are removed.

## Publication

Published application source `d84d0c45821e7335bebc0d608357cd74fbf41284`, deployment `12c0bb28c503f49cd15c87d26a1b7cd3d9584198`. The publisher rebuilt the clean committed snapshot with a frozen lockfile and passed all 45 tests, data/type checks and production build. Only app assets, index, .nojekyll and release.json were published.

- [Exact-source CI success](https://github.com/karuhanga/latent-threads/actions/runs/34675446217)
- [Pages deployment success](https://github.com/karuhanga/latent-threads/actions/runs/34675466833)
- [Live demo](https://karuhanga.github.io/latent-threads/)

PM opened the hosted revised home, used global Surprise to reach the independent Songwriting skill, and refreshed that deep link successfully. Public release.json returned the exact application source above. The live home is left open for review. Later documentation-only handoff commits do not alter this deployed application.
