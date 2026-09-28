import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { Vec3 } from '@/config/journey'

const BOX_COUNT = 4
const SPAN = 4.4

function MiniBox() {
  return (
    <group>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.3]} />
        <meshStandardMaterial color="#2e2013" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.42, 0.151]}>
        <planeGeometry args={[0.38, 0.3]} />
        <meshStandardMaterial color="#c89b3c" roughness={0.4} />
      </mesh>
    </group>
  )
}

// Conveyor carrying finished boxes in a loop.
export function PackagingStation({ position }: { position: Vec3 }) {
  const belt = useRef<Group>(null)

  useFrame((_, delta) => {
    belt.current?.children.forEach((box) => {
      box.position.x += delta * 0.5
      if (box.position.x > SPAN / 2) box.position.x -= SPAN
    })
  })

  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[SPAN + 0.4, 0.5, 1.1]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[SPAN + 0.4, 0.06, 1]} />
        <meshStandardMaterial color="#181818" roughness={0.9} />
      </mesh>

      <group ref={belt} position={[0, 0.75, 0]}>
        {Array.from({ length: BOX_COUNT }, (_, i) => (
          <group key={i} position={[-SPAN / 2 + (i * SPAN) / BOX_COUNT, 0, 0]}>
            <MiniBox />
          </group>
        ))}
      </group>
    </group>
  )
}
