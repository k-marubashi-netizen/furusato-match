'use client'

import { Home } from 'lucide-react'
import { LanguageToggle, useLanguage } from './language-context'

export function ScreenHeader({
  title,
  titleEn,
  subtitle,
  subtitleEn,
}: {
  title: string
  titleEn?: string
  subtitle?: string
  subtitleEn?: string
}) {
  const { t } = useLanguage()

  return (
    <header className="px-4 pb-2 pt-4">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card/90 px-3.5 py-3 shadow-sm backdrop-blur">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Home className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate font-serif text-[15px] font-bold leading-tight text-foreground">ふるさとマッチ</p>
            <p className="mt-0.5 truncate text-[9px] font-semibold tracking-[0.16em] text-primary">FURUSATO MATCH</p>
          </div>
        </div>
        <LanguageToggle />
      </div>

      <div className="pt-4">
        <h1 className="text-balance font-serif text-[26px] font-bold leading-tight text-foreground">{t(title, titleEn ?? title)}</h1>
        {subtitle && (
          <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-muted-foreground">{t(subtitle, subtitleEn ?? subtitle)}</p>
        )}
      </div>
    </header>
  )
}
