import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { CatmullRomCurve3, MathUtils, Vector3 } from 'three'
import { journeyStops } from '@/config/journey'
import { scrollState } from '@/state/scrollState'

const position = new Vector3()
const target = new Vector3()

// Flies the camera along a smooth curve through every journey stop.
export function CameraRig() {
  const width = useThree((s) => s.size.width)

  const { positionCurve, targetCurve } = useMemo(
    () => ({
      positionCurve: new CatmullRomCurve3(
        journeyStops.map((s) => new Vector3(...s.camera)),
        false,
        'centripetal',
      ),
      targetCurve: new CatmullRomCurve3(
        journeyStops.map((s) => new Vector3(...s.target)),
        false,
        'centripetal',
      ),
    }),
    [],
  )

  const parallax = useMemo(() => ({ x: 0, y: 0 }), [])

  useFrame((state, delta) => {
    const p = MathUtils.clamp(scrollState.current, 0, 1)
    positionCurve.getPoint(p, position)
    targetCurve.getPoint(p, target)

    parallax.x = MathUtils.damp(parallax.x, state.pointer.x * 0.25, 3, delta)
    parallax.y = MathUtils.damp(parallax.y, state.pointer.y * 0.15, 3, delta)

    state.camera.position.set(position.x + parallax.x, position.y + parallax.y, position.z)
    state.camera.lookAt(target)
  })

  return (
    <PerspectiveCamera
      makeDefault
      fov={width < 768 ? 42 : 32}
      near={0.1}
      far={400}
      position={[0, 0.4, 3.4]}
    />
  )
}
