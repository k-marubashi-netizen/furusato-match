'use client'

import { Languages, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Origin } from '@/lib/data'
import { useLanguage } from './language-context'

const themeMap: Record<string, string> = {
  自然: 'Nature',
  暮らし: 'Local life',
  祭り: 'Festivals',
  食: 'Food',
  歴史: 'History',
  マナー: 'Manners',
}

const languageMap: Record<string, string> = {
  日本語: 'Japanese',
  翻訳機OK: 'Translator OK',
}

export function ThemeTag({ label }: { label: string }) {
  const { lang } = useLanguage()
  return (
    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
      {lang === 'en' ? themeMap[label] ?? label : label}
    </span>
  )
}

export function LanguageBadge({ label }: { label: string }) {
  const { lang } = useLanguage()
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 px-2 py-0.5 text-[11px] font-medium text-primary">
      <Languages className="h-3 w-3" aria-hidden />
      {lang === 'en' ? languageMap[label] ?? label : label}
    </span>
  )
}

export function OriginLabel({ origin, className }: { origin: Origin; className?: string }) {
  const { t } = useLanguage()
  const local = origin === 'local'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium',
        local ? 'bg-primary/10 text-primary' : 'bg-yamabuki/25 text-yamabuki-foreground',
        className,
      )}
    >
      {local ? t('昔からの地元', 'Longtime local') : t('移り住んだ人', 'New resident')}
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
