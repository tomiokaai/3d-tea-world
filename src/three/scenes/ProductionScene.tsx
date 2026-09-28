import { WORLD } from '@/config/journey'
import { DryingStation } from './production/DryingStation'
import { PackagingStation } from './production/PackagingStation'
import { ProcessingStation } from './production/ProcessingStation'

// Three stations side by side; the camera slides along them (see journey stops).
export function ProductionScene() {
  return (
    <group position={WORLD.production}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 5]}>
        <planeGeometry args={[40, 22]} />
        <meshStandardMaterial color="#2a1d12" roughness={0.9} />
      </mesh>
      <mesh position={[0, 4, -6]}>
        <planeGeometry args={[40, 8]} />
        <meshStandardMaterial color="#3a2a1c" roughness={1} />
      </mesh>

      <pointLight position={[0, 4.5, 4]} intensity={60} distance={26} color="#ffc27a" />

      <ProcessingStation position={[-6, 0, 0]} />
      <DryingStation position={[0, 0, 0]} />
      <PackagingStation position={[6, 0, 0]} />
    </group>
  )
}
