# Latent Threads — conversation export bundle

Created **12 September 2026** from **Discuss Career Taxonomy App**.

Start with [the product brief](02-product-research-brief.md) for the current direction. Use [the transcript](01-conversation-transcript.md) to inspect the original wording and how the ideas evolved.

## Contents

| File | Contents |
|---|---|
| [01-conversation-transcript.md](01-conversation-transcript.md) | All retrieved user/assistant messages in chronological order, with original text and citation markers preserved. |
| [02-product-research-brief.md](02-product-research-brief.md) | Clean synthesis of product concept, adjacent products, datasets, open learning, geography, UX, ontology, architecture, naming, decisions and next steps. |
| [03-sources.md](03-sources.md) | Topic-grouped recovered links, all original citation identifiers, occurrence index and unresolved-link notes. |
| [04-project-snapshot.json](04-project-snapshot.json) | Machine-readable current direction, decision status, concept families, geography, UX and next steps. |
| [05-export-request.md](05-export-request.md) | The continuation task's user request, separately preserved. |
| [06-conversation-archive.json](06-conversation-archive.json) | Structured reader response and normalized chronological message bodies for exact-text reuse. |
| [07-manifest.json](07-manifest.json) | File sizes, SHA-256 checksums and export verification counts. |

## Coverage and fidelity

The conversation reader returned **9 turns: 9 user messages and 8 assistant messages**, and reported `hasMore: false` / no older cursor. All 17 message bodies are preserved without paraphrasing in the transcript and JSON archive. The unpaired user message is retained. Retrieval did not show message-length truncation; the longest body is below the reader's 20,000-character limit. Headings and turn timestamps are export annotations. UTC timestamps describe turn starts, not individual message send times.

This is the complete visible conversation returned by the reader, not an account-level ChatGPT export. Hidden search/tool output, deleted messages, alternative branches and citation destination metadata were not returned. No attachments were returned. The product transcript ends with the source assistant's export handoff. The current export request is included separately; export-production updates are not part of the product discussion.

The source includes **36 distinct web citation identifiers**. Their exact URL mappings were unavailable. The sources file preserves every identifier and supplies clearly labelled search-recovered matching pages or official entry points. It does not pretend these are the original citation metadata. The literal domain `latentthreads.com` is preserved. No external articles or datasets are copied into this bundle.

## How to interpret the brief and snapshot

**Latent Threads** is a working name. “See how the world gets done.” is the leading proposed tagline. The source discussion reached agreement on direction, not a finished ontology or implemented product.

The brief separates explicit user choices, assistant proposals, earlier superseded ideas and deferred possibilities. Example weights, salaries, geographic ecosystems, course cards and history timelines are illustrations unless separately verified. Kenya and Uganda are represented as sibling countries within Africa; the source's lens order is not interpreted as country containment.

Fresh source-link recovery was performed only to make the bibliography useful. It does not establish current validity of every research claim or supply trademark clearance. No brand registration, data import, application implementation or ontology v0.1 deliverable is implied.

## Formats and integrity

All human-readable files are UTF-8 Markdown; machine-readable files are UTF-8 JSON. Relative Markdown links work after extracting the folder. The ZIP contains one top-level `latent-threads-export/` folder. The manifest checksums cover every other bundle file; the manifest excludes itself. The archive was tested for corruption, JSON files parsed successfully, and transcript message bodies checked against the retrieved record.
