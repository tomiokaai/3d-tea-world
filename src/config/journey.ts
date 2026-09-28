export type Vec3 = [number, number, number]

export type StopId =
  | 'hero'
  | 'africa'
  | 'plantation'
  | 'leaf'
  | 'processing'
  | 'drying'
  | 'packaging'
  | 'box'

export interface JourneyStop {
  id: StopId
  label: string
  title: string
  body: string
  camera: Vec3
  target: Vec3
  sky: string
  fogNear: number
  fogFar: number
  side: 'left' | 'right'
}

// Scenes live far apart along -z so fog can hide everything except the active one.
export const WORLD = {
  africa: [0, 0, -80],
  plantation: [0, 0, -140],
  leaf: [0, 0, -200],
  production: [0, 0, -260],
  finale: [0, 0, -320],
} satisfies Record<string, Vec3>

// One entry per scroll stop. Stops are evenly spaced in scroll progress,
// so camera path, atmosphere and captions all read from this single list.
export const journeyStops: JourneyStop[] = [
  {
    id: 'hero',
    label: 'Start',
    title: 'Steeped in origin.',
    body: 'From volcanic highland soil to the cup in your hands — follow one leaf through the world that shapes its character.',
    camera: [0, 0.4, 3.4],
    target: [0, 0, 0],
    sky: '#14231c',
    fogNear: 4,
    fogFar: 9,
    side: 'left',
  },
  {
    id: 'africa',
    label: 'Highlands',
    title: 'Where the leaf begins.',
    body: 'Cool mornings and volcanic soil slow the plant down. Slow growth is what gives highland tea its depth.',
    camera: [0, 14, -36],
    target: [0, 6, -75],
    sky: '#4a3220',
    fogNear: 30,
    fogFar: 140,
    side: 'left',
  },
  {
    id: 'plantation',
    label: 'Plantation',
    title: 'Picked by hand, row by row.',
    body: 'Only the bud and the first two leaves are taken. The rest keeps growing for the next flush.',
    camera: [0, 1.8, -118],
    target: [0, 0.9, -150],
    sky: '#1f3a2a',
    fogNear: 12,
    fogFar: 75,
    side: 'right',
  },
  {
    id: 'leaf',
    label: 'Leaf',
    title: 'Two leaves and a bud.',
    body: 'The smallest part of the plant carries most of the flavor. This is what goes into every box.',
    camera: [0.3, 0.4, -193],
    target: [0, 0, -200],
    sky: '#0f1f18',
    fogNear: 6,
    fogFar: 24,
    side: 'left',
  },
  {
    id: 'processing',
    label: 'Rolling',
    title: 'Withered, then rolled.',
    body: 'Rollers bruise the leaf just enough to release its oils and start oxidation.',
    camera: [-8, 2.6, -250],
    target: [-6, 1.3, -260],
    sky: '#2e2013',
    fogNear: 12,
    fogFar: 70,
    side: 'right',
  },
  {
    id: 'drying',
    label: 'Drying',
    title: 'Dried to stillness.',
    body: 'Warm air locks in the aroma and stops the leaf from changing.',
    camera: [0, 2.6, -250],
    target: [0, 1.4, -260],
    sky: '#2e2013',
    fogNear: 12,
    fogFar: 70,
    side: 'left',
  },
  {
    id: 'packaging',
    label: 'Packaging',
    title: 'Sealed to keep the aroma.',
    body: 'Each box is closed exactly as the leaf left the drying rack.',
    camera: [8, 2.6, -250],
    target: [6, 1, -260],
    sky: '#2e2013',
    fogNear: 12,
    fogFar: 70,
    side: 'right',
  },
  {
    id: 'box',
    label: 'Your box',
    title: 'Now, in your hands.',
    body: 'From highland soil to a box on your shelf.',
    camera: [0, 0.4, -316.6],
    target: [0, 0, -320],
    sky: '#14231c',
    fogNear: 4,
    fogFar: 9,
    side: 'left',
  },
]

// Maps scroll progress (0..1) to the segment between two stops.
export function stopCursor(progress: number) {
  const f = Math.min(Math.max(progress, 0), 1) * (journeyStops.length - 1)
  const i = Math.min(Math.floor(f), journeyStops.length - 2)
  return { i, t: f - i }
}
