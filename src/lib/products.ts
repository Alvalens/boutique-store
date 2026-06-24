import type { Product } from '@/types/product'
import productsData from '@/data/products.json'

const SIMULATED_DELAY_MS = 1500

/**
 * Load the product catalog. Wraps the local JSON in a simulated async fetch so
 * the UI can exercise real loading/error states (mirrors the prototype's delay).
 */
export function loadProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productsData as Product[]), SIMULATED_DELAY_MS)
  })
}
