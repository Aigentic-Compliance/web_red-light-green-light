# Red Light - Green Light (S-Quit Boring Compliance) — Web Edition

Interactive compliance training game featuring **Clau-Hee**, built as the **Option 1: Classic Split Arcade** web prototype for **Aigentic Compliance**.

---

## 1. What This Project Contains

```text
Red-Light-Green-Light/
├── README.md                                          # Handover, setup, and runtime guide
├── AGENTS.md                                          # Non-negotiable game design & policy integrity rules
├── docs/
│   └── plans/
│       ├── 2026-10-22-red-light-green-light-prd.md    # Product Requirements Document (PRD)
│       ├── 2026-10-25-red-light-green-light-technical-design-spec.md    # Technical Design Spec (Markdown)
│       └── 2026-10-25-red-light-green-light-technical-design-spec.docx  # Technical Design Spec (Word)
├── mockups/
│   ├── index.html                                     # Single-page game application (HTML5/CSS3/ES6)
│   ├── all_scrolls.json                               # Sanitized 21-mission (189-statement) question bank
│   ├── serve.js                                       # Zero-dependency Node.js local preview server
│   └── screenshots/                                   # Verified desktop & mobile preview screenshots
│       ├── opening-desktop.png
│       ├── difficulty-desktop.png
│       ├── opening-mobile.png
│       └── difficulty-mobile.png
└── assets/                                            # Required runtime images & MP4 videos + UI art
    ├── Image screen - Game explanation.png            # Opening screen artwork (Clau-Hee & finish ribbon)
    ├── girl tree.jpg                                  # Front-facing Clau-Hee arena idle state
    ├── girl turning towards tree.mp4                  # Step 1: Turn-away video clip
    ├── girl tree back.jpg                             # Step 2 & 3: Back-facing waiting state during 15.0s timer
    ├── girl turning towards the camera.mp4            # Step 5: Turn-back video clip
    ├── 202508191231 clauhee crying.mp4                # Step 6: Elimination video (Clau-Hee crying)
    ├── Radar.png                                      # Step 6: Circular radar scope base texture
    ├── Gameover-1.pngpixel.png                        # Elimination header pixel banner
    ├── openart-video_c58b5455_1754997779073.mp4       # Victory celebration video (Clau-Hee celebrating)
    ├── Congratulationspixel.png                       # Victory header pixel banner
    └── [Supplemental UI & concept assets]
```

### Key Implemented Features
- **Connected 6-Screen Player Journey:** Opening Screen → Vertically Stacked 4-Tier Difficulty Selection (`Beginner`, `Intermediate`, `Advanced`, `Champion`) → 3-Mission Untimed Study → 5-Statement Split Arcade Arena → Verbatim Policy Feedback → Victory or Elimination.
- **Monotonic 5-Statement Difficulty Progression:** Draws 5 unique statements from the 27 statements across the player's 3 assigned missions, guaranteeing $\text{Difficulty}(Q_1) = \text{Easy} \le Q_2 \le Q_3 \le Q_4 \le \text{Difficulty}(Q_5) = \text{Hard}$.
- **Decoupled 6-Step Arena Sequence & 15.0s Wall-Clock Timer:**
  1. Plays `girl turning towards tree.mp4`.
  2. Transitions to `girl tree back.jpg`.
  3. Starts the configurable `15.0s` countdown only when the back-facing state and answer controls (`TRUE [T]` / `FALSE [F]`) are ready.
  4. Immediately freezes the timer and locks input upon answer selection or `0.0s` timeout.
  5. Plays `girl turning towards the camera.mp4`.
  6. Runs the circular radar "swoosh" scanner (`Radar.png` + rotating SVG beam) and reveals `"No movement detected!"` (green) or `"Movement detected!"` (steady red target lock, no strobing) with verbatim source explanations.
- **Approved Content Corrections Applied in `mockups/all_scrolls.json`:**
  - All 21 scrolls (`189` total statements: `64 Easy`, `70 Medium`, `55 Hard`, `0 untagged`) validate cleanly as strict JSON.
  - **Scroll 4, Question 9** (*"Publicly shared water bottles with company branding are considered high risk."*) is tagged `"Easy"` with answer `"False"`.
  - **Low-Value Promotional Items Exemption** (*"Low-value promotional items do not need to be registered. Examples include mouse mats, pens and mugs."*) is harmonized across Scrolls 1, 2, 5, and 7.

---

## 2. Prerequisites & Exact Commands to Run Locally

### Prerequisites
- **Node.js:** `v18.0.0` or newer (tested with `v24.22.1`).
- **Web Browser:** Any modern desktop or mobile browser (Chrome, Edge, Firefox, Safari).
- **External Dependencies:** None. The local preview server (`mockups/serve.js`) uses only built-in Node.js modules (`http`, `fs`, `path`)—no `npm install` is required.

### Exact Commands for Mada
1. Open a terminal (`PowerShell`, `Command Prompt`, or `bash`) in the repository root folder (`Red-Light-Green-Light`):
   ```bash
   cd Red-Light-Green-Light
   ```
2. Start the local preview server:
   ```bash
   node mockups/serve.js
   ```
   *(Optional: To run on a custom port instead of `8085`, run `$env:PORT=8090; node mockups/serve.js` in PowerShell or `PORT=8090 node mockups/serve.js` in bash.)*

---

## 3. Local Game URLs

Once `node mockups/serve.js` is running:
- **Primary Game URL:** [http://localhost:8085/mockups/index.html](http://localhost:8085/mockups/index.html)
- **Root URL (auto-redirects to `/mockups/index.html`):** [http://localhost:8085/](http://localhost:8085/)
- **Question Bank JSON URL:** [http://localhost:8085/mockups/all_scrolls.json](http://localhost:8085/mockups/all_scrolls.json)

---

## 4. Separate Design & Technical Specifications

**Yes — both a Product Requirements Document (PRD) and a separate Technical Design Specification exist in this repository:**

1. **Product Requirements Document (PRD):**
   - [`docs/plans/2026-10-22-red-light-green-light-prd.md`](docs/plans/2026-10-22-red-light-green-light-prd.md) — Covers player experience, difficulty tiers, 6-step statement sequence, radar swoosh visuals, compliance content resolutions, and acceptance criteria.
2. **Technical Design Specification (Draft for review):**
   - **Markdown:** [`docs/plans/2026-10-25-red-light-green-light-technical-design-spec.md`](docs/plans/2026-10-25-red-light-green-light-technical-design-spec.md)
   - **Microsoft Word (`.docx`):** [`docs/plans/2026-10-25-red-light-green-light-technical-design-spec.docx`](docs/plans/2026-10-25-red-light-green-light-technical-design-spec.docx)
   - Covers client-side architecture, state machine & race-condition handling, Mermaid state/sequence/data-flow diagrams, public-content boundaries, read-only Firebase readiness findings, and the deployment handover checklist for **Mada**.
3. **Project Agents Guide:**
   - [`AGENTS.md`](AGENTS.md) — Core non-negotiable design constraints and approved content resolutions.

---

## 5. Known Limitations & Outstanding Work Before Public Release

1. **Public-Content Clearance by Claudia (`claudia@aigenticcompliance.com`):**
   - `mockups/all_scrolls.json` is fetched client-side and contains all 21 compliance missions (`189` statements and explanations). Claudia should confirm whether all 21 missions are cleared for public visibility in the first demo or whether the public JSON should be restricted to a subset (e.g., Beginner Scrolls 1–4).
2. **Reviewer Top HUD Bar (`.reviewer-bar`) Visibility:**
   - `mockups/index.html` currently renders a top preview toolbar (`RED LIGHT - GREEN LIGHT // PREVIEW`) with screen-jump buttons (`1. Opening` through `6. Victory`) for QA review. Before deploying to production, confirm whether to keep this bar visible for demo reviewers or hide it via CSS (`.reviewer-bar { display: none; }`).
3. **Firebase Hosting Packaging & Relative Asset Paths (`red-light-green-light-lab`):**
   - `mockups/index.html` fetches `all_scrolls.json` from its own directory (`mockups/`) and references media via `../assets/<filename>`.
   - Neither `firebase.json` nor `.firebaserc` is committed yet so cloud configuration remains untouched prior to Mada's review. When deploying to Firebase Hosting, Mada should stage only the public runtime files (`index.html`, `all_scrolls.json`, and the 10 active runtime media files in `assets/`) into a clean `public/` folder and either configure a `/` → `/mockups/index.html` redirect in `firebase.json` (zero edits to `index.html`) or serve `index.html` at `/` with `../assets/` updated to `assets/`.
   - Internal documentation (`docs/`, `AGENTS.md`, `.docx`, `.pptx`), `mockups/serve.js`, and unrelated source emails (`*.msg`) must remain excluded from Firebase Hosting.
4. **External Google Fonts CDN Dependency:**
   - At runtime, `mockups/index.html` loads `Chakra Petch`, `Press Start 2P`, and `Space Grotesk` from `https://fonts.googleapis.com` and `https://fonts.gstatic.com`. Confirm whether loading Google Fonts from Google's CDN is acceptable for public visitors or if font files should be self-hosted.
5. **Minor Arena Media Handling Notes:**
   - As documented in Section 2.6 of the Technical Design Specification, jumping directly between arena states via the Reviewer Bar hides inactive `<video>` elements via CSS (`opacity: 0`) without explicitly calling `.pause()` in `clearAllTimers()`, and `playPromise.catch` overwrites `stageTransitionTimer` without clearing the `6500ms` fallback timer ID (though the `transitioned` boolean latch prevents duplicate state transitions).
