import type { Product } from '@/types/product'
import { ProductCard } from '@/components/ProductCard'
import { Skeleton } from '@/components/ui/skeleton'

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
}

const GRID = 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={GRID}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-lg border p-4">
            <Skeleton className="h-44 w-full rounded-md" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">找不到符合的商品</p>
    )
  }

  return (
    <div className={GRID}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
