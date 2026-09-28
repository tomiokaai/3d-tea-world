import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, Fog, MathUtils } from 'three'
import { journeyStops, stopCursor } from '@/config/journey'
import { scrollState } from '@/state/scrollState'

// Blends background and fog between the sky/fog values of the neighbouring stops.
export function Atmosphere() {
  const skies = useMemo(() => journeyStops.map((s) => new Color(s.sky)), [])
  const blended = useMemo(() => new Color(), [])

  useFrame(({ scene }) => {
    const { i, t } = stopCursor(scrollState.current)
    const from = journeyStops[i]
    const to = journeyStops[i + 1]
    const e = MathUtils.smoothstep(t, 0, 1)

    blended.copy(skies[i]).lerp(skies[i + 1], e)

    if (scene.background instanceof Color) scene.background.copy(blended)
    if (scene.fog instanceof Fog) {
      scene.fog.color.copy(blended)
      scene.fog.near = MathUtils.lerp(from.fogNear, to.fogNear, e)
      scene.fog.far = MathUtils.lerp(from.fogFar, to.fogFar, e)
    }
  })

  return null
}
