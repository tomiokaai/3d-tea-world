# 3D Tea World

Premium 3D tea e-commerce — cinematic, Three.js/React, Richard Tea ilhomlantirgan, lekin original dizayn va UX.

## Phase 1 (shu commit)

- Vite + React + TypeScript + `@react-three/fiber`/`drei` skeleton
- Design tokens: `src/styles/tokens.css` — tea-ink/liquor/leaf/gold/parchment/clay palette, Fraunces (display, italic) + Inter (body)
- Reusable `Product` schema: `src/types/product.ts`
- Reusable packaging system: `src/three/TeaBox.tsx` — bitta geometry, material/label per mahsulot almashadi; keyinchalik `product.model` GLB bilan almashtiriladi (Blender export)
- Camera / lighting / loading: `src/three/CameraRig.tsx`, `src/three/Lighting.tsx`, `src/components/LoadingScreen.tsx`
- Hero UI overlay: `src/components/Hero.tsx`
- Mobile lightweight mode asosi: `src/three/Experience.tsx` ichida `dpr`/`shadows`/`antialias` viewport bo'yicha pasayadi

## Run

```bash
npm install
npm run dev
```

## Holat

GitHub / Google Drive / Figma / Notion / Linear / Vercel tekshirildi — bu loyiha uchun ular bo'sh edi, shuning uchun Phase 1 noldan qurildi. Hali GLB/rasm assetlar yo'q (`TeaBox` procedural placeholder geometriya bilan ishlayapti).

## Keyingi fazalar

- **Phase 2** — scroll-driven camera (GSAP ScrollTrigger `CameraRig` ichida), Africa/Plantation/Production sahnalari
- **Phase 3** — 51 ta mahsulot (Notion/Drive'dan), Collection, Product Page, 3D viewer, Cart
- **Phase 4** — responsive/mobile lightweight mode, animatsiyalar, Vercel deploy
- **Phase 5** — polish, performance, QA
