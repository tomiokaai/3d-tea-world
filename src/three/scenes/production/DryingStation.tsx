import { Sparkles } from '@react-three/drei'
import type { Vec3 } from '@/config/journey'
import { quality } from '@/config/quality'

const SHELVES = [0.7, 1.35, 2, 2.65]

// Drying rack: four shelves of leaf trays with warm rising motes.
export function DryingStation({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {[-1.4, 1.4].flatMap((x) =>
        [-0.7, 0.7].map((z) => (
          <mesh key={`${x}:${z}`} position={[x, 1.6, z]}>
            <boxGeometry args={[0.1, 3.2, 0.1]} />
            <meshStandardMaterial color="#5a4632" roughness={0.8} />
          </mesh>
        )),
      )}

      {SHELVES.map((y) => (
        <group key={y} position={[0, y, 0]}>
          <mesh>
            <boxGeometry args={[3, 0.06, 1.6]} />
            <meshStandardMaterial color="#6b5238" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <boxGeometry args={[2.6, 0.08, 1.25]} />
            <meshStandardMaterial color="#6f6a33" roughness={1} />
          </mesh>
        </group>
      ))}

      <Sparkles
        count={quality.isMobile ? 20 : 60}
        scale={[3, 3, 1.6]}
        position={[0, 1.6, 0]}
        size={2}
        speed={0.4}
        color="#ffb35a"
      />
    </group>
  )
}
