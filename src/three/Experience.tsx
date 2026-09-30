import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment } from '@react-three/drei'
import { WORLD } from '@/config/journey'
import { quality } from '@/config/quality'
import { products } from '@/data/products'
import { useAppStore } from '@/state/useAppStore'
import { Atmosphere } from './Atmosphere'
import { CameraRig } from './CameraRig'
import { Lighting } from './Lighting'
import { SceneGate } from './SceneGate'
import { ScrollDriver } from './ScrollDriver'
import { TeaBox } from './TeaBox'
import { AfricaScene } from './scenes/AfricaScene'
import { BrewScene } from './scenes/BrewScene'
import { PlantationScene } from './scenes/PlantationScene'
import { ProductionScene } from './scenes/ProductionScene'
import { TeaLeafScene } from './scenes/TeaLeafScene'

const HERO_ORIGIN: [number, number, number] = [0, 0, 0]

export function Experience() {
  const setAssetsReady = useAppStore((s) => s.setAssetsReady)

  return (
    <Canvas
      className="app-canvas"
      shadows={quality.shadows}
      dpr={quality.dpr}
      gl={{ antialias: quality.antialias, powerPreference: 'high-performance' }}
      onCreated={() => setAssetsReady(true)}
    >
      <color attach="background" args={['#14231c']} />
      <fog attach="fog" args={['#14231c', 4, 9]} />

      <ScrollDriver />
      <CameraRig />
      <Atmosphere />
      <Lighting />

      <Suspense fallback={null}>
        <SceneGate center={HERO_ORIGIN} extent={3}>
          <TeaBox product={products[0]} />
          {!quality.isMobile && (
            <ContactShadows position={[0, -0.78, 0]} opacity={0.5} scale={5} blur={2.5} far={2} />
          )}
        </SceneGate>

        <SceneGate center={WORLD.africa} extent={65}>
          <AfricaScene />
        </SceneGate>
        <SceneGate center={WORLD.plantation} extent={45}>
          <PlantationScene />
        </SceneGate>
        <SceneGate center={WORLD.leaf} extent={10}>
          <TeaLeafScene />
        </SceneGate>
        <SceneGate center={WORLD.production} extent={25}>
          <ProductionScene />
        </SceneGate>
        <SceneGate center={WORLD.brew} extent={9}>
          <BrewScene />
        </SceneGate>
        <SceneGate center={WORLD.finale} extent={3}>
          <group position={WORLD.finale}>
            <TeaBox product={products[1]} />
          </group>
        </SceneGate>

        <Environment preset="apartment" />
      </Suspense>
    </Canvas>
  )
}
