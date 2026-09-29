import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { TeaBox, type Hotspot } from '@/three/TeaBox'
import type { Product } from '@/types/product'
import { quality } from '@/config/quality'

const HOTSPOTS: Hotspot[] = [
  {
    position: [0, 0.15, 0.31],
    label: 'Label',
    note: 'Origin, ingredients and brewing time, printed on every box.',
  },
  { position: [0, 0.76, 0], label: 'Seal', note: 'Sealed straight off the drying rack to keep the aroma in.' },
  { position: [0.56, 0, 0], label: 'Leaf', note: 'Whole-leaf tea, not dust or fannings.' },
]

export function ProductViewer3D({ product }: { product: Product }) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  return (
    <div className="product-viewer">
      <Canvas
        shadows={quality.shadows}
        dpr={quality.dpr}
        gl={{ antialias: quality.antialias }}
        camera={{ position: [0, 0.3, 3], fov: 32 }}
      >
        <color attach="background" args={['#14231c']} />
        <ambientLight intensity={0.4} color="#efe7d8" />
        <directionalLight position={[4, 6, 4]} intensity={1.4} color="#c89b3c" castShadow />
        <Suspense fallback={null}>
          <TeaBox
            product={product}
            autoRotate={false}
            hotspots={HOTSPOTS}
            activeHotspot={activeHotspot}
            onHotspot={setActiveHotspot}
          />
          {!quality.isMobile && (
            <ContactShadows position={[0, -0.78, 0]} opacity={0.5} scale={4} blur={2.4} far={2} />
          )}
          <Environment preset="apartment" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={1.8}
          maxDistance={4.5}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>
      <span className="product-viewer__hint">Drag to rotate · scroll to zoom · tap the dots</span>
    </div>
  )
}
