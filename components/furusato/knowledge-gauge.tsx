import { Sprout } from 'lucide-react'
import { cn } from '@/lib/utils'

const MAX = 5

export function KnowledgeGauge({
  level,
  size = 'sm',
  showLabel = true,
}: {
  level: number
  size?: 'sm' | 'lg'
  showLabel?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1" aria-label={`地域の知識度 レベル${level}`}>
        {Array.from({ length: MAX }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'rounded-full transition-colors',
              size === 'lg' ? 'h-2.5 w-6' : 'h-1.5 w-4',
              i < level ? 'bg-primary' : 'bg-primary/15',
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span
          className={cn(
            'flex items-center gap-1 font-serif font-medium text-primary',
            size === 'lg' ? 'text-base' : 'text-xs',
          )}
        >
          <Sprout className={size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'} aria-hidden />
          Lv.{level}
        </span>
      )}
    </div>
  )
}
