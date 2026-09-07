'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AppLanguage = 'ja' | 'en'

type LanguageContextValue = {
  lang: AppLanguage
  setLang: (lang: AppLanguage) => void
  t: (ja: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<AppLanguage>('ja')

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: (ja, en) => (lang === 'ja' ? ja : en) }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}

export function LanguageToggle({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className={cn(
        'flex shrink-0 items-center gap-0.5 rounded-full p-1 text-[11px] font-bold shadow-sm',
        inverse ? 'bg-white/15 text-white' : 'border border-border bg-card text-muted-foreground',
        className,
      )}
      aria-label="Language"
    >
      <Languages className="ml-1 mr-0.5 h-3.5 w-3.5" aria-hidden />
      <button
        type="button"
        onClick={() => setLang('ja')}
        className={cn(
          'rounded-full px-2.5 py-1.5 transition-all',
          lang === 'ja'
            ? inverse
              ? 'bg-white text-primary'
              : 'bg-primary text-primary-foreground'
            : inverse
              ? 'text-white/75'
              : 'text-muted-foreground',
        )}
        aria-pressed={lang === 'ja'}
      >
        JP
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={cn(
          'rounded-full px-2.5 py-1.5 transition-all',
          lang === 'en'
            ? inverse
              ? 'bg-white text-primary'
              : 'bg-primary text-primary-foreground'
            : inverse
              ? 'text-white/75'
              : 'text-muted-foreground',
        )}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}
