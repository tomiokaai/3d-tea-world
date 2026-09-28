import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { quality } from '@/config/quality'
import { scrollState } from '@/state/scrollState'

// Damps raw scroll progress so camera and scenes glide instead of tracking the wheel 1:1.
export function ScrollDriver() {
  useFrame((_, delta) => {
    const lambda = quality.reducedMotion ? 60 : 3.2
    scrollState.current = MathUtils.damp(scrollState.current, scrollState.target, lambda, delta)
  })
  return null
}
