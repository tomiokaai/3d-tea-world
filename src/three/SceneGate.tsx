import { useMemo, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Fog, Vector3, type Group } from 'three'
import type { Vec3 } from '@/config/journey'

interface SceneGateProps {
  center: Vec3
  extent: number // bounding radius of the scene
  children: ReactNode
}

// Hides a scene while all of it is beyond the fog far plane, so it costs no draw calls.
export function SceneGate({ center, extent, children }: SceneGateProps) {
  const ref = useRef<Group>(null)
  const anchor = useMemo(() => new Vector3(...center), [center])

  useFrame(({ camera, scene }) => {
    if (!ref.current) return
    const far = scene.fog instanceof Fog ? scene.fog.far : Infinity
    ref.current.visible = camera.position.distanceTo(anchor) - extent < far
  })

  return <group ref={ref}>{children}</group>
}
