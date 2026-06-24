import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface QuantityStepperProps {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  /** Whether `-` may drop below `min` (e.g. to remove a cart line). */
  allowBelowMin?: boolean
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Reusable quantity control: `-` / `+` buttons plus a typeable input, so users
 * can jump to an exact amount instead of clicking one at a time (requirement #5).
 */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  allowBelowMin = false,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const clamp = (n: number) => {
    let next = Number.isFinite(n) ? Math.floor(n) : min
    if (!allowBelowMin && next < min) next = min
    if (max !== undefined && next > max) next = max
    return next
  }

  const dec = () => onChange(clamp(value - 1))
  const inc = () => onChange(clamp(value + 1))

  const dim = size === 'sm' ? 'size-7' : 'size-9'
  const inputW = size === 'sm' ? 'w-10' : 'w-14'

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={dim}
        onClick={dec}
        disabled={!allowBelowMin && value <= min}
        aria-label="減少數量"
      >
        <Minus className="size-4" />
      </Button>
      <Input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        className={cn(inputW, 'h-9 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none', size === 'sm' && 'h-7')}
        aria-label="數量"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={dim}
        onClick={inc}
        disabled={max !== undefined && value >= max}
        aria-label="增加數量"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  )
}
