export interface Product {
  id: string
  name: string
  category: string
  description: string
  ingredients: string[]
  origin: string
  brewingTime: number // seconds
  image: string
  model: string // path to shared packaging GLB, or per-product override
  price: number
  tags: string[]
}

export interface PackagingVariant {
  productId: string
  labelTexture: string
  accentColor?: string
}
