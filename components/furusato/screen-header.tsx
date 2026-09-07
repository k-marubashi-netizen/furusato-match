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
      <div className="rounded-2xl border border-border/70 bg-card/95 px-3.5 py-3 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Home className="h-4 w-4" aria-hidden />
          </span>
          <p className="whitespace-nowrap font-serif text-[15px] font-bold leading-none text-foreground">ふるさとマッチ</p>
          <span className="ml-auto hidden text-[9px] font-semibold tracking-[0.14em] text-primary min-[370px]:block">FURUSATO MATCH</span>
        </div>
        <div className="mt-2.5 flex justify-end border-t border-border/60 pt-2.5">
          <LanguageToggle />
        </div>
      </div>

      <div className="pt-4">
        <h1 className="text-balance font-serif text-[25px] font-bold leading-tight text-foreground">{t(title, titleEn ?? title)}</h1>
        {subtitle && (
          <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-muted-foreground">{t(subtitle, subtitleEn ?? subtitle)}</p>
        )}
      </div>
    </header>
  )
}
