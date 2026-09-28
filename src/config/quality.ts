interface Quality {
  isMobile: boolean
  reducedMotion: boolean
  dpr: number | [number, number]
  shadows: boolean
  antialias: boolean
  terrainSegments: [number, number]
  trees: number
  bushRows: number
  bushesPerRow: number
  particles: number
}

const hasWindow = typeof window !== 'undefined'
const isMobile = hasWindow && window.innerWidth < 768
const reducedMotion = hasWindow && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Desktop gets the full scene; mobile drops to a lightweight tier automatically.
export const quality: Quality = {
  isMobile,
  reducedMotion,
  dpr: isMobile ? 1 : [1, 2],
  shadows: !isMobile,
  antialias: !isMobile,
  terrainSegments: isMobile ? [32, 22] : [64, 44],
  trees: isMobile ? 5 : 10,
  bushRows: isMobile ? 8 : 14,
  bushesPerRow: isMobile ? 14 : 30,
  particles: isMobile ? 120 : 400,
}
