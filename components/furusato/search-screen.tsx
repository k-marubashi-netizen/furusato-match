'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Search, SlidersHorizontal, Users, Home, Repeat2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { areaChips, guides, type Guide } from '@/lib/data'
import { KnowledgeGauge } from './knowledge-gauge'
import { LanguageBadge, OriginLabel, Rating, ThemeTag } from './badges'
import { ScreenHeader } from './screen-header'

type Mode = 'guide' | 'travel' | 'local'

export function SearchScreen({ onOpenGuide }: { onOpenGuide: (guide: Guide) => void }) {
  const [area, setArea] = useState('全国')
  const [mode, setMode] = useState<Mode>('guide')

  return (
    <div className="flex flex-col">
      <ScreenHeader title="さがす" subtitle="案内する人にも、される人にも、「ただいま」を" />

      <div className="px-4 pt-2">
        <div className="grid grid-cols-3 gap-1 rounded-2xl bg-secondary p-1">
          <ModeButton active={mode === 'guide'} onClick={() => setMode('guide')} label="ガイド" />
          <ModeButton active={mode === 'travel'} onClick={() => setMode('travel')} label="旅仲間" />
          <ModeButton active={mode === 'local'} onClick={() => setMode('local')} label="地域の交流" />
        </div>
      </div>

      <div className="sticky top-0 z-10 space-y-3 bg-background/95 px-4 pb-3 pt-3 backdrop-blur">
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

      {mode === 'guide' ? (
        <div className="space-y-4 px-4 pb-4 pt-1">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} onClick={() => onOpenGuide(guide)} />
          ))}
        </div>
      ) : (
        <div className="space-y-3 px-4 pb-4 pt-1">
          {mode === 'travel' ? (
            <>
              <ExchangeCard icon={Users} title="旅人同士で、地域を一緒に学ぶ" body="初めて来た人も、何度も帰ってきた人も。地域の人に教わったことを共有しながら歩きます。" tag="旅人 × 旅人" />
              <ExchangeCard icon={Repeat2} title="再訪した旅人が、次の旅人を案内" body="教わる側だった人が、次は知っていることを渡す側へ。時を越えて交流がつながります。" tag="旅人 × 次の旅人" />
            </>
          ) : (
            <>
              <ExchangeCard icon={Home} title="新しく暮らし始めた人 × 昔からの住民" body="暮らしの知恵や地域のルールを教わりながら、住民同士のつながりを育てます。" tag="住民 × 住民" />
              <ExchangeCard icon={Users} title="世代を越えた地域の交流" body="学生、移住者、昔から暮らす人が一緒に企画。祭りや自然、日々の暮らしを次の世代へ。" tag="世代を越えて" />
            </>
          )}
        </div>
      )}

      <section className="mx-4 mb-6 rounded-3xl border border-primary/15 bg-primary/5 p-4">
        <p className="text-xs font-medium text-primary">こんな交流ができる</p>
        <h2 className="mt-1 font-serif text-lg font-bold text-foreground">人と人がつながるほど、地域が“ふるさと”になる。</h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">旅人同士、住民同士、世代を越えて、そして教わった人が次の人へ。観光だけで終わらない交流を育てます。</p>
      </section>

      <div className="px-4 pb-8">
        <button type="button" className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground">あなたの“ふるさと”をつくろう</button>
      </div>
    </div>
  )
}

function ModeButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return <button type="button" onClick={onClick} className={`rounded-xl px-2 py-2 text-xs font-medium ${active ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'}`}>{label}</button>
}

function ExchangeCard({ icon: Icon, title, body, tag }: { icon: typeof Users; title: string; body: string; tag: string }) {
  return (
    <article className="rounded-3xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
        <div>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">{tag}</span>
          <h2 className="mt-2 font-serif text-[15px] font-bold text-foreground">{title}</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
        </div>
      </div>
    </article>
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
