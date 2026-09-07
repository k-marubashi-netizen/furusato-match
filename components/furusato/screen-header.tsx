'use client'

import { useState } from 'react'
import { Home } from 'lucide-react'

export function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const [lang, setLang] = useState<'JP' | 'EN'>('JP')

  return (
    <header className="px-4 pb-1 pt-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Home className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span className="font-serif text-sm font-medium text-primary">ふるさとマッチ</span>
          <span className="truncate text-[11px] text-muted-foreground">— ただいま、を日本のあちこちに</span>
        </div>
        <div className="flex shrink-0 rounded-full border border-border bg-card p-0.5 text-[10px] font-medium">
          {(['JP', 'EN'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLang(item)}
              className={`rounded-full px-2 py-1 ${lang === item ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
              aria-pressed={lang === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <h1 className="mt-2 font-serif text-2xl font-bold text-foreground">{title}</h1>
      {subtitle && <p className="mt-0.5 text-pretty text-xs leading-relaxed text-muted-foreground">{subtitle}</p>}
      {lang === 'EN' && (
        <p className="mt-1 text-[11px] text-primary">Demo translation mode / 主要な案内は自動翻訳されます</p>
      )}
    </header>
  )
}
