import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { Product } from '@/types/product'

interface TeaBoxProps {
  product: Product
  accentColor?: string
}

// Reusable packaging: one box geometry, material + label swapped per product.
// Swap the box mesh for a real GLB via useGLTF(product.model) once assets
// land in Drive/Blender — the group/name contract below stays the same.
export function TeaBox({ product, accentColor = '#c89b3c' }: TeaBoxProps) {
  const group = useRef<Group>(null)

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15
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
    </group>
  )
}
