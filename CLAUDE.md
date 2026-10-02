# famima — Family Mart mini-experiences collection

> Parent context: `../CLAUDE.md` has universal preferences and conventions.

## Memory system
- **At conversation start and after context compaction**, always read `MEMORY.md` and scan relevant memory files before proceeding.
- If you discover something **universal**, note it so Nic can update `Code/CLAUDE.md`.
- If you discover something **project-specific**, update this file only.

## What this is
A monorepo housing 6 Family Mart-themed mini-experiences as subroutes under sakhalteam.github.io/famima/. Landing page is a grid of 6 portal cards. Uses HashRouter for GitHub Pages compatibility.

## Stack
- Vite 8 + React 19 + TypeScript 6 + Tailwind v4 (via `@tailwindcss/vite`)
- React Router 7 (HashRouter) for subroutes
- `base: '/famima/'` in vite.config.ts
- Deployed to sakhalteam.github.io/famima/

## Island integration
- `portal_famima` on island.glb links directly to this site (label: "Family Mart")
- No intermediate zone scene — it's a direct portal
- Note: `pc_family_mart_*` children in island.glb still use old key (won't glow on hover until Nic renames in Blender)

## 6 experiences (subroutes)
1. **Konbini Receipt Generator** (`/konbini-receipt-generator`) — MVP priority — shop + generate receipt
2. **Onigiri Zukan** (`/onigiri-zukan`) — stub — onigiri encyclopedia
3. **Famichiki Clicker** (`/famichiki-clicker`) — stub — incremental frying game
4. **Nakami Toggle** (`/nakami-toggle`) — stub — food cross-section viewer
5. **Iriguchi Chime** (`/iriguchi-chime`) — stub — door chime step sequencer
6. **Bento Builder** (`/bento-builder`) — stub — drag-and-drop bento composer

## Brand note
Fan project, not affiliated with FamilyMart Co., Ltd. Footer disclaimer present.


## How to end your messages — the "For Nic" block (org-wide rule)

Nic has severe ADHD and loses mid-run asides ("by the way...", "one thing to check
before you...") and anything buried in closing prose. **This is not a request to be
less detailed** — keep the full explanation, reasoning and tradeoffs. Just always end
the turn with a landing pad, as the LAST thing in the message:

```
---
**For Nic:**
1. <verb-first action> — <why, one short clause>
2. ❓ <decision only Nic can make> — <option A vs option B>
3. ⏸️ <parked / needs its own session>
```

- Every "by the way" you had this turn lands here, or assume he never read it.
- Numbered not bulleted; verb first; max 5, most important first.
- No recap of what you already did — that's the body's job. This is Nic's list.
- **Don't force it.** Only what Nic actually needs to notice or act on. It's a TL;DR + call to action, not a test of how many todos you can come up with — one real item (or "Nothing — all clear") beats five padded ones.
- Nothing for him? Still write it: `**For Nic:** Nothing — all clear.`

Full spec lives in the universal `~/.claude/CLAUDE.md` (and `Code/CLAUDE.md`).
