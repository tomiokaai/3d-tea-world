import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router-dom'
import { Environment } from '@react-three/drei'
import { TeaBox } from '@/three/TeaBox'
import type { Product } from '@/types/product'
import { formatPrice } from '@/utils/format'

// Mounts its Canvas only once visible, so a 51-product grid stays cheap.
export function ProductCard3D({ product }: { product: Product }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Link to={`/product/${product.id}`} className="product-card" ref={ref}>
      <div className="product-card__stage">
        {visible && (
          <Canvas dpr={1} camera={{ position: [0, 0.2, 2.6], fov: 28 }}>
            <color attach="background" args={['#1c2b22']} />
            <ambientLight intensity={0.5} color="#efe7d8" />
            <directionalLight position={[3, 4, 3]} intensity={1.2} color="#c89b3c" />
            <Suspense fallback={null}>
              <TeaBox product={product} />
              <Environment preset="apartment" />
            </Suspense>
          </Canvas>
        )}
      </div>
      <div className="product-card__info">
        <span className="product-card__category">{product.category}</span>
        <h3>{product.name}</h3>
        <span className="product-card__price">{formatPrice(product.price)}</span>
      </div>
    </Link>
  )
}
