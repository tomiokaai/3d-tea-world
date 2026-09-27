import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment } from '@react-three/drei'
import { CameraRig } from './CameraRig'
import { Lighting } from './Lighting'
import { TeaBox } from './TeaBox'
import { products } from '@/data/products'
import { useAppStore } from '@/state/useAppStore'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

export function Experience() {
  const setAssetsReady = useAppStore((s) => s.setAssetsReady)

  return (
    <Canvas
      className="app-canvas"
      shadows={!isMobile}
      dpr={isMobile ? 1 : [1, 2]}
      gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
      onCreated={() => setAssetsReady(true)}
    >
      <color attach="background" args={['#14231c']} />
      <fog attach="fog" args={['#14231c', 4, 9]} />
      <CameraRig />
      <Lighting />
      <Suspense fallback={null}>
        <TeaBox product={products[0]} />
        {!isMobile && (
          <ContactShadows position={[0, -0.78, 0]} opacity={0.5} scale={5} blur={2.5} far={2} />
        )}
        <Environment preset="apartment" />
      </Suspense>
    </Canvas>
  )
}
