import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import type { Group } from 'three'
import type { Product } from '@/types/product'
import type { Vec3 } from '@/config/journey'

export interface Hotspot {
  position: Vec3
  label: string
  note: string
}

interface TeaBoxProps {
  product: Product
  accentColor?: string
  autoRotate?: boolean
  hotspots?: Hotspot[]
  activeHotspot?: string | null
  onHotspot?: (label: string | null) => void
}

// Reusable packaging: one box geometry, material + label swapped per product.
// Swap the box mesh for a real GLB via useGLTF(product.model) once assets
// land in Drive/Blender — the group/name contract below stays the same.
export function TeaBox({
  product,
  accentColor = '#c89b3c',
  autoRotate = true,
  hotspots,
  activeHotspot,
  onHotspot,
}: TeaBoxProps) {
  const group = useRef<Group>(null)

  useFrame((_, delta) => {
    if (autoRotate && group.current) group.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={group} name={product.id}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.1, 1.5, 0.55]} />
        <meshStandardMaterial color="#2e2013" roughness={0.55} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.15, 0.276]}>
        <planeGeometry args={[0.85, 0.6]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} />
      </mesh>

      {hotspots?.map((spot) => (
        <group key={spot.label} position={spot.position}>
          <mesh
            onClick={(e) => {
              e.stopPropagation()
              onHotspot?.(activeHotspot === spot.label ? null : spot.label)
            }}
          >
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#efe7d8" toneMapped={false} />
          </mesh>
          {activeHotspot === spot.label && (
            <Html distanceFactor={4} center>
              <div className="hotspot-note">
                <strong>{spot.label}</strong>
                <span>{spot.note}</span>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}
