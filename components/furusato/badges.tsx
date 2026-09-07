import { Languages, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Origin } from '@/lib/data'

export function ThemeTag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
      {label}
    </span>
  )
}

export function LanguageBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 px-2 py-0.5 text-[11px] font-medium text-primary">
      <Languages className="h-3 w-3" aria-hidden />
      {label}
    </span>
  )
}

export function OriginLabel({ origin, className }: { origin: Origin; className?: string }) {
  const local = origin === 'local'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium',
        local ? 'bg-primary/10 text-primary' : 'bg-yamabuki/25 text-yamabuki-foreground',
        className,
      )}
    >
      {local ? '昔からの地元' : '移り住んだ人'}
    </span>
  )
}

export function Rating({ value, count, className }: { value: number; count: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm', className)}>
      <Star className="h-4 w-4 fill-yamabuki text-yamabuki" aria-hidden />
      <span className="font-serif font-medium text-foreground">{value.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">({count})</span>
    </span>
  )
}
