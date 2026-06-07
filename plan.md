# Implementation Plan - AFRINOVA

AFRINOVA is a multi-feature application focused on environmental sustainability, agriculture, skills development, and community support. The app combines 12 key features into a single platform.

## Scope Summary
- **App Name:** AFRINOVA
- **Core Features:**
  1. Farmers Market (Advertising, Prices, Buyer Connection, Tips)
  2. Youth Skills Hub (Business skills, Training, Mentors, Opportunities)
  3. AgroScan AI (Crop disease identification - Mocked AI)
  4. Trash2Cash (Recycling marketplace)
  5. Sign Connect (Speech-to-Sign/Sign-to-Speech animations - Mocked)
  6. GreenLens AI (Environmental impact scanner - Mocked AI)
  7. First Aid Hero (Emergency guidance with media)
  8. Project Verse (Innovation uploads, Feedback, Team-finding)
  9. Settings & Progress Monitoring
  10. Premium (Payment guide for UGX via Mobile Money)
  11. About & Sustainability Mission
  12. Contact (Specific details for Kampala office)

## Non-Goals
- Real-time AI processing (AgroScan/GreenLens will use mocked logic/simulations).
- Live payment gateway integration (The request specifies a manual USSD step-by-step guide).
- Server-side database (State will be managed via `localStorage` for this session).

## Assumptions
- The app will use a dashboard/tab-based navigation to manage the 12 features.
- "Sign Connect" will use SVG/Lottie animations or placeholder video components to represent "animations".
- "AgroScan" and "GreenLens" will use camera/file upload placeholders.

## Affected Areas
- **Frontend:**
  - `src/App.tsx`: Main router and navigation.
  - `src/components/features/*`: Individual feature components.
  - `src/components/layout/*`: Sidebar/Navigation for the 12 features.
  - `src/hooks/use-premium.ts`: Local state for premium access.
  - `src/hooks/use-progress.ts`: Progress tracking logic.

## Phases

### Phase 1: Foundation & Navigation
- Setup routing using a central layout (Sidebar or Bottom Nav).
- Create the 12 feature shell components.
- Implement the "About" and "Contact" pages (Feature 11 & 12).
- **Owner:** `frontend_engineer`

### Phase 2: Core Utility Features (9 & 10)
- **Settings & Progress:** Create a dashboard to track "Environmental Impact" or "Skills Learned".
- **Premium:** Build the payment instructions page with the specific merchant code (02957661) and USSD steps.
- **Owner:** `frontend_engineer`

### Phase 3: Agricultural & Environmental Features (1, 3, 4, 6)
- **Farmers Market:** Marketplace UI with listings and "Direct Message" buttons.
- **Trash2Cash:** Form for uploading recyclables.
- **AI Mocks (AgroScan & GreenLens):** Photo upload interface with simulated "Scanning" state and result cards.
- **Owner:** `frontend_engineer`

### Phase 4: Social & Education Features (2, 5, 7, 8)
- **Youth Skills Hub:** Resource library and mentor directory.
- **Sign Connect:** Speech-to-Text simulation and animation placeholders.
- **First Aid Hero:** Searchable list of emergencies with step-by-step UI.
- **Project Verse:** Invention submission form and "Teammate Finder" feed.
- **Owner:** `frontend_engineer`

### Phase 5: Polishing & Local Persistence
- Implement `localStorage` to save "Progress", "Projects", and "Premium Status".
- Ensure the "Direct Message" space in Feature 11 works as a local feedback form.
- **Owner:** `frontend_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Implementation of the 12-feature architecture and UI.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4, 5
- **Scope:** Build the entire AFRINOVA platform. Use a clean, modern UI (Tailwind + Shadcn). 
- **Navigation:** Use a `Sidebar` for desktop and `Drawer` for mobile to accommodate 12 links.
- **Data:** Use `localStorage` for all persistence (Progress, Settings, Projects).
- **Specifics:** 
    - Premium page must use the exact code `02957661` and USSD `*185*3#`.
    - Contact page must use `chainstoreign@gmail.com` and `0752893166`.
    - AI features (AgroScan/GreenLens) should use a timer-based simulation to "analyze" an uploaded image.
- **Files:** `src/App.tsx`, `src/components/`, `src/hooks/`.
- **Depends on:** none
- **Acceptance criteria:** All 12 features are accessible from the navigation; Premium page displays correct payment instructions; AgroScan shows simulated results.

**Do not dispatch:**
- supabase_engineer (No database required).
- quick_fix_engineer (Frontend engineer will handle initial build).
