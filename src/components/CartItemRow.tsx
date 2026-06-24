import { Trash2 } from 'lucide-react'
import type { CartItem } from '@/types/product'
import { formatPrice } from '@/lib/format'
import { useCartStore } from '@/store/cartStore'
import { QuantityStepper } from '@/components/QuantityStepper'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface CartItemRowProps {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  const setQuantity = useCartStore((s) => s.setQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const { product, quantity } = item

  return (
    <div className="flex items-start gap-3 border-b py-4">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-muted text-2xl">
        {product.image}
      </div>

      <div className="flex-1">
        <div className="text-sm font-medium">{product.name}</div>
        <div className="mb-2 font-bold text-brand-accent">
          {formatPrice(product.price)}
        </div>
        <QuantityStepper
          value={quantity}
          onChange={(next) => setQuantity(product.id, next)}
          size="sm"
        />
      </div>

      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              aria-label={`移除 ${product.name}`}
            />
          }
        >
          <Trash2 className="size-4" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>移除商品</AlertDialogTitle>
            <AlertDialogDescription>
              確定要從購物車移除「{product.name}」嗎？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => removeItem(product.id)}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              移除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
