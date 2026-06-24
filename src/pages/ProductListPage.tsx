import { useMemo, useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchBox } from '@/components/SearchBox'
import { ProductGrid } from '@/components/ProductGrid'

export function ProductListPage() {
  const { products, isLoading, error } = useProducts()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 250)

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) => p.name.toLowerCase().includes(q))
  }, [products, debouncedQuery])

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 max-w-md">
        <SearchBox value={query} onChange={setQuery} />
      </div>

      {error ? (
        <p className="py-16 text-center text-destructive">{error}</p>
      ) : (
        <ProductGrid products={filtered} isLoading={isLoading} />
      )}
    </main>
  )
}
