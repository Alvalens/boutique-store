/** A product available in the store. */
export interface Product {
  id: number
  name: string
  price: number
  /** Placeholder visual (emoji) until real images are wired in. */
  image: string
  /** Longer copy shown on the product detail page. */
  description: string
}

/** A line in the shopping cart: a product plus how many of it. */
export interface CartItem {
  product: Product
  quantity: number
}
