import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { DoubleSide, type Group } from 'three'
import { WORLD } from '@/config/journey'
import { quality } from '@/config/quality'

// A cup, a steeping bag and rising steam — ambient, not clocked to the scroll.
export function BrewScene() {
  const bag = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!bag.current) return
    bag.current.position.y = 0.72 + Math.sin(clock.elapsedTime * 0.8) * 0.03
    bag.current.rotation.z = Math.sin(clock.elapsedTime * 0.6) * 0.08
  })

  return (
    <group position={WORLD.brew}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#3a2a1c" roughness={1} />
      </mesh>

      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.06, 32]} />
        <meshStandardMaterial color="#5a4632" roughness={0.8} />
      </mesh>

      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.34, 0.28, 0.5, 32, 1, true]} />
        <meshStandardMaterial color="#efe7d8" roughness={0.35} side={DoubleSide} />
      </mesh>
      <mesh position={[0, 0.44, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.02, 32]} />
        <meshStandardMaterial color="#efe7d8" roughness={0.35} />
      </mesh>

      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.02, 32]} />
        <meshStandardMaterial color="#7a4a1e" roughness={0.15} metalness={0.05} />
      </mesh>

      <group ref={bag} position={[0, 0.72, 0]}>
        <mesh>
          <boxGeometry args={[0.16, 0.22, 0.03]} />
          <meshStandardMaterial color="#efe7d8" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.42, 4]} />
          <meshStandardMaterial color="#c89b3c" roughness={0.8} />
        </mesh>
      </group>

      <pointLight position={[0, 2, 1]} intensity={12} distance={8} color="#ffc27a" />

      <Sparkles
        count={quality.isMobile ? 30 : 90}
        scale={[0.6, 1.6, 0.6]}
        position={[0, 1.3, 0]}
        size={2.5}
        speed={0.35}
        opacity={0.55}
        color="#efe7d8"
      />
    </group>
  )
}
