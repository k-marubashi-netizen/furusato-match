'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react'
import japanMap from '@svg-maps/japan'
import { cn } from '@/lib/utils'
import { events, guides, prefNames, prefName, regionOfPref, regionById, type Guide } from '@/lib/data'
import { useLanguage } from './language-context'
import { KnowledgeGauge } from './knowledge-gauge'
import { OriginLabel } from './badges'

type PrefContent = { guides: Guide[]; events: number }

export function MapScreen({ onBack, onOpenGuide }: { onBack: () => void; onOpenGuide: (g: Guide) => void }) {
  const { t } = useLanguage()

  const content = useMemo(() => {
    const ids = Object.keys(prefNames)
    const findPref = (s: string) => ids.find((id) => s.startsWith(prefNames[id]))
    const map: Record<string, PrefContent> = {}
    for (const g of guides) {
      const id = findPref(g.area)
      if (!id) continue
      ;(map[id] ??= { guides: [], events: 0 }).guides.push(g)
    }
    for (const e of events) {
      const id = findPref(e.place)
      if (!id) continue
      ;(map[id] ??= { guides: [], events: 0 }).events++
    }
    return map
  }, [])

  const contentIds = Object.keys(content)
  const [selected, setSelected] = useState<string>(contentIds[0] ?? '')
  const current = content[selected]
  const region = selected ? regionOfPref(selected) : undefined

  return (
    <div className="flex flex-col pb-8">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <button type="button" onClick={onBack} aria-label={t('もどる', 'Back')} className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary shadow-sm">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <p className="text-[10px] font-bold tracking-[0.16em] text-primary">EXPLORE BY MAP</p>
          <h1 className="font-serif text-lg font-bold text-foreground">{t('地域から“ふるさと”を探す', 'Find a furusato by place')}</h1>
        </div>
      </header>

      <p className="px-4 pt-4 text-[12px] leading-relaxed text-muted-foreground">
        {t('観光地さがしではなく、あなたの次の“ふるさと候補”を見つける地図です。色のついた地域で、いま交流できます。', 'Not a sightseeing search — a map to find your next candidate for a place to call home. Colored areas are where you can connect now.')}
      </p>

      <div className="mx-4 mt-4 rounded-[1.8rem] border border-border bg-card p-3 shadow-sm">
        <svg viewBox={japanMap.viewBox} role="img" aria-label={t('日本地図', 'Map of Japan')} className="h-auto w-full">
          {(japanMap.locations as { id: string; name: string; path: string }[]).map((loc) => {
            const has = Boolean(content[loc.id])
            const isSel = selected === loc.id
            const fill = has ? (isSel ? 'var(--shu)' : 'var(--primary)') : 'var(--muted)'
            return (
              <path
                key={loc.id}
                d={loc.path}
                fill={fill}
                stroke="var(--card)"
                strokeWidth={0.6}
                style={{ cursor: has ? 'pointer' : 'default', transition: 'fill .2s' }}
                onClick={has ? () => setSelected(loc.id) : undefined}
              >
                <title>{prefName(loc.id)}</title>
              </path>
            )
          })}
        </svg>
        <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: 'var(--primary)' }} />{t('交流できる地域', 'Active areas')}</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: 'var(--shu)' }} />{t('選択中', 'Selected')}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {contentIds.map((id) => (
          <button key={id} type="button" onClick={() => setSelected(id)}
            className={cn('whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold transition-colors',
              selected === id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground')}>
            {prefName(id)}
          </button>
        ))}
      </div>

      {current && (
        <section className="px-4 pt-4">
          <div className="rounded-[1.6rem] border border-border bg-card p-4 shadow-sm">
            {region && <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary"><MapPin className="h-3.5 w-3.5" />{regionById(region).name}</div>}
            <h2 className="mt-1 font-serif text-xl font-bold text-foreground">{prefName(selected)}</h2>
            <div className="mt-2 flex items-center gap-4 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-primary" />{t('ガイド', 'Guides')} {current.guides.length}</span>
              <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5 text-primary" />{t('イベント', 'Events')} {current.events}</span>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {current.guides.map((g) => (
              <button key={g.id} type="button" onClick={() => onOpenGuide(g)} className="flex w-full items-center gap-3 rounded-[1.4rem] border border-border bg-card p-3 text-left shadow-sm transition-transform active:scale-[0.99]">
                <img src={g.photo} alt={g.name} className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <OriginLabel origin={g.origin} className="mb-1" />
                  <p className="font-serif text-[15px] font-bold text-foreground">{g.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground"><MapPin className="h-3 w-3" />{g.area}</p>
                  <div className="mt-1.5"><KnowledgeGauge level={g.level} /></div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
              </button>
            ))}
          </div>
        </section>
      )}

      <p className="px-4 pt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
        {t('これから、もっと多くの地域が“ふるさと”になっていきます。', 'More places will become someone’s furusato over time.')}
      </p>
    </div>
  )
}
