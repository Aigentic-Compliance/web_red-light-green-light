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
│   ├── all_scrolls.json                               # Local seed source; not deployed publicly
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
- **Question bank:** seeded into the database for Vercel deployments; it is not a public runtime URL.

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

### Release blockers

1. **Public content and intellectual-property clearance**
   - The database-backed deployment no longer publishes `all_scrolls.json` or embeds the question fallback in the browser. The API sends only the assigned mission study content and current statements needed by the active session; correct answers remain server-side until validation.
   - The compliance content and Clau-Hee artwork must still be cleared for public use.
   - Google Fonts are requested from Google's CDN. Self-host the fonts if visitor privacy or network independence requires it.
2. **Preview controls in production**
   - Reviewer navigation is hidden in the deployment copy of [`public/index.html`](public/index.html). It remains in [`mockups/index.html`](mockups/index.html) for local QA.
3. **Production-browser verification**
   - Test the deployed Vercel URL on current Chrome, Edge, Firefox, and Safari, plus a mobile browser. Video autoplay, media loading, viewport height, and touch controls can differ by browser.

### Accepted first-demo limitations

1. **No persistence or reporting**
   - Answers, assigned missions, scores, and completion state exist only in browser memory. Refreshing or closing the page loses the session. There is no login, leaderboard, completion record, certificate, or administrator report.
2. **No server-side content protection**
   - The question bank and correct answers are downloaded to the browser. Users can inspect or copy them through browser developer tools. A database or API would not solve content secrecy completely, but server-side question delivery would make casual extraction harder.
3. **No analytics or error monitoring**
   - The game does not report starts, completions, drop-offs, answer accuracy, video failures, or JavaScript errors. Add a privacy-approved analytics/error-monitoring service only if those measurements are required.
4. **Static asset and network dependency**
   - The game depends on Vercel serving the JSON, images, and MP4 files successfully. Google Fonts are an additional external request; if blocked, fallback fonts are used and the game remains functional.
5. **Media fallback behavior**
   - Turn videos have a timeout fallback so a stalled video does not permanently block play. This keeps the game moving but can make a transition appear abruptly on slow devices or networks.
6. **Database/API availability is required**
   - The public deployment has no offline question fallback. If the database or API is unavailable, a new game cannot start; this is intentional so question data and answers are not bundled in the browser.
7. **Accessibility remains partial**
   - Some controls use custom clickable elements and the game uses color-heavy visual feedback. Keyboard support exists for tier cards and True/False answers, but a full screen-reader, focus-order, reduced-motion, contrast, and captions audit is still required.
8. **No content-management workflow**
   - Updating policy text currently requires updating the approved seed source and running the database seed script. There is no admin panel, approval workflow, or versioning UI.

### Database-backed architecture

- [`db/schema.sql`](db/schema.sql) defines the `scrolls`, `questions`, and opaque `game_sessions` tables.
- [`scripts/seed-db.mjs`](scripts/seed-db.mjs) imports the approved source bank into the database. The source bank is used only during seeding and is not placed in [`public/`](public/).
- [`api/game/start.js`](api/game/start.js) assigns three missions and creates a five-question ladder without returning answer values.
- [`api/game/answer.js`](api/game/answer.js) validates answers and timeouts server-side, returning the explanation only after submission.
- The Vercel project must have a Neon/Vercel Postgres integration with a `POSTGRES_URL` environment variable in Preview and Production.

### Database setup before deployment

1. Create a Neon database through the Vercel Marketplace or link an existing Neon database.
2. Add `POSTGRES_URL` to the Vercel project for Preview and Production environments.
3. Run [`db/schema.sql`](db/schema.sql) against that database.
4. From a trusted local environment, run:

   ```bash
   npm install
   $env:POSTGRES_URL="your-private-connection-string"
   npm run seed:db
   ```

5. Deploy to Vercel and verify `/api/game/start` through the game UI.

The connection string must never be committed or exposed to browser code.

### Deployment package

3. **Vercel deployment package:**
   - The deployable package is in [`public/`](public/), containing only the runtime `index.html` and the 10 media assets used by the game. Scroll data is served through the API.
   - [`vercel.json`](vercel.json) configures Vercel to publish `public/` as the output directory.
   - The deployment copy of `index.html` uses `assets/<filename>` paths; the working prototype in `mockups/` remains unchanged.
   - Internal source documents, archives, local tooling, screenshots, and the development virtual environment are excluded from the deployment package.

## 6. Vercel Deployment

The project is a static site and does not require a database, serverless function, build step, or environment variables.

### Deploy from the Vercel dashboard

1. Import this repository into Vercel.
2. Leave the framework preset as **Other**.
3. Keep the root directory at the repository root.
4. Vercel will use [`vercel.json`](vercel.json) and publish [`public/`](public/).
5. Deploy.

### Deploy with the Vercel CLI

From the repository root:

```bash
npx vercel
npx vercel --prod
```

No `npm install` is required. The CLI may ask you to link the directory to a Vercel project on the first run.

### Pre-deployment checks

- Confirm Claudia has cleared the public question bank and visual assets.
- Confirm whether the reviewer navigation bar should remain visible for public users.
- Test the production URL on desktop and mobile.
- Verify that the opening screen, question bank, images, videos, victory flow, and elimination flow load successfully.
- Do not deploy the repository root as the site output; Vercel must publish `public/`.
