import { Link } from 'react-router-dom'
import { useCartStore } from '@/state/useCartStore'

export function Nav() {
  const count = useCartStore((s) => s.count())
  const toggleCart = useCartStore((s) => s.toggle)

  return (
    <header className="nav">
      <Link to="/" className="nav__mark">
        3D Tea World
      </Link>
      <nav className="nav__links">
        <Link to="/collection">Collection</Link>
      </nav>
      <button type="button" className="nav__cart" onClick={toggleCart} aria-label="Open cart">
        Cart
        {count > 0 && <span className="nav__cart-count">{count}</span>}
      </button>
    </header>
  )
}
