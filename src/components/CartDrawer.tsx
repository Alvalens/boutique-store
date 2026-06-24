import { ShoppingCart } from 'lucide-react'
import { useCartStore, selectTotalPrice, selectTotalQuantity } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { formatPrice } from '@/lib/format'
import { CartItemRow } from '@/components/CartItemRow'
import { CheckoutDialog } from '@/components/CheckoutDialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export function CartDrawer() {
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore(selectTotalPrice)
  const totalQuantity = useCartStore(selectTotalQuantity)
  const cartOpen = useUIStore((s) => s.cartOpen)
  const setCartOpen = useUIStore((s) => s.setCartOpen)

  const isEmpty = items.length === 0

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>購物車{totalQuantity > 0 && `（${totalQuantity}）`}</SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
            <ShoppingCart className="size-10" />
            <p>購物車是空的</p>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="px-4">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          </ScrollArea>
        )}

        {!isEmpty && (
          <div className="border-t p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-muted-foreground">總計</span>
              <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <CheckoutDialog />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
