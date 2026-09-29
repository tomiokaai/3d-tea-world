import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '@/data/products'
import { ProductViewer3D } from '@/components/ProductViewer3D'
import { useCartStore } from '@/state/useCartStore'
import { formatBrewingTime, formatPrice } from '@/utils/format'

export function ProductPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const addToCart = useCartStore((s) => s.add)
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="product-page product-page--missing">
        <p>That tea isn't in the collection yet.</p>
        <Link to="/collection">Back to Collection</Link>
      </div>
    )
  }

  return (
    <div className="product-page">
      <ProductViewer3D product={product} />

      <div className="product-page__info">
        <span className="product-card__category">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="product-page__description">{product.description}</p>

        <dl className="product-page__facts">
          <div>
            <dt>Origin</dt>
            <dd>{product.origin}</dd>
          </div>
          <div>
            <dt>Brewing time</dt>
            <dd>{formatBrewingTime(product.brewingTime)}</dd>
          </div>
          <div>
            <dt>Ingredients</dt>
            <dd>{product.ingredients.join(', ')}</dd>
          </div>
        </dl>

        <div className="product-page__buy">
          <div className="product-page__qty">
            <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))}>
              −
            </button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((n) => n + 1)}>
              +
            </button>
          </div>
          <span className="product-page__price">{formatPrice(product.price * qty)}</span>
          <button
            type="button"
            className="product-page__add"
            onClick={() => addToCart(product.id, qty)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
