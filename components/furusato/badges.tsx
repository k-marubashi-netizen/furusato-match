'use client'

import { Languages, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Origin } from '@/lib/data'
import { useLanguage } from './language-context'
import { localize } from './locale-utils'

const themeLabels: Record<string, { ja: string; en: string; zh: string; es: string; de: string; fr: string; it: string }> = {
  自然: { ja: '自然', en: 'Nature', zh: '自然', es: 'Naturaleza', de: 'Natur', fr: 'Nature', it: 'Natura' },
  暮らし: { ja: '暮らし', en: 'Local life', zh: '当地生活', es: 'Vida local', de: 'Alltag', fr: 'Vie locale', it: 'Vita locale' },
  祭り: { ja: '祭り', en: 'Festivals', zh: '祭典', es: 'Festivales', de: 'Feste', fr: 'Fêtes', it: 'Festival' },
  食: { ja: '食', en: 'Food', zh: '美食', es: 'Comida', de: 'Essen', fr: 'Cuisine', it: 'Cibo' },
  歴史: { ja: '歴史', en: 'History', zh: '历史', es: 'Historia', de: 'Geschichte', fr: 'Histoire', it: 'Storia' },
  マナー: { ja: 'マナー', en: 'Manners', zh: '礼仪', es: 'Modales', de: 'Umgangsformen', fr: 'Savoir-vivre', it: 'Buone maniere' },
}

const languageLabels: Record<string, { ja: string; en: string; zh: string; es: string; de: string; fr: string; it: string }> = {
  日本語: { ja: '日本語', en: 'Japanese', zh: '日语', es: 'Japonés', de: 'Japanisch', fr: 'Japonais', it: 'Giapponese' },
  English: { ja: 'English', en: 'English', zh: '英语', es: 'Inglés', de: 'Englisch', fr: 'Anglais', it: 'Inglese' },
  翻訳機OK: { ja: '翻訳機OK', en: 'Translator OK', zh: '可使用翻译工具', es: 'Traductor OK', de: 'Übersetzer OK', fr: 'Traducteur accepté', it: 'Traduttore OK' },
}

export function ThemeTag({ label }: { label: string }) {
  const { lang } = useLanguage()
  return (
    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
      {themeLabels[label] ? localize(lang, themeLabels[label]) : label}
    </span>
  )
}

export function LanguageBadge({ label }: { label: string }) {
  const { lang } = useLanguage()
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 px-2 py-0.5 text-[11px] font-medium text-primary">
      <Languages className="h-3 w-3" aria-hidden />
      {languageLabels[label] ? localize(lang, languageLabels[label]) : label}
    </span>
  )
}

export function OriginLabel({
  origin,
  years,
  className,
}: {
  origin: Origin
  years?: number
  className?: string
}) {
  const { lang } = useLanguage()
  const style =
    origin === 'local'
      ? 'bg-primary/10 text-primary'
      : origin === 'settler'
        ? 'bg-yamabuki/25 text-yamabuki-foreground'
        : 'bg-accent text-accent-foreground'

  const prefix = localize(lang, {
    ja: '地域との関わり',
    en: 'Connected for',
    zh: '与当地结缘',
    es: 'Vinculado desde hace',
    de: 'Mit der Region verbunden seit',
    fr: 'Lié à la région depuis',
    it: 'Legato al territorio da',
  })
  const yearUnit = localize(lang, {
    ja: '年',
    en: years === 1 ? 'year' : 'years',
    zh: '年',
    es: years === 1 ? 'año' : 'años',
    de: years === 1 ? 'Jahr' : 'Jahren',
    fr: years === 1 ? 'an' : 'ans',
    it: years === 1 ? 'anno' : 'anni',
  })

  return (
    <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium', style, className)}>
      {years ? `${prefix} ${years}${lang === 'ja' || lang === 'zh' ? yearUnit : ` ${yearUnit}`}` : localize(lang, {
        ja: '地域に関わる人',
        en: 'Community member',
        zh: '当地参与者',
        es: 'Persona vinculada a la zona',
        de: 'Mit der Region verbunden',
        fr: 'Personne liée à la région',
        it: 'Persona legata al territorio',
      })}
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
