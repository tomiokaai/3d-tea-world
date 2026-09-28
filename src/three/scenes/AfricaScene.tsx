import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import {
  BufferAttribute,
  Color,
  MathUtils,
  PlaneGeometry,
  type Mesh,
  type MeshBasicMaterial,
} from 'three'
import { WORLD, journeyStops, type Vec3 } from '@/config/journey'
import { quality } from '@/config/quality'
import { scrollState } from '@/state/scrollState'
import { InstancedItems, type InstanceItem } from '../utils/InstancedItems'
import { mulberry32 } from '../utils/random'

// Rolling highlands with a flat valley down the middle, so the camera can fly over it.
function terrainHeight(x: number, z: number) {
  const hills = Math.sin(x * 0.08) * 2.2 + Math.cos(z * 0.11) * 1.8 + Math.sin((x + z) * 0.05) * 3
  const flank = MathUtils.smoothstep(Math.abs(x), 5, 16)
  return hills * (0.12 + 0.88 * flank)
}

export function AfricaScene() {
  const sun = useRef<Mesh>(null)

  const terrain = useMemo(() => {
    const geometry = new PlaneGeometry(100, 70, quality.terrainSegments[0], quality.terrainSegments[1])
    geometry.rotateX(-Math.PI / 2)

    const position = geometry.attributes.position
    const colors = new Float32Array(position.count * 3)
    const low = new Color('#6b6a3a')
    const high = new Color('#b98a4b')
    const tint = new Color()

    for (let i = 0; i < position.count; i++) {
      const h = terrainHeight(position.getX(i), position.getZ(i))
      position.setY(i, h)
      tint.copy(low).lerp(high, MathUtils.clamp((h + 6) / 12, 0, 1))
      colors[i * 3] = tint.r
      colors[i * 3 + 1] = tint.g
      colors[i * 3 + 2] = tint.b
    }

    geometry.setAttribute('color', new BufferAttribute(colors, 3))
    geometry.computeVertexNormals()
    return geometry
  }, [])

  const { trunks, canopies } = useMemo(() => {
    const rand = mulberry32(7)
    const trunkItems: InstanceItem[] = []
    const canopyItems: InstanceItem[] = []

    for (let i = 0; i < quality.trees; i++) {
      let x = 0
      do {
        x = (rand() - 0.5) * 80
      } while (Math.abs(x) < 8)
      const z = (rand() - 0.5) * 50 - 5
      const y = terrainHeight(x, z)
      const s = 0.8 + rand() * 0.8

      trunkItems.push({ position: [x, y + 1.6 * s, z], scale: s })
      canopyItems.push({
        position: [x, y + 3.4 * s, z],
        scale: [4 * s, 0.8 * s, 4 * s],
        rotationY: rand() * Math.PI,
      })
    }

    return { trunks: trunkItems, canopies: canopyItems }
  }, [])

  const mountains = useMemo(() => {
    const rand = mulberry32(21)
    const items: InstanceItem[] = []
    for (let i = 0; i < 7; i++) {
      items.push({
        position: [-54 + i * 18 + (rand() - 0.5) * 6, 3, -46 - rand() * 6],
        scale: [12 + rand() * 8, 6 + rand() * 5, 12 + rand() * 6],
        rotationY: rand() * Math.PI,
      })
    }
    return items
  }, [])

  // The sun fades in on the way to the highlands and out again before the plantation.
  useFrame(() => {
    const mesh = sun.current
    if (!mesh) return
    const f = scrollState.current * (journeyStops.length - 1)
    const opacity = MathUtils.smoothstep(f, 0.5, 1) * (1 - MathUtils.smoothstep(f, 1.4, 1.9))
    ;(mesh.material as MeshBasicMaterial).opacity = opacity
    mesh.visible = opacity > 0.01
  })

  const sunPosition: Vec3 = [0, 16, -55]

  return (
    <group position={WORLD.africa}>
      <mesh geometry={terrain}>
        <meshStandardMaterial vertexColors flatShading roughness={1} />
      </mesh>

      <InstancedItems items={mountains}>
        <coneGeometry args={[1, 1, 5]} />
        <meshStandardMaterial color="#3b2a1c" flatShading roughness={1} />
      </InstancedItems>

      <InstancedItems items={trunks}>
        <cylinderGeometry args={[0.14, 0.24, 3.2, 6]} />
        <meshStandardMaterial color="#3a2a1c" roughness={1} />
      </InstancedItems>

      <InstancedItems items={canopies}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial color="#5f6b2e" flatShading roughness={1} />
      </InstancedItems>

      <mesh ref={sun} position={sunPosition}>
        <sphereGeometry args={[6, 32, 16]} />
        <meshBasicMaterial color="#ffb35a" transparent opacity={0} fog={false} toneMapped={false} />
      </mesh>

      <Sparkles
        count={quality.particles}
        scale={[60, 10, 40]}
        position={[0, 5, 0]}
        size={4}
        speed={0.2}
        color="#ffd08a"
        opacity={0.7}
      />
    </group>
  )
}
