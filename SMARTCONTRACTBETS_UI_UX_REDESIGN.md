# SmartContractBets UI/UX Redesign Specification

## Purpose

Redesign the existing SmartContractBets Next.js application into a modern, premium, corporate-grade decentralized sportsbook while preserving the existing Azuro betting functionality and data flows.

This is primarily a **UI/UX refactor**, not a protocol/business-logic rewrite.

The current application is already functional. Do not replace, rewrite, or break Azuro SDK integration, wallet connectivity, odds logic, market selection logic, bet submission, transaction handling, bet history, cashout, network selection, or other working functionality unless a change is required to support the new presentation layer.

The implementation should feel substantially different from the stock Azuro example app and should establish a distinctive SmartContractBets visual identity.

---

# 1. Product Direction

## Product personality

SmartContractBets should feel:

- Modern
- Premium
- Trustworthy
- Corporate
- Financial-grade
- Fast
- Data-rich without being cluttered
- Web3-native without looking experimental
- Sports-focused
- Clear enough for users unfamiliar with on-chain betting

Avoid:

- Casino-style neon overload
- Excessive gradients
- Meme/degen visual language
- Glassmorphism everywhere
- Huge decorative hero sections that push betting markets below the fold
- Random crypto coin imagery
- Overuse of animation
- Overly rounded “toy” UI
- Copying Azuro's current orange/black visual identity
- UI patterns that resemble the default Azuro example application

The desired visual reference point is a combination of a professional sportsbook, a modern financial terminal, and a clean fintech product.

---

# 2. Brand System

## Primary colors

Use the existing SmartContractBets logo colors as the foundation.

```css
--scb-red: #b82020;
--scb-navy: #0f172a;
--scb-white: #ffffff;
```

Do not use the primary red as a full-page background. Red is the brand/action color and should be controlled.

## Recommended extended palette

```css
:root {
  --background: #f5f7fa;
  --surface: #ffffff;
  --surface-secondary: #f8fafc;
  --surface-tertiary: #eef2f6;

  --navy-950: #080d19;
  --navy-900: #0f172a;
  --navy-850: #141e32;
  --navy-800: #1e293b;
  --navy-700: #334155;

  --brand-700: #8f1818;
  --brand-600: #a51c1c;
  --brand-500: #b82020;
  --brand-400: #d03232;
  --brand-100: #fee9e9;
  --brand-50: #fff5f5;

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;
  --text-disabled: #94a3b8;

  --border: #e2e8f0;
  --border-strong: #cbd5e1;

  --success: #15803d;
  --success-bg: #f0fdf4;
  --warning: #b45309;
  --warning-bg: #fffbeb;
  --danger: #b91c1c;
  --danger-bg: #fef2f2;
  --info: #0369a1;
  --info-bg: #f0f9ff;
}
```

## Dark sportsbook surfaces

Use dark navy strategically for:

- Global header
- Desktop sport navigation rail
- Betslip header / active state
- Mobile bottom navigation
- High-value summary components
- Event hero/header areas

Keep the main market-reading area primarily light. This gives SmartContractBets a corporate identity and makes dense odds information easier to scan.

A full dark mode can be added later, but the first redesign should establish a polished light/dark hybrid product instead of reproducing Azuro's predominantly dark theme.

---

# 3. Typography

Use a clean professional sans-serif.

Preferred:

```text
Inter
```

Alternatives:

- Geist
- Manrope
- IBM Plex Sans

Use `next/font`.

Recommended hierarchy:

```text
Display / page title: 28–32px, 700
H1: 24–28px, 700
H2: 20–22px, 650/700
H3: 16–18px, 600
Body: 14–15px, 400/500
Compact UI: 13px
Metadata: 12px
Odds: 14–16px, 650/700, tabular numerals
```

Use:

```css
font-variant-numeric: tabular-nums;
```

for odds, balances, stake amounts, potential payout, and financial values.

Do not use tiny text simply to fit more information.

---

# 4. Shape, Borders and Elevation

This should look professional rather than playful.

Recommended radii:

```text
Small controls: 6px
Buttons: 8px
Cards: 10px
Large containers/modal: 12px
Pills/status badges: full radius only where semantically appropriate
```

Avoid 20–30px rounded cards across the whole interface.

Recommended shadow:

```css
--shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
--shadow-md: 0 4px 14px rgba(15, 23, 42, 0.08);
--shadow-panel: 0 10px 30px rgba(15, 23, 42, 0.10);
```

Prefer thin borders and subtle elevation.

---

# 5. Application Shell

## Desktop structure

Create a true sportsbook application layout.

```text
┌──────────────────────────────────────────────────────────────┐
│ Global Header                                                │
├───────────────┬──────────────────────────────┬───────────────┤
│ Sports /      │ Main Content                 │ Betslip /     │
│ navigation    │                              │ My Bets       │
│ sidebar       │                              │ panel         │
│               │                              │               │
└───────────────┴──────────────────────────────┴───────────────┘
```

Suggested widths:

```text
Sports navigation: 220–250px
Main column: fluid
Betslip: 340–380px
Maximum shell width: 1680px
```

At intermediate desktop/tablet widths, collapse the sport navigation into a horizontal sport bar or drawer before collapsing the betslip.

## Mobile structure

Mobile should be designed independently rather than just stacking desktop components.

```text
Top App Bar
Search / compact sport navigation
Main markets
Sticky bottom nav
Betslip opens as bottom sheet / full-screen sheet
```

Bottom navigation:

- Home / Sports
- Live
- Search
- Betslip with selection-count badge
- My Bets / Account

Do not keep a permanent desktop-style betslip sidebar on mobile.

---

# 6. Global Header

Replace the sparse/default header with a stronger corporate navigation bar.

## Desktop header

Left:

- SmartContractBets logo
- Optional short wordmark

Center / primary navigation:

- Sports
- Live
- My Bets

Optional if already supported:

- Promotions / Free Bets

Right:

- Network selector
- Wallet balance/token indicator when connected
- Connect Wallet button or connected wallet control
- Account/settings dropdown

Header behavior:

- Sticky at top
- Approximately 64px height
- Dark navy background
- White primary text
- Muted slate inactive text
- Thin bottom divider

### Wallet button

Disconnected:

```text
[ Connect Wallet ]
```

Connected:

```text
[ token balance ] [ 0x12...AB34 ▾ ]
```

When wrong network:

```text
[ Switch Network ]
```

Use red for the urgent wrong-network state, but do not use red for ordinary connected state.

---

# 7. Sports Navigation

The current generic/default navigation should become one of the strongest pieces of the product.

## Desktop left rail

Top section:

- Search shortcut
- Live Now with live-event count
- Top Events

Then popular sports, for example when returned by the existing data source:

- Football
- Basketball
- Tennis
- Esports
- MMA
- Ice Hockey
- Baseball
- Rugby
- Cricket
- Table Tennis
- Other

Each row should contain:

```text
[sport icon] Sport name                       [event count]
```

Active sport:

- white/light surface
- dark text
- 3px red left indicator OR subtle brand background
- semibold label

Do not fill the entire active row bright red.

League navigation can expand under the selected sport or appear in the main content area.

## Horizontal secondary sports bar

For tablet and narrower desktop, convert the sports list into horizontally scrollable chips/tabs.

---

# 8. Home Page

The homepage should prioritize betting discovery rather than marketing content.

Recommended order:

1. Compact page heading / contextual banner
2. Search
3. Live events strip if live events exist
4. Top Events
5. Sport/category sections
6. Footer / trust information

## Hero treatment

Do not create a huge landing-page hero.

Instead use a compact sportsbook intro panel such as:

```text
WAGER THE SMART WAY
On-chain sports markets. Transparent settlement.

[ Explore Live ] [ How it works ]
```

Maximum height around 160–220px on desktop.

Use subtle abstract line/network texture, stadium geometry, or data-grid treatment in the background. No crypto coins.

---

# 9. Search UX

Current search is important and should be made easier to use.

Desktop:

- prominent search field near the top of market content
- `⌘/Ctrl + K` shortcut if practical

Placeholder:

```text
Search teams, leagues, competitions…
```

Results grouped by:

- Events
- Teams
- Leagues
- Sports

Search overlay should support:

- keyboard navigation
- loading state
- empty state
- recent searches if locally available
- escape to close

Do not change the underlying search/data implementation unless required.

---

# 10. Live Betting UX

Replace the current “SHOW ONLY LIVE” treatment with a clear segmented/filter control.

Example:

```text
[ All ] [ ● Live 24 ] [ Starting Soon ]
```

Live indicators:

- Small red pulse/dot
- `LIVE` text
- game clock/period/score if supplied by existing data

Avoid excessive blinking.

Use motion only for the dot or very subtle score updates.

Live markets should be easy to distinguish without making the entire card red.

---

# 11. Date and Time Filters

Current filters such as All / Today / Tomorrow / 1h / 3h / 6h should become a deliberate segmented filter row.

Recommended presentation:

```text
All | Live | Today | Tomorrow | Next 1h | 3h | 6h
```

Keep horizontally scrollable on small screens.

Active filter:

- navy background + white text
- or brand red for Live

Avoid multiple unrelated pill styles.

---

# 12. Top Events

Turn Top Events into a premium horizontally scrollable event collection on wide screens and a clean list on smaller devices.

Each card should show:

- sport/league
- live or start-time indicator
- home/away participants
- optional team marks/flags only if reliable assets already exist
- 2–3 primary odds
- '+X markets'
- favorite/star control if supported

Example:

```text
Premier League                         18:30
Arsenal
Chelsea

1       Draw       2
1.92     3.40      4.10

+38 markets
```

Clicking odds adds/removes the selection from betslip using existing logic.

Selected odds must have a distinct selected state.

---

# 13. Event List / Market Cards

This is the core redesign.

## Event card anatomy

Header:

```text
[Football] Premier League                    20:00
```

Body:

```text
Arsenal
Chelsea
```

Primary market:

```text
1                X                2
Arsenal          Draw             Chelsea
1.90             3.45             4.20
```

Footer:

```text
+42 markets                 event details ›
```

## Odds buttons

Odds buttons must be optimized for repeated interaction.

Default:

- light gray/slate surface
- border
- participant/selection label muted
- odds prominent

Hover:

- darker border
- subtle navy tint

Selected:

- brand-red border
- pale red background
- red odds / strong selected indicator

Odds increased:

- temporary subtle green highlight/arrow

Odds decreased:

- temporary subtle red highlight/arrow

Disabled/suspended:

- gray
- lock or dash
- no hover

Never rely on color alone for odds movement or selected state.

---

# 14. Event Detail Page

Create a clear hierarchy.

## Breadcrumb

```text
Football / Premier League / Arsenal vs Chelsea
```

## Event header

Display:

- sport
- competition
- participants
- event start time
- live status and score if applicable
- favorite button if supported

Do not make the header excessively tall.

## Market groups

Market groups should be accordion sections or clearly separated blocks:

```text
Match Result
Double Chance
Total Goals
Both Teams to Score
Asian Handicap
Player/other markets...
```

Provide:

- market search/filter if many markets exist
- expand/collapse controls
- clear market title
- clean odds grid

Preserve the exact markets supplied by Azuro. UI should not fabricate unsupported markets.

---

# 15. Betslip

The betslip should be completely redesigned while retaining the existing selection and betting logic.

## Desktop

Sticky right panel below global header.

Header:

```text
Betslip (3)             My Bets
```

If tabs already exist, retain them but redesign them.

## Empty state

Current empty-state message is functional but visually weak.

Use:

```text
Your betslip is empty
Select odds from any event to add a wager.

[ Browse events ]
```

Use a simple line icon, not a large illustration.

## Selection item

Each selected outcome should show:

- sport/league metadata
- event
- selected market
- selection
- current odds
- odds movement indicator when relevant
- remove action

Separate items with borders instead of individual floating cards unless necessary.

## Stake entry

Stake field must be prominent and numeric.

Include existing min/max calculations when available.

Example:

```text
Stake
[ USDC | 25.00                 ]
Min 1.00                    Max 425.00
```

Optional quick stake controls if they do not conflict with current logic:

```text
+5   +10   +25   +50   Max
```

Do not implement Max with fake logic. It must use the real Azuro-calculated limit/user balance.

## Summary

```text
Total odds             4.82
Stake                 25.00 USDC
Potential payout     120.50 USDC
```

Potential payout should be visually emphasized but not aggressively promotional.

## CTA state model

The main action must communicate the true on-chain workflow.

Possible states include:

```text
Connect Wallet
Switch Network
Enter Stake
Approve USDC
Approving…
Place Bet
Confirm in Wallet
Submitting…
Bet Placed
Bet Failed — Try Again
```

Do not collapse token approval and bet placement into misleading copy.

## Odds changes

When odds change after a selection is added:

- clearly identify the affected selection
- visually show previous/current odds if existing logic exposes it
- explain whether the user needs to accept the update
- never silently obscure a material change

---

# 16. Mobile Betslip

Use a persistent compact bottom trigger:

```text
Betslip • 3                      Potential 120.50 USDC
```

Tapping opens a bottom sheet or full-screen sheet.

On mobile:

- selection list scrolls
- totals and CTA remain sticky near bottom
- respect safe-area insets
- input must not be hidden by mobile keyboard

---

# 17. My Bets

Turn My Bets into a polished transaction/history interface rather than a generic list.

Recommended tabs/filters based on existing supported states:

```text
Active
To Claim / Unredeemed
Settled
Cashed Out
All
```

Only show a tab if the underlying integration can support it reliably.

Each bet card should clearly display:

- date/time
- status
- stake
- odds
- potential/settled payout
- selections
- live badges
- transaction link when already available
- claim/redeem control where supported
- cashout control where supported

Status badges:

```text
Active        blue/navy
Won           green
Lost          neutral/dark or muted red
Canceled      gray
Cashed Out    purple/navy
Claimable     green emphasis
Processing    amber
```

Do not use bright red as the main presentation for a losing bet. Red should primarily communicate destructive/error action.

---

# 18. Cashout UX

If cashout is enabled in the current implementation, surface it cleanly in My Bets.

Example:

```text
Cashout available
Current cashout value: 18.42 USDC

[ Cash Out ]
```

Flow:

1. User selects Cash Out
2. Confirmation sheet/modal displays amount
3. User confirms wallet/signature action when required
4. Processing state
5. Accepted/completed state or clear error

Do not imply that a cashout is guaranteed before the backend/protocol confirms availability.

---

# 19. Wallet and Web3 UX

The redesigned app should make crypto mechanics understandable without forcing users to understand protocol internals.

## Wallet modal

Style wallet connection as part of the SmartContractBets design system rather than a disconnected third-party widget where possible.

Communicate:

```text
Connect your wallet to place and manage on-chain wagers.
```

## Network state

Always clearly show selected/app chain.

Wrong-network banner:

```text
You're connected to the wrong network.
Switch networks to continue betting.
[ Switch Network ]
```

## Balance

Where available, display the actual betting token symbol with balance.

Avoid ambiguous `$0.00` with no token/network context.

## Transaction states

Create a reusable transaction-status component:

- Awaiting wallet confirmation
- Approval pending
- Bet transaction pending
- Confirmed
- Failed
- Rejected by user

Add explorer link when the existing transaction hash is available.

---

# 20. Loading States

Do not use generic full-page spinners for ordinary data fetching.

Create skeletons matching final shapes:

- event-row skeleton
- odds-button skeleton
- sport-nav skeleton
- bet-history skeleton
- betslip calculation skeleton

For transaction actions, use inline progress state and disable duplicate submission.

---

# 21. Empty States

Create deliberate empty states for:

- No events found
- No live events
- No search results
- Empty betslip
- No active bets
- No settled bets
- No claimable bets
- Wallet not connected
- Unsupported/wrong network

Every empty state should have a useful next action when possible.

---

# 22. Error States

Map technical errors to readable UI copy while retaining detailed information where useful.

Examples:

```text
Odds changed. Review your selections before placing the bet.
Insufficient balance for this stake.
Your wallet rejected the transaction.
This market is currently unavailable.
The event has been suspended.
The transaction could not be completed.
```

Do not show raw exception objects to end users.

Provide expandable technical details for debugging only where appropriate.

---

# 23. Toast / Notification System

Use a restrained toast system for:

- selection added
- selection removed
- copied address/hash
- approval successful
- wager submitted
- bet confirmed
- cashout complete
- transaction errors

Do not toast every odds update.

Use max 1–3 visible messages and auto-dismiss noncritical events.

---

# 24. Responsive Rules

## Desktop ≥ 1280px

- left sports rail
- main market content
- sticky right betslip

## Small desktop/tablet 900–1279px

- collapsible left navigation
- main content
- narrower right betslip or drawer depending on usable width

## Tablet 768–899px

- horizontal sport navigation
- full-width markets
- betslip drawer/sheet

## Mobile < 768px

- app header
- horizontal filters
- event cards optimized for touch
- bottom navigation
- betslip bottom sheet/full-screen sheet

Use min touch target around 44px.

Odds buttons may be compact but should remain easily tappable.

---

# 25. Accessibility

Minimum target: WCAG 2.1 AA where reasonably achievable.

Requirements:

- semantic buttons rather than clickable divs
- visible keyboard focus
- logical tab order
- keyboard-accessible dialogs/sheets
- focus trapping in modal/sheet
- Escape closes modal where appropriate
- `aria-live` for meaningful transaction/bet status updates
- accessible names for icon-only buttons
- minimum contrast
- selected states not represented by color alone
- odds movement uses arrows/text/icon + color
- respect `prefers-reduced-motion`
- do not auto-focus in ways that interfere with screen readers/mobile keyboards

---

# 26. Responsible Betting / Trust Layer

Keep the product professional and transparent.

The UI should visibly retain or add appropriate access to:

- 18+ notice
- Play responsibly / responsible betting notice
- Terms & Conditions
- Privacy Policy
- FAQ
- About

Do not use manipulative urgency patterns such as:

- fake countdown timers
- fake scarcity
- “guaranteed win” messaging
- deceptive odds emphasis
- hiding losses/history
- misleading payout claims

If jurisdictional/legal restrictions are already implemented, preserve them.

---

# 27. Footer

Desktop footer should include:

```text
SmartContractBets
Wager the Smart Way

Product
- Sports
- Live
- My Bets

Company
- About
- FAQ

Legal
- Terms & Conditions
- Privacy Policy
- Responsible Betting / 18+

Powered by Azuro
```

Keep it compact. This is an application, not a marketing website.

---

# 28. Design Tokens in Tailwind

The current Azuro example app exposes theme colors, radii, typography and gradients through `tailwind.config.ts`. Replace visual tokens in a controlled way instead of blindly replacing every class.

Suggested Tailwind theme direction:

```ts
colors: {
  brand: {
    50: '#fff5f5',
    100: '#fee9e9',
    400: '#d03232',
    500: '#b82020',
    600: '#a51c1c',
    700: '#8f1818',
  },
  navy: {
    950: '#080d19',
    900: '#0f172a',
    850: '#141e32',
    800: '#1e293b',
    700: '#334155',
  },
  surface: {
    DEFAULT: '#ffffff',
    subtle: '#f8fafc',
    muted: '#eef2f6',
  },
  border: {
    DEFAULT: '#e2e8f0',
    strong: '#cbd5e1',
  },
  success: '#15803d',
  warning: '#b45309',
  danger: '#b91c1c',
}
```

Prefer semantic classes/tokens such as:

```text
bg-surface
bg-surface-subtle
text-foreground
text-muted
border-default
bg-brand-500
text-success
```

rather than scattering raw hex values throughout components.

---

# 29. Component Architecture

Refactor presentation into reusable primitives rather than rewriting protocol hooks.

Suggested design-system components:

```text
Button
IconButton
Badge
Tabs
SegmentedControl
SearchInput
TextField
NumericInput
Select
Popover
Tooltip
Modal
Drawer
BottomSheet
Toast
Skeleton
EmptyState
ErrorState
StatusBadge
TokenAmount
WalletAddress
NetworkBadge
TransactionStatus
```

Sportsbook components:

```text
AppHeader
SportsSidebar
MobileBottomNav
SportsTabs
LeagueHeader
EventCard
EventRow
EventHeader
MarketGroup
MarketGrid
OddsButton
LiveBadge
ScoreDisplay
DateFilter
EventSearch
Betslip
BetslipSelection
StakeInput
BetSummary
BetActionButton
MyBets
BetHistoryCard
CashoutPanel
WalletControl
NetworkGuard
```

Keep protocol/state logic in existing hooks/providers whenever possible.

---

# 30. OddsButton Contract

Create a single standardized OddsButton component used throughout the app.

Suggested props/interface conceptually:

```ts
type OddsButtonProps = {
  label?: string
  odds: number | string
  selected: boolean
  disabled?: boolean
  suspended?: boolean
  movement?: 'up' | 'down' | 'none'
  isLive?: boolean
  onClick: () => void
}
```

Visual states must be deterministic and consistent everywhere.

Do not implement multiple incompatible odds button styles on different pages.

---

# 31. Preserve Azuro Logic

This rule is critical.

Do not break or replace working Azuro behavior.

Preserve existing integration around:

- `AzuroSDKProvider`
- chain/network provider state
- betslip provider/state
- event/market/condition data hooks
- odds calculations
- min/max bet calculations
- token approval
- bet submission
- wallet transactions
- user bet history
- redeem/claim flows
- cashout when enabled
- live data / WebSocket behavior
- affiliate configuration
- transaction hashes/status
- existing routing/deep links

UI components may wrap these behaviors, but the redesign should avoid duplicating protocol state into a second source of truth.

---

# 32. SDK-Version Safety

Before changing components, identify the currently installed versions of:

```text
@azuro-org/sdk
@azuro-org/toolkit
@azuro-org/dictionaries
wagmi
viem
Next.js
React
Tailwind CSS
```

Do not casually upgrade major versions during the UI redesign.

Azuro SDK behavior has changed across recent versions, including outcome state semantics and bet filtering. Keep the redesign compatible with the version installed in this project unless a separate migration is explicitly requested.

---

# 33. Performance

Target a fast sportsbook experience.

Requirements:

- Avoid unnecessary rerenders of every event when one selection changes.
- Memoize expensive repeated market components where useful.
- Virtualize very long lists only if profiling demonstrates a need.
- Keep animations transform/opacity based.
- Avoid large background video.
- Optimize logo and sport icons.
- Use `next/image` for raster images where appropriate.
- Keep above-the-fold UI lightweight.
- Do not delay odds/event rendering for decorative assets.
- Preserve server/client boundaries already required by the existing app.

Performance is more important than visual effects.

---

# 34. Motion

Motion should communicate state, not decorate the interface.

Allowed examples:

- 120–180ms button hover/selection transition
- drawer/bottom-sheet transition
- accordion expand/collapse
- subtle live indicator
- temporary odds movement highlight
- toast entrance/exit
- bet-success check transition

Avoid:

- bouncing odds
- autoplay background animation
- constant glowing borders
- rotating crypto assets
- large parallax effects

---

# 35. Icons

Use one consistent icon system.

Preferred options:

- Lucide React
- existing project icon library if already standardized

Do not mix multiple icon styles.

Sport icons can remain domain-specific assets if they are already in the repository.

Recommended stroke weight: around 1.75–2px.

---

# 36. Page-by-Page Implementation Checklist

## Global

- [ ] Replace Azuro brand colors with SmartContractBets semantic theme tokens
- [ ] Implement updated typography
- [ ] Redesign global header
- [ ] Redesign sports navigation
- [ ] Redesign desktop shell
- [ ] Create responsive mobile shell
- [ ] Create bottom mobile navigation
- [ ] Create consistent loading/error/empty states
- [ ] Apply SmartContractBets logo/wordmark

## Home / sports listing

- [ ] Compact sportsbook hero/context block
- [ ] Improved search
- [ ] Top Events redesign
- [ ] Live filter redesign
- [ ] Date/time segmented controls
- [ ] Modern event cards/rows
- [ ] Standardized odds buttons
- [ ] Selected/disabled/live/odds-movement states

## Event page

- [ ] Breadcrumb
- [ ] Event header
- [ ] Live status/score treatment
- [ ] Market-group redesign
- [ ] Market accordion/filter UX
- [ ] Mobile market layout

## Betslip

- [ ] Desktop sticky panel
- [ ] Mobile sheet
- [ ] Empty state
- [ ] Selection cards/rows
- [ ] Stake input
- [ ] Min/max state
- [ ] Total odds
- [ ] Potential payout
- [ ] Approval state
- [ ] Place-bet state
- [ ] Pending state
- [ ] Success state
- [ ] Error state
- [ ] Odds-change handling

## My Bets

- [ ] Status filters
- [ ] Active bet card
- [ ] Won/lost/canceled state
- [ ] Claimable state
- [ ] Cashout state when enabled
- [ ] Transaction/explorer link
- [ ] Empty states
- [ ] Loading states

## Wallet/network

- [ ] Wallet connected/disconnected design
- [ ] Balance display
- [ ] Network selector
- [ ] Wrong-network guard
- [ ] Transaction status component

## Legal/trust

- [ ] Retain About
- [ ] Retain FAQ
- [ ] Retain Terms
- [ ] Retain Privacy
- [ ] Visible 18+/responsible betting notice
- [ ] Keep Powered by Azuro attribution as required/currently used

---

# 37. Suggested Implementation Order

## Phase 1 — Audit

1. Inspect current project structure.
2. Identify all UI components and all components containing Azuro logic.
3. Identify routes.
4. Record current SDK/toolkit versions.
5. Record all existing app functionality before changing visuals.
6. Do not begin with a dependency upgrade.

## Phase 2 — Design tokens

1. Replace/extend Tailwind colors with SmartContractBets semantic tokens.
2. Standardize typography.
3. Standardize radii, borders and shadows.
4. Add reusable UI primitives.

## Phase 3 — Application shell

1. Header
2. Sports navigation
3. Main content shell
4. Betslip container
5. Mobile bottom nav
6. Responsive breakpoints

## Phase 4 — Betting components

1. OddsButton
2. EventCard/EventRow
3. LiveBadge
4. Filters
5. MarketGroup
6. Event page

## Phase 5 — Betslip and transaction flows

1. Selection presentation
2. Stake
3. Bet calculations
4. Approval state
5. Bet transaction state
6. Success/error
7. Mobile sheet

## Phase 6 — My Bets

1. Filters
2. Active bets
3. Claimable bets
4. Settled bets
5. Cashout UI when available
6. Transaction links

## Phase 7 — Polish

1. Skeletons
2. Empty states
3. Responsive QA
4. Accessibility
5. Motion
6. Performance
7. Cross-browser testing

---

# 38. Agent Rules

The implementation agent must follow these rules.

## Rule 1: Do not rewrite working betting logic

This task is primarily visual and UX-oriented.

## Rule 2: Inspect before modifying

Before editing a component, determine whether it contains protocol hooks, state management, transaction logic, wallet logic, or simple presentation.

## Rule 3: Separate state from appearance

Where a component mixes protocol logic and styling heavily, extract a presentational child component instead of rewriting the hook flow.

## Rule 4: Reuse existing data

Do not add fake scores, balances, limits, statistics, payout numbers, event counts, promotions, or market states.

## Rule 5: No mock data in production UI

Skeletons are acceptable. Fake betting data is not.

## Rule 6: Preserve routes and deep links

A visual redesign should not unnecessarily break URLs.

## Rule 7: Do not remove edge states

Keep suspended markets, loading states, failed transactions, wrong networks, odds changes, canceled bets, and empty states functional.

## Rule 8: Desktop and mobile both count as first-class products

Do not finish desktop and leave mobile as a simple stacked version.

## Rule 9: Avoid unnecessary dependencies

Do not add a large component framework simply to redesign existing Tailwind components.

Use Tailwind + current dependencies unless there is a clear technical need.

## Rule 10: Build must remain clean

After each major stage:

```bash
npm run lint
npm run build
```

Use the project's actual scripts if they differ.

Do not leave TypeScript errors, hydration errors, console errors, or broken wallet interactions.

---

# 39. Acceptance Criteria

The redesign is complete when:

1. The application is immediately recognizable as SmartContractBets rather than an Azuro starter theme.
2. Core colors are based on `#b82020`, `#0f172a`, white, slate neutrals and semantic state colors.
3. The experience looks professional enough for a financial/sports product.
4. Desktop has a strong sportsbook information architecture.
5. Mobile has a purpose-built sportsbook navigation and betslip experience.
6. Event discovery is faster and easier than the existing UI.
7. Odds states are consistent everywhere.
8. The betslip clearly explains stake, odds, potential payout and on-chain transaction stages.
9. Wallet/network state is always understandable.
10. My Bets clearly distinguishes active, claimable, settled and other supported statuses.
11. Loading, empty and failure states look designed rather than accidental.
12. Accessibility and keyboard interactions are preserved/improved.
13. Existing Azuro functionality continues to work.
14. No major SDK upgrade has been mixed into the redesign without explicit approval.
15. `npm run build` succeeds.
16. Mobile, tablet and desktop layouts are QA-tested.
17. There are no obvious remnants of Azuro orange/default styling except Azuro attribution where appropriate.

---

# 40. Recommended Final Visual Direction

The final SmartContractBets interface should use:

- Dark navy global chrome
- White/light-gray market workspace
- Red used deliberately for brand emphasis, live state and primary betting action
- Crisp typography
- Compact professional spacing
- Thin borders
- Data-oriented event layouts
- A highly polished betslip
- Minimal decorative artwork
- Clear wallet/network context
- Strong mobile navigation
- Fast state transitions

Think **premium sportsbook + fintech dashboard**, not **crypto casino**.

The visual design should communicate:

> Transparent, modern, on-chain sports wagering with the usability expected from a mature consumer finance product.

---

# 41. Notes From Current SmartContractBets Review

The current public application currently exposes the essential flow but still reflects the base Azuro information architecture and presentation. The visible interface includes:

- “SHOW ONLY LIVE” control
- Connect wallet
- Event/league search
- Top Events
- All / Today / Tomorrow / 1h / 3h / 6h filters
- Betslip / My Bets
- Empty betslip state
- About
- Terms & Conditions
- Privacy Policy
- FAQ
- Powered by Azuro attribution

These functions should be preserved while their layout, hierarchy, responsiveness, visual treatment and interaction states are redesigned.

---

# 42. Relevant Azuro Architecture Notes

The official Azuro example app is a Next.js application and exposes theme customization through Tailwind configuration. Its current theme defines brand colors, multiple background levels, semantic accent colors, radii, betting-specific gradients and responsive breakpoints.

The SDK provides the real betting state that the redesigned components should continue to consume. Important UX-relevant capabilities include:

- app/wallet chain state and wrong-network detection
- betslip selections
- calculated odds and total odds
- min/max bet calculations
- token allowance/approval state
- bet transaction state
- bet history
- accepted/unredeemed/settled/cashed-out statuses
- win/loss/canceled states
- live betting data
- cashout support when integrated
- freebets when configured

The UI must visually represent these protocol states rather than introducing a disconnected mock state machine.

---

# 43. Sources Reviewed

- SmartContractBets live application: https://app.smartcontractbets.xyz/
- Azuro documentation: https://gem.azuro.org/
- Azuro SDK overview: https://gem.azuro.org/hub/apps/sdk
- Azuro SDK installation: https://gem.azuro.org/hub/apps/sdk/installation
- Azuro SDK setup: https://gem.azuro.org/hub/apps/sdk/setup
- Azuro `useBet`: https://gem.azuro.org/hub/apps/sdk/write-hooks/useBet
- Azuro `useBets`: https://gem.azuro.org/hub/apps/sdk/data-hooks/useBets
- Azuro bet calculation: https://gem.azuro.org/hub/apps/sdk/data-hooks/useBetCalculation
- Azuro cashout guide: https://gem.azuro.org/hub/apps/guides/cashout/use-cashout
- Azuro example app: https://github.com/Azuro-protocol/example-app

---

# 44. Instruction to Coding Agent

**Start by auditing the existing codebase and mapping every existing page/component to this specification. Then implement the redesign incrementally, preserving the current Azuro integration. Do not rebuild the project from scratch. Do not replace working hooks or data flows merely to make components easier to style. Introduce the design system first, then shell/layout, then market components, then betslip/My Bets, and finish with responsive/accessibility/performance QA.**
