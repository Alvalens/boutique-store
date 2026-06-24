import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

/** Search input for filtering products (requirement #4). */
export function SearchBox({ value, onChange, className }: SearchBoxProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜尋商品…"
        className="bg-white pl-9 text-foreground"
        aria-label="搜尋商品"
      />
    </div>
  )
}
