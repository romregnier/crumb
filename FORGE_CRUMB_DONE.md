# Forge — Crumb Fixes Done ✅

**Date:** 2026-02-27

## FIX 1 — Map pins hover (Explore.tsx)
- Added `pointer-events: auto !important` and `position: relative` to marker base styles
- Set `z-index: 10` base, `z-index: 20` on mouseenter, back to `10` on mouseleave
- `transform: scale(1.2)` on hover, `scale(1)` on leave
- Click handler now calls `e.stopPropagation()`
- Popup/card (`selectedCapsule`) z-index bumped from 500 → **1100** (above map)

## FIX 2 — Timeline time-travel scrubber (Timeline.tsx)
- Removed `filterYear` state, `useMemo` filter logic, and the entire date filter UI
- All capsules shown without filtering
- Added vertical `TimeScrubber` component (fixed left side) using Framer Motion:
  - `drag="y"` with `dragConstraints={{ top: -78, bottom: 78 }}` + `dragElastic={0.3}`
  - Spring snap back to center on `onDragEnd` via `thumbY.set(0)`
  - `useTransform` maps thumb position → scroll target
  - Thumb color: violet (future) / white (today) / cyan (past)
  - "Futur ↑" / "Passé ↓" labels; dynamic drag labels appear when offset > 20
- "Aujourd'hui" section highlighted with glowing border
- Auto-scroll to today section on mount via `todayRef`

## Build
`npm run build` — ✅ OK (tsc + vite, no TypeScript errors)
