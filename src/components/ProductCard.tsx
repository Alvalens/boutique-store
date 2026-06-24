import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/format'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { QuantityStepper } from '@/components/QuantityStepper'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    addItem(product, qty)
    // Requirement #2: feedback when adding to cart.
    toast.success('已加入購物車', {
      description: `${product.name} × ${qty}`,
    })
    setQty(1)
  }

  return (
    <div className="flex flex-col rounded-lg border bg-card p-4 shadow-sm transition-transform hover:-translate-y-0.5">
      <Link
        to={`/product/${product.id}`}
        className="mb-3 flex h-44 items-center justify-center rounded-md bg-muted text-6xl"
        aria-label={product.name}
      >
        <span>{product.image}</span>
      </Link>

      <Link to={`/product/${product.id}`} className="mb-1 font-bold hover:underline">
        {product.name}
      </Link>
      <div className="mb-4 text-xl font-bold text-brand-accent">
        {formatPrice(product.price)}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <QuantityStepper value={qty} onChange={setQty} size="sm" />
        <Button
          type="button"
          onClick={handleAdd}
          className="w-full bg-brand-success text-white hover:bg-brand-success-hover"
        >
          加入購物車
        </Button>
      </div>
    </div>
  )
}
