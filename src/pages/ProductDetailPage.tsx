import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useProducts } from '@/hooks/useProducts'
import { formatPrice } from '@/lib/format'
import { useCartStore } from '@/store/cartStore'
import { QuantityStepper } from '@/components/QuantityStepper'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductDetailPage() {
  const { id } = useParams()
  const { products, isLoading, error } = useProducts()
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)

  const product = products.find((p) => p.id === Number(id))

  const handleAdd = () => {
    if (!product) return
    addItem(product, qty)
    toast.success('已加入購物車', { description: `${product.name} × ${qty}` })
    setQty(1)
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <Button
        variant="ghost"
        className="mb-4 -ml-2 text-muted-foreground"
        render={<Link to="/" />}
      >
        <ArrowLeft className="size-4" />
        返回商品列表
      </Button>

      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-7 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      ) : error ? (
        <p className="py-16 text-center text-destructive">{error}</p>
      ) : !product ? (
        <p className="py-16 text-center text-muted-foreground">找不到此商品</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex aspect-square items-center justify-center rounded-lg bg-muted text-[8rem]">
            {product.image}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="text-3xl font-bold text-brand-accent">
              {formatPrice(product.price)}
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantityStepper value={qty} onChange={setQty} />
              <Button
                type="button"
                onClick={handleAdd}
                className="bg-brand-success text-white hover:bg-brand-success-hover sm:flex-1"
              >
                加入購物車
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
