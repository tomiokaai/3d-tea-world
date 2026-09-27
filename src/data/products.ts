import type { Product } from '@/types/product'

// Real catalog (51 items) lands here once Notion/Drive assets are wired up in Phase 3.
// Two seed products keep the reusable geometry/material pipeline testable in Phase 1.
export const products: Product[] = [
  {
    id: 'origin-highland-black',
    name: 'Highland Black',
    category: 'Black Tea',
    description: 'A bold, malty black tea grown on volcanic highland soil.',
    ingredients: ['Black tea leaf'],
    origin: 'East African Highlands',
    brewingTime: 240,
    image: '/products/highland-black.jpg',
    model: '/models/tea-box.glb',
    price: 18,
    tags: ['bestseller', 'bold'],
  },
  {
    id: 'origin-green-mist',
    name: 'Green Mist',
    category: 'Green Tea',
    description: 'A delicate green tea with a soft, grassy finish.',
    ingredients: ['Green tea leaf'],
    origin: 'East African Highlands',
    brewingTime: 120,
    image: '/products/green-mist.jpg',
    model: '/models/tea-box.glb',
    price: 20,
    tags: ['delicate', 'new'],
  },
]
