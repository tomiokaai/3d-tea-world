import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import type { PerspectiveCamera as ThreePerspectiveCamera } from 'three'
import { PerspectiveCamera } from '@react-three/drei'

// Phase 1: static hero framing. Phase 2 attaches GSAP ScrollTrigger here to
// drive camera.position/lookAt across Africa → Plantation → Production → Box → Cup.
export function CameraRig() {
  const camera = useRef<ThreePerspectiveCamera>(null)
  const { size } = useThree()

  return (
    <PerspectiveCamera
      ref={camera}
      makeDefault
      fov={size.width < 768 ? 42 : 32}
      position={[0, 0.4, 3.4]}
    />
  )
}
