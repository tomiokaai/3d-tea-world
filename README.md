# 3D Tea World

Premium 3D tea e-commerce — cinematic, Three.js/React, Richard Tea ilhomlantirgan, lekin original dizayn va UX.

## Run

```bash
npm install
npm run dev
```

## Arxitektura

- `src/config/journey.ts` — yagona manba: har bir scroll stop (kamera, target, sky/fog, sarlavha/matn). `WORLD` — sahnalar joylashuvi
- `src/config/quality.ts` — desktop/mobile tier (dpr, shadows, instance soni, particles)
- `src/state/scrollState.ts`, `src/state/useCartStore.ts` — scroll progress va cart (zustand)
- `src/three/` — `CameraRig` (Catmull-Rom yo'l), `Atmosphere` (sky/fog blend), `SceneGate` (fog ortida qolgan sahnani yashiradi), `ScrollDriver`, `TeaBox` (qayta ishlatiladigan packaging — auto-rotate, hotspot qo'llab-quvvatlaydi)
- `src/three/scenes/` — `AfricaScene`, `PlantationScene`, `TeaLeafScene`, `ProductionScene` (+ `production/` stansiyalari)
- `src/pages/` — `JourneyPage` (bosh sahifa: scroll-cinematic), `CollectionPage` (filter/search + lazy-mount 3D kartalar), `ProductPage` (3D viewer, hotspot, savatga qo'shish)
- `src/components/` — `Journey`, `JourneyRail`, `Hero`, `Nav`, `CartDrawer`, `ProductCard3D`, `LoadingScreen`
- `src/types/product.ts`, `src/data/products.ts` — `Product` schema va katalog

Yangi stop qo'shish: `journeyStops`'ga yozuv qo'shing — kamera yo'li, atmosfera va caption avtomatik moslashadi.

## Holat

- **Phase 1** — scaffold, tokens, `Product` schema, `TeaBox`, camera/lighting, loading screen
- **Phase 2** — scroll-driven camera (GSAP ScrollTrigger), Africa → Plantation → Leaf → Production
- **Phase 3** — routing (`/`, `/collection`, `/product/:id`), Collection (filtr/qidiruv, lazy 3D kartalar), Product page (3D viewer, hotspot, miqdor), Cart drawer (zustand). Barcha 3D hozircha procedural placeholder; Blender GLB assetlar keyin ulanadi

## Keyingi fazalar

- **Phase 4** — Tea preparation sahnasi, animatsiyalar, responsive polish, Vercel deploy
- **Phase 5** — 51 ta real mahsulot (Notion/Drive), polish, performance, QA
