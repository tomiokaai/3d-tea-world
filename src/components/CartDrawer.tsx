import { useCartStore } from '@/state/useCartStore'
import { products } from '@/data/products'
import { formatPrice } from '@/utils/format'

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const close = useCartStore((s) => s.close)
  const lines = useCartStore((s) => s.lines)
  const setQty = useCartStore((s) => s.setQty)

  const rows = lines
    .map((line) => ({ line, product: products.find((p) => p.id === line.productId) }))
    .filter((r) => r.product)

  const total = rows.reduce((sum, r) => sum + r.product!.price * r.line.qty, 0)

  return (
    <>
      <div className="cart-scrim" data-open={isOpen} onClick={close} aria-hidden="true" />
      <aside className="cart-drawer" data-open={isOpen} aria-hidden={!isOpen}>
        <div className="cart-drawer__head">
          <h2>Cart</h2>
          <button type="button" onClick={close} aria-label="Close cart">
            ×
          </button>
        </div>

        {rows.length === 0 && <p className="cart-drawer__empty">Your cart is empty.</p>}

        <ul className="cart-drawer__lines">
          {rows.map(({ line, product }) => (
            <li key={line.productId} className="cart-line">
              <div>
                <p className="cart-line__name">{product!.name}</p>
                <p className="cart-line__price">{formatPrice(product!.price)}</p>
              </div>
              <div className="cart-line__qty">
                <button type="button" onClick={() => setQty(line.productId, line.qty - 1)}>
                  −
                </button>
                <span>{line.qty}</span>
                <button type="button" onClick={() => setQty(line.productId, line.qty + 1)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>

        {rows.length > 0 && (
          <div className="cart-drawer__foot">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        )}
      </aside>
    </>
  )
}
