import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCartStore, selectTotalQuantity } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { Button } from '@/components/ui/button'

export function Header() {
  const totalQuantity = useCartStore(selectTotalQuantity)
  const openCart = useUIStore((s) => s.openCart)

  return (
    <header className="sticky top-0 z-30 bg-brand-header text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-xl font-bold sm:text-2xl">
          精品商店
        </Link>

        <Button
          type="button"
          onClick={openCart}
          className="relative bg-brand-accent text-white hover:bg-brand-accent-hover"
          aria-label="開啟購物車"
        >
          <ShoppingCart className="size-4" />
          <span className="hidden sm:inline">購物車</span>
          {totalQuantity > 0 && (
            <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-accent">
              {totalQuantity}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}
