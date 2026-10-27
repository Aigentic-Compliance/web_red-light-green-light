# Project Agents Guide: Red Light - Green Light (S-Quit Boring Compliance)

## Overview
This repository contains the game assets, design specifications, and implementation guidelines for the **Red Light - Green Light** interactive compliance training game featuring **Clau-Hee**.

## Documentation Guidelines & Conventions
- **Product Requirements Documents (PRDs)**: All PRDs and player experience specifications must be saved under:
  ```
  docs/plans/YYYY-MM-DD-description.md
  ```
- **Technical Architecture & Specifications**: Technical specifications and implementation architecture must be maintained in separate specification documents (do not mix technical implementation details into player-facing PRDs). Current technical design specification: `docs/plans/2026-10-25-red-light-green-light-technical-design-spec.md` (Draft for review).
- **Publication & Deployment Handover**:
  - Public deployment of the first demo (`red-light-green-light-lab` on Firebase Hosting) is assigned to **Mada** (`madalina@aigenticcompliance.com`) following content clearance by **Claudia** (`claudia@aigenticcompliance.com`) and technical review of `docs/plans/2026-10-25-red-light-green-light-technical-design-spec.md`.
  - Do not deploy, alter cloud configuration, or publish internal source documents (`.docx`, `.pptx`, `.msg`, `docs/`, `AGENTS.md`, `serve.js`) during specification or preview stages.

## Core Game Design Constraints (Non-Negotiable)
- **Visuals, Layout & Selected Prototype**:
  - **Option 1: Classic Split Arcade** (`mockups/index.html`) with established pink pixel styling (16:9 aspect ratio on desktop: Clau-Hee and radar on the left; statement, timer, answer buttons, and explanation on the right; responsive mobile adaptation with large touch controls).
  - **Connected Journey**: Opening → Difficulty selection → Mission study → Five-statement arena → Feedback → Victory or elimination.
- **Difficulty Tiers & Terminology**:
  - Player-facing copy uses **"missions"** throughout, while preserving the source `scroll_number` IDs and policy content internally.
  - Four selectable tiers (single selection) displayed as **four full-width horizontal cards stacked vertically** (`Beginner`, `Intermediate`, `Advanced`, `Champion`) with large, readable body text (~18–20px on desktop), balanced content-hugging padding, vertical scrolling where needed, and keyboard support:
    1. 🐣 Beginner — "Compliance Curious" – Scrolls 1 to 4 (`difficulty_level: "1 out of 4"`)
    2. 🧐 Intermediate — "Policy Padawan" – Scrolls 5 to 10 (`difficulty_level: "2 out of 4"`)
    3. 🧠 Advanced — "Mission Master" – Scrolls 11 to 16 (`difficulty_level: "3 out of 4"`)
    4. 🦾 Champion — "The Red Flag Sniper" – Scrolls 17 to 21 (`difficulty_level: "4 out of 4"`)
- **Mission Assignment**: Exactly 3 unique missions (scrolls) are randomly assigned from the player's chosen difficulty tier for untimed study.
- **Statements & Progression**:
  - Exactly 5 unique statements are randomly selected from the 27 available statements across the 3 assigned missions.
  - **Difficulty Never Decreases**: Question difficulty must satisfy $\text{Difficulty}(Q_1) \le \text{Difficulty}(Q_2) \le \text{Difficulty}(Q_3) \le \text{Difficulty}(Q_4) \le \text{Difficulty}(Q_5)$ with repeated tiers allowed (e.g. Easy, Easy, Medium, Medium, Hard).
  - Mandatory anchors: Stage 1 must be `Easy`, Stage 5 must be `Hard`. No duplicate statements within an attempt.
- **Timer & Decoupled 6-Step Statement Sequence**:
  - Countdown timer: **15.0 seconds configurable default** across all tiers.
  - Answering window is governed strictly by the countdown timer, independent of video clip durations.
  - For each statement:
    1. Play the actual turn-away video (`girl turning towards tree.mp4`).
    2. Enter the back-facing waiting state (`girl tree back.jpg`).
    3. Start the configurable 15-second countdown only when that state, the statement, and answer controls are ready.
    4. An answer immediately freezes the timer and locks further input. Timeout (`0.0s`) also locks input.
    5. Play the actual turn-back video (`girl turning towards the camera.mp4`).
    6. Run the visible radar scan, then show the result and complete source explanation.
- **Radar "Swoosh" Scanner & Immediate Evaluation**:
  - Prominent circular radar scope with stationary grid and stationary silhouettes (`Radar.png` + SVG grid/silhouette), overlaid by a bright rotating radial beam, glowing leading edge, translucent scanning wedge, and fading trail.
  - Stylized answer-driven scanner: no webcam or physical movement tracking; Clau-Hee has no laser eyes.
  - Correct answers produce a green confirmation: `"No movement detected!"`.
  - Wrong answers or timeout produce a steady red target lock: `"Movement detected!"` (steady red indicator/highlight without flashing or strobing for accessibility).
- **Explanations, Retry & Victory Feedback**:
  - Clear policy explanations (verbatim from the source bank) are displayed on all answers (correct and incorrect).
  - After the fifth correct answer, the Stage 5 explanation remains displayed until the player explicitly clicks `CONTINUE TO VICTORY`.
  - `TRY AGAIN` after elimination preserves the 3 assigned missions, returns to study, and generates a fresh 5-statement question ladder.
  - `PLAY AGAIN` after victory assigns 3 new missions from the same difficulty level.
- **Media Asset Mapping**:
  - Opening artwork: `Image screen - Game explanation.png` and `OPENING SCREEN 4800 x 2700.png`.
  - Turn-away video: `girl turning towards tree.mp4`.
  - Back-facing waiting image: `girl tree back.jpg`.
  - Turn-back video: `girl turning towards the camera.mp4`.
  - Elimination video: `202508191231 clauhee crying.mp4` (Clau-Hee crying).
  - Victory celebration video: `openart-video_c58b5455_1754997779073.mp4` (available in `assets/`, extracted from `Assets - Sequence .msg`, showing Clau-Hee celebrating; no longer a missing asset).
  - Victory static visual: `Congratulationspixel.png`.
- **Compliance Policy Integrity & Approved Content Resolutions**:
  - Never silently alter or invent compliance policy rules, questions, or correct answers. Preserve `20250707 - JSON Scrolls in Word.docx` untouched as the historical source, with approved content corrections applied in `mockups/all_scrolls.json` and documented below:
    - **Malformed JSON Syntax (Resolved in Parser)**: Unclosed multi-line strings in Scroll 4 Rule 6 and Scroll 8 Rule 1, orphaned brace before Scroll 1, missing quote on difficulty level, and trailing commas in `20250707 - JSON Scrolls in Word.docx` are sanitized gracefully in `mockups/all_scrolls.json`.
    - **Scroll 4, Question 9 Missing Difficulty (Resolved)**: For *"Publicly shared water bottles with company branding are considered high risk."*, difficulty is approved and set to `"Easy"`, retaining `"answer": "False"` and its existing explanation (*"Such public, promotional items are typically low risk."*), making it eligible for question selection.
    - **Low-Value Promotional Items Exemption (Resolved)**: Confirmed rule: *Low-value promotional items do not need to be registered. Examples include mouse mats, pens and mugs.* Affected rules, examples, statements, and explanations in Scrolls 1, 2, 5, and 7 are harmonized with this exemption (including removing the registration condition from the explanation for the publicly distributed €25 branded charger in Scroll 1 Q4, and updating Scroll 1 Q7 to *"All compliant gifts, except low-value promotional items, must still be registered (ideally before acceptance)."* with answer `"True"` and difficulty `"Easy"`), while preserving all other gift restrictions (government officials, sensitive periods, cumulative patterns, and concealed gifts).
    - **Declined or Returned Gifts (Confirmed Complementary Rule)**: Politely declining or returning a non-compliant gift (Scroll 1 Rule 6) and documenting/logging that declined or returned gift (Scroll 2 Rule 4 / Q3, Scroll 7 Rule 4 / Q3) are confirmed complementary instructions, not a conflict.
