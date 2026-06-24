import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useCartStore, selectTotalPrice, selectTotalQuantity } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { formatPrice } from '@/lib/format'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type Phase = 'confirm' | 'processing' | 'done'

const CHECKOUT_DELAY_MS = 1500

export function CheckoutDialog() {
  const totalPrice = useCartStore(selectTotalPrice)
  const totalQuantity = useCartStore(selectTotalQuantity)
  const clear = useCartStore((s) => s.clear)
  const closeCart = useUIStore((s) => s.closeCart)

  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>('confirm')

  const handleOpenChange = (next: boolean) => {
    // Don't allow closing mid-processing.
    if (phase === 'processing') return
    setOpen(next)
    if (!next) setPhase('confirm')
  }

  const handleConfirm = () => {
    setPhase('processing')
    setTimeout(() => {
      clear()
      setPhase('done')
    }, CHECKOUT_DELAY_MS)
  }

  const handleFinish = () => {
    setOpen(false)
    setPhase('confirm')
    closeCart()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            className="w-full bg-brand-accent text-white hover:bg-brand-accent-hover"
          />
        }
      >
        結帳
      </DialogTrigger>
      <DialogContent>
        {phase === 'done' ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-brand-success" />
                結帳成功
              </DialogTitle>
              <DialogDescription>感謝您的購買，我們將盡快為您出貨。</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" onClick={handleFinish} className="w-full">
                完成
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>確認結帳</DialogTitle>
              <DialogDescription>請確認您的訂單內容後送出。</DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-between rounded-md bg-muted px-4 py-3 text-sm">
              <span>共 {totalQuantity} 件商品</span>
              <span className="text-base font-bold text-brand-accent">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={phase === 'processing'}
              >
                取消
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                disabled={phase === 'processing'}
                className="bg-brand-accent text-white hover:bg-brand-accent-hover"
              >
                {phase === 'processing' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    處理中…
                  </>
                ) : (
                  '確認結帳'
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
