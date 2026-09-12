# Wave 1 release review — 12 September 2026

## Outcome

PM accepted Checkpoint C locally: one sourced song process with six stages, eight contextual contributions, mixed discovery, label/alias search, manual shuffle and Surprise me, recoverable exploration trail, and three contextual learning resources. Full hosted release verification is the final step; the previous Checkpoint B is already live.

## Verification evidence

- Production check pipeline: 36 tests, catalog validation, TypeScript and Vite build passed, including negative data cases, history/context restoration, malformed routes, learning selection/license/link safety and publication provenance/history guards.
- Real browser walkthrough: mixing contribution → audio mixing → sound waves, and songwriter → songwriting → chords/harmony → Ableton. Contribution and stage context stays visible; evidence explains the relationship and marks inference explicitly.
- Discovery: DAW alias, mixed-case partial WAV, songwriter and song return appropriately typed results. Coffee returns an honest empty state with recovery. Shuffle changes actual role/knowledge/tool targets; Surprise me opens a real entity.
- Navigation: three-hop trail, earlier trail selection, browser back/forward and deep-link refresh retain the selected contribution context. Unknown tool ID shows recovery; the exact old DAW preview ID migrates; malformed percent escapes recover to home.
- Independent review identified an identical-URL repeated-trail keyboard focus defect. Fixed in App’s navigation effect. PM reproduced the repaired cycle and confirmed focus moves to main-content, then Tab reaches the retained trail anchor with a visible 3px blue outline.
- Keyboard: search Enter focuses the first result, Enter opens it, visible focus confirmed. Disclosure and external lesson controls work. The agent verified resource focus; PM verified the repeated-trail focus repair.
- Responsive: home, exploration and all three learning cards inspected at 360px. Document width/scrollWidth are 360/360 with no overflowing learning elements. Desktop home is 1280/1280. Screenshots were displayed in the PM task for visual foundation, sourced exploration and Checkpoint C, including expanded mobile learning evidence.
- Reduced motion: Chrome DevTools emulated prefers-reduced-motion: reduce; matchMedia returned true and all four curiosity tiles had computed animation/transition duration 0s. The dedicated QA tab was closed afterward, ending its temporary emulation. Later discovery/learning CSS adds no conflicting motion rules.
- External learning: Ableton opened to its actual Get started page in a separate tab. Returning preserved the original concept, contribution context and expanded evidence. All three cards were inspected: Ableton has free access with unknown reuse permission; OpenLearn has free access and conditioned CC BY-NC-SA reuse with third-party exceptions, beginner/intermediate levels as sourced. Original source/access checks are in docs/content/song-review.md.

## Performance

Measured with Node zlib.gzipSync over production files: JavaScript 86,001 bytes, CSS 6,636 bytes, HTML 330 bytes; total **92,967 bytes (93.0 kB)**. This measures compressed core files, not HTTP headers/cache behavior; data is bundled in that JavaScript. No runtime API, external fonts or images are required.

A local in-app browser search sample measured fill plus DOM result confirmation (including the browser bridge, not isolated render latency): DAW 20ms, waves 6ms, songwriter 7ms, coffee 6ms, song 7ms. Five samples on this laptop are a basic responsiveness check, not a cross-device benchmark.

## Review boundaries

This is a curated explanation of producing and releasing a song, with learning links; it does not host a DAW, course content or an audio track. Session trail is bounded to 30 entries in browser history; copied links preserve focus and contribution context, not the complete path. No accounts, offline reopening, saved bookmarks or geography UI are in Wave 1. Coffee follows in Wave 2. There are no known release-blocking defects after the checks above; user usability feedback remains to be collected.

## Suggested five-minute review

Start with Follow a song, choose Mix the tracks, follow the mixing contribution to audio mixing and sound waves, and expand a connection explanation. Open its OpenLearn resource and return. Then explore songwriting through harmony into Ableton. Try DAW search, Shuffle, and an earlier trail entry. Lincoln’s actual feedback so far is “loving the direction”; no additional user testing is claimed.
