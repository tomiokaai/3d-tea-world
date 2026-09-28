import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { DoubleSide, ExtrudeGeometry, Shape, type BufferGeometry, type Group } from 'three'
import { WORLD } from '@/config/journey'
import { quality } from '@/config/quality'

interface LeafProps {
  geometry: BufferGeometry
  scale: number
  rotation: [number, number, number]
}

function Leaf({ geometry, scale, rotation }: LeafProps) {
  return (
    <group rotation={rotation} scale={scale}>
      <mesh geometry={geometry} position={[0, 1.25, 0]}>
        <meshStandardMaterial color="#5c8a3e" roughness={0.55} side={DoubleSide} />
      </mesh>
      <mesh position={[0, 1.25, 0.018]}>
        <cylinderGeometry args={[0.012, 0.012, 2.4, 6]} />
        <meshStandardMaterial color="#a8c47a" roughness={0.6} />
      </mesh>
    </group>
  )
}

// "Two leaves and a bud": the classic tea pluck, floating in a dark grove.
export function TeaLeafScene() {
  const cluster = useRef<Group>(null)

  const geometry = useMemo(() => {
    const shape = new Shape()
    shape.moveTo(0, -1.2)
    shape.bezierCurveTo(0.9, -0.6, 0.9, 0.5, 0, 1.3)
    shape.bezierCurveTo(-0.9, 0.5, -0.9, -0.6, 0, -1.2)
    const g = new ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: false, curveSegments: 20 })
    g.center()
    return g
  }, [])

  useFrame(({ clock }) => {
    const group = cluster.current
    if (!group) return
    const t = clock.elapsedTime
    group.rotation.y = Math.sin(t * 0.3) * 0.5
    group.position.y = -1 + Math.sin(t * 0.6) * 0.08
  })

  return (
    <group position={WORLD.leaf}>
      <group ref={cluster} position={[0, -1, 0]}>
        <Leaf geometry={geometry} scale={0.5} rotation={[0.1, 0, 0]} />
        <Leaf geometry={geometry} scale={0.85} rotation={[0.15, 0.4, 0.55]} />
        <Leaf geometry={geometry} scale={0.85} rotation={[0.15, -0.4, -0.55]} />
      </group>

      <pointLight position={[1.5, 1.5, 3]} intensity={8} distance={12} color="#ffd489" />
      <Sparkles
        count={quality.particles}
        scale={[8, 5, 8]}
        size={3}
        speed={0.3}
        color="#c8d97a"
        opacity={0.8}
      />
    </group>
  )
}
