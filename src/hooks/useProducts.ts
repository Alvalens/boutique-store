import { useEffect, useState } from 'react'
import type { Product } from '@/types/product'
import { loadProducts } from '@/lib/products'

interface UseProductsResult {
  products: Product[]
  isLoading: boolean
  error: string | null
}

/** Load the product catalog with loading and error state (fixes prototype's missing error handling). */
export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    setError(null)

    loadProducts()
      .then((data) => {
        if (active) setProducts(data)
      })
      .catch(() => {
        if (active) setError('商品載入失敗，請稍後再試。')
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { products, isLoading, error }
}
