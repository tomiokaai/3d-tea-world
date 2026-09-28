import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { Vec3 } from '@/config/journey'

// Rolling table: two counter-rotating rollers above a bench.
export function ProcessingStation({ position }: { position: Vec3 }) {
  const rollers = useRef<Group>(null)

  useFrame((_, delta) => {
    rollers.current?.children.forEach((roller, i) => {
      roller.rotation.x += delta * (i === 0 ? 1.5 : -1.5)
    })
  })

  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 1, 1.6]} />
        <meshStandardMaterial color="#5a4632" roughness={0.7} />
      </mesh>

      {[-1.3, 1.3].map((x) => (
        <mesh key={x} position={[x, 1.5, 0]}>
          <boxGeometry args={[0.15, 1, 0.9]} />
          <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.5} />
        </mesh>
      ))}

      <group ref={rollers} position={[0, 1.7, 0]}>
        <group position={[0, 0.28, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 2.4, 24]} />
            <meshStandardMaterial color="#8a8f94" metalness={0.85} roughness={0.3} />
          </mesh>
        </group>
        <group position={[0, -0.28, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 2.4, 24]} />
            <meshStandardMaterial color="#8a8f94" metalness={0.85} roughness={0.3} />
          </mesh>
        </group>
      </group>

      <mesh position={[-2.2, 0.25, 0.4]} scale={[1, 0.5, 1]}>
        <sphereGeometry args={[0.5, 8, 6]} />
        <meshStandardMaterial color="#4d7a3a" roughness={1} />
      </mesh>
    </group>
  )
}
