import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from '@/components/Nav'
import { CartDrawer } from '@/components/CartDrawer'

const JourneyPage = lazy(() =>
  import('@/pages/JourneyPage').then((m) => ({ default: m.JourneyPage })),
)
const CollectionPage = lazy(() =>
  import('@/pages/CollectionPage').then((m) => ({ default: m.CollectionPage })),
)
const ProductPage = lazy(() =>
  import('@/pages/ProductPage').then((m) => ({ default: m.ProductPage })),
)

function RouteFallback() {
  return <div style={{ position: 'fixed', inset: 0, background: 'var(--tea-ink)' }} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<JourneyPage />} />
          <Route
            path="/collection"
            element={
              <>
                <Nav />
                <CollectionPage />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <Nav />
                <ProductPage />
              </>
            }
          />
        </Routes>
      </Suspense>
      <CartDrawer />
    </BrowserRouter>
  )
}
