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
- `src/three/` — `CameraRig`, `Atmosphere`, `SceneGate`, `ScrollDriver`, `TeaBox` (qayta ishlatiladigan packaging — auto-rotate, hotspot)
- `src/three/scenes/` — `AfricaScene`, `PlantationScene`, `TeaLeafScene`, `ProductionScene` (+ `production/`), `BrewScene`
- `src/pages/` — `JourneyPage`, `CollectionPage`, `ProductPage`, `StoryPage`, `NotFoundPage` — barchasi route darajasida `React.lazy`
- `src/components/` — `Journey`, `JourneyRail`, `Hero`, `BrewTimer`, `Nav`, `CartDrawer`, `ProductCard3D`, `ProductViewer3D`, `LoadingScreen`, `ExperienceBoundary` (har bir 3D canvas atrofida — WebGL xatosi butun sahifani buzmaydi)
- `src/types/product.ts`, `src/data/products.ts` — `Product` schema va katalog

## Holat

- **Phase 1** — scaffold, tokens, `Product` schema, `TeaBox`, camera/lighting, loading screen
- **Phase 2** — scroll-driven camera (GSAP ScrollTrigger), Africa → Plantation → Leaf → Production
- **Phase 3** — routing, Collection, Product page, Cart drawer
- **Phase 4** — Brew sahnasi + timer, `React.lazy` code-splitting, hover/mobile polish. Vercel: GitHub Login Connection kerak — foydalanuvchi o'zi ulaydi
- **Phase 5** — Story/About sahifasi (timeline), `ExperienceBoundary` (har bir 3D canvas uchun), 404 route. Hali ochiq: 51 ta real mahsulot — Notion/Drive'da hamon yo'q, shuning uchun katalog 2 ta seed mahsulot bilan qolmoqda

## Keyingi qadam

Real katalog (51 mahsulot) Notion yoki Drive'ga qo'yilganda, `src/data/products.ts`'ni shu manbadan generatsiya qilish mumkin — `Product` schema va `TeaBox`/`ProductCard3D` tizimi o'zgarishsiz qoladi.
