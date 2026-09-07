'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { areaChips, guides, type Guide } from '@/lib/data'
import { KnowledgeGauge } from './knowledge-gauge'
import { LanguageBadge, OriginLabel, Rating, ThemeTag } from './badges'
import { ScreenHeader } from './screen-header'

export function SearchScreen({ onOpenGuide }: { onOpenGuide: (guide: Guide) => void }) {
  const [area, setArea] = useState('全国')

  return (
    <div className="flex flex-col">
      <ScreenHeader title="さがす" subtitle="案内する人にも、される人にも、「ただいま」を" />

      <div className="sticky top-0 z-10 space-y-3 bg-background/95 px-4 pb-3 pt-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
            <input placeholder="地域・言語・テーマで探す" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <button type="button" aria-label="絞り込み" className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {areaChips.map((chip) => (
            <button key={chip} type="button" onClick={() => setArea(chip)} className={cn('whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors', area === chip ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground')}>
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-4 pb-6 pt-1">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} onClick={() => onOpenGuide(guide)} />
        ))}
      </div>
    </div>
  )
}

function GuideCard({ guide, onClick }: { guide: Guide; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="w-full overflow-hidden rounded-3xl border border-border bg-card text-left shadow-sm transition-transform active:scale-[0.99]">
      <div className="flex gap-3 p-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
          <Image src={guide.photo || '/placeholder.svg'} alt={`${guide.name}さんの写真`} fill className="object-cover" sizes="96px" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-serif text-base font-medium text-foreground">{guide.name}</p>
              <p className="truncate text-xs text-muted-foreground">{guide.area}</p>
            </div>
            <OriginLabel origin={guide.origin} />
          </div>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-foreground/80">{guide.intro}</p>
          <div className="mt-2 flex items-center justify-between">
            <KnowledgeGauge level={guide.level} />
            <Rating value={guide.rating} count={guide.reviewCount} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 px-3 py-2.5">
        {guide.languages.map((l) => <LanguageBadge key={l} label={l} />)}
        <span className="mx-0.5 h-3 w-px bg-border" aria-hidden />
        {guide.themes.map((t) => <ThemeTag key={t} label={t} />)}
      </div>
    </button>
  )
}
