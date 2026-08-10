# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

InnerNote (code name "innarva") is a static, client-side-only web app for recording daily mood and physical condition, deployed via GitHub Pages at `bipolar-cat.github.io`. It has no backend, no build step, and no package manager — it's plain HTML/CSS/JS loaded directly by the browser, with Chart.js pulled from a CDN in `index.html`.

The product is built for a PSW (psychiatric survivor worker) audience: it helps users log mood/condition over time and produce a summary they can show a doctor during limited appointment time. There are two parallel input modes, Step3 (Bad/Normal/Good, beginner-friendly) and Step10 (0–10 scale), which share the same underlying data.

## Running / previewing

There is no build, lint, or test tooling in this repo. To preview locally, just serve the directory statically, e.g.:

```
python3 -m http.server
```

then open `index.html` in a browser. There is nothing to compile — edits to `.html`/`.css`/`.js` are live on reload.

## Architecture

`index.html` is layout-only; all logic lives in `js/`, loaded in this order (order matters — later files call functions defined in earlier ones):

1. **`storage.js`** — localStorage read/write and date formatting. Owns the storage keys (`innernote_logs`, `innernote_mode`) and `formatDate()`. Everything else goes through `getLogs()`/`saveLogs()`/`getMode()`/`saveMode()` rather than touching `localStorage` directly.
2. **`logs.js`** — renders the "recent records" list (`renderLogs()`), including Step3 label lookup (`getMoodLabel`/`getCondLabel`).
3. **`chart.js`** — renders the Chart.js line chart of the last 10 records (`renderChart()`), including click-to-scroll-to-log behavior and Step3-vs-Step10-aware axis labeling.
4. **`summary.js`** — generates the "Summary" report (`generateSummary()`/`renderSummary()`): record count, mood/condition averages, frequent words/phrases extracted from free-text notes, and a chronological comment list. This must stay purely descriptive — see Analysis Policy below.
5. **`settings.js`** — settings panel open/close and Step3/Step10 mode switching (`changeMode()`), which re-renders buttons, chart, and logs.
6. **`script.js`** — entry point. Owns `selectedMood`/`selectedCond` state, builds the mood/condition input buttons (`createButtons()`), and `saveData()`. Calls `refreshUI()` (defined here) to re-render chart/logs/summary-status after any state change. `initialize()` runs on `DOMContentLoaded`.

Data model: each log entry is `{ ts, date, mood, cond, note }`, where `mood`/`cond` are stored as 0/5/10 (Step3) or 0–10 (Step10) — the two modes share one numeric scale so the chart and averages work across mode switches. All persistence is `localStorage` only; there is no server sync, export, or backup yet (see Roadmap).

## Product constraints (read `docs/00_Constitution.md` and `docs/04_AnalysisPolicy.md` before touching Summary/Analysis code)

This project has an explicit written policy governing what analysis features are allowed to do, because the target users are recording sensitive mental-health data:

- No diagnosis, evaluation, advice, cause inference, or future prediction — ever, in any feature.
- The app/AI never interprets or replies to a user's free-text comment; comments are stored and displayed verbatim.
- Analysis/Summary may only show facts directly derivable from stored data (counts, averages, frequent words/phrases, aggregates of "observation items") — no subjective judgments.
- Comparing or ranking users against each other is out of scope; anonymized aggregate data (when added) is reference-only, never evaluative.

Any new Summary/Analysis feature should be checked against `docs/04_AnalysisPolicy.md` before implementation, not just against the UI spec.

## Documentation map (`docs/`)

Numbered docs are the source of truth for product decisions, in reading order per `docs/README.md`:

- `00_Constitution.md` — mission/philosophy/AI policy (binding constraints, see above)
- `01_Overview.md` — what InnerNote is/isn't responsible for
- `02_Specification.md` — feature spec (current: Ver.0.2)
- `03_UI_Spec.md` — screen/layout spec
- `04_AnalysisPolicy.md` — analysis/summary rules (binding constraints, see above)
- `05_DesignGuide.md` — current design rationale (colors, button sizing, layout)
- `06_DesignHistory.md` — a changelog of *why* design decisions changed; do not treat it as current spec, and add new entries here (not to `05_DesignGuide.md`) when changing design rather than overwriting history
- `07_Roadmap.md` — planned work by version; the not-yet-implemented "Observation Items" (注目項目) system described in `02_Specification.md` §7 is Ver.0.3, not yet in code
- `08_Glossary.md` — shared terminology (Step3, Step10, Standard Position, etc.)

## Known quirks

- The product is called "InnerNote" throughout `docs/`, but source file headers/comments and the HTML `<title>` still say "innarva" (an earlier name) — this is not a typo to silently fix across the board, just an inconsistency to be aware of when searching/grepping.
- `style.css` currently contains `body { background: red !important; }` near the top — appears to be leftover debug styling rather than intentional (conflicts with `05_DesignGuide.md`'s white/gray background rationale).
- `style_backup.css` exists alongside `style.css` but is not referenced by `index.html`; it's a manual backup, not a build artifact.
