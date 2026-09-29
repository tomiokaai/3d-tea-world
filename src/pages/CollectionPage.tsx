import { useMemo, useState } from 'react'
import { products } from '@/data/products'
import { ProductCard3D } from '@/components/ProductCard3D'

export function CollectionPage() {
  const [category, setCategory] = useState<string>('All')
  const [query, setQuery] = useState('')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((p) => p.category)))],
    [],
  )

  const filtered = products.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div className="collection">
      <header className="collection__head">
        <h1>Collection</h1>
        <input
          className="collection__search"
          type="search"
          placeholder="Search tea"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      <div className="collection__filters">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className="collection__filter"
            data-active={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="collection__grid">
        {filtered.map((product) => (
          <ProductCard3D key={product.id} product={product} />
        ))}
        {filtered.length === 0 && <p className="collection__empty">No teas match your search.</p>}
      </div>
    </div>
  )
}
