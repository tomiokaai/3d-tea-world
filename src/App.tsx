import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { JourneyPage } from '@/pages/JourneyPage'
import { CollectionPage } from '@/pages/CollectionPage'
import { ProductPage } from '@/pages/ProductPage'
import { Nav } from '@/components/Nav'
import { CartDrawer } from '@/components/CartDrawer'

export default function App() {
  return (
    <BrowserRouter>
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
      <CartDrawer />
    </BrowserRouter>
  )
}
