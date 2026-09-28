import { useMemo } from 'react'
import { WORLD } from '@/config/journey'
import { quality } from '@/config/quality'
import { InstancedItems, type InstanceItem } from '../utils/InstancedItems'
import { mulberry32 } from '../utils/random'

const BUSH_COLORS = ['#3f6b3a', '#4a7a42', '#365f33']

export function PlantationScene() {
  // Tea rows on both sides of a central aisle; the camera flies down the aisle.
  const bushes = useMemo(() => {
    const rand = mulberry32(3)
    const perSide = quality.bushRows / 2
    const items: InstanceItem[] = []

    for (const side of [-1, 1]) {
      for (let r = 0; r < perSide; r++) {
        for (let i = 0; i < quality.bushesPerRow; i++) {
          const s = 0.9 + rand() * 0.3
          items.push({
            position: [
              side * (2.6 + r * 2) + (rand() - 0.5) * 0.25,
              0.35 * s,
              -28 + i * (56 / (quality.bushesPerRow - 1)) + (rand() - 0.5) * 0.3,
            ],
            scale: [1.15 * s, 0.75 * s, 1.05 * s],
            color: BUSH_COLORS[Math.floor(rand() * BUSH_COLORS.length)],
          })
        }
      }
    }
    return items
  }, [])

  const hills = useMemo(() => {
    const rand = mulberry32(11)
    const items: InstanceItem[] = []
    for (let i = 0; i < 5; i++) {
      items.push({
        position: [-40 + i * 20 + (rand() - 0.5) * 6, 0, -38 - rand() * 4],
        scale: [16, 7 + rand() * 3, 10],
      })
    }
    return items
  }, [])

  return (
    <group position={WORLD.plantation}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[44, 64]} />
        <meshStandardMaterial color="#2d4a2a" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[3, 64]} />
        <meshStandardMaterial color="#5a4632" roughness={1} />
      </mesh>

      <InstancedItems items={bushes}>
        <sphereGeometry args={[0.55, 8, 6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </InstancedItems>

      <InstancedItems items={hills}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial color="#1b2f22" roughness={1} />
      </InstancedItems>
    </group>
  )
}
