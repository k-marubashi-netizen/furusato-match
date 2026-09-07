'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ArrowRight, Clock3, Handshake, HeartHandshake, Home, Leaf, Search, Sprout, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { guides, type Guide } from '@/lib/data'
import { KnowledgeGauge } from './knowledge-gauge'
import { LanguageBadge, OriginLabel, Rating, ThemeTag } from './badges'
import { LanguageToggle, useLanguage } from './language-context'

const themes = ['すべて', '自然', '歴史', '食', '祭り', '暮らし'] as const
const themeEn: Record<(typeof themes)[number], string> = {
  すべて: 'All',
  自然: 'Nature',
  歴史: 'History',
  食: 'Food',
  祭り: 'Festivals',
  暮らし: 'Local life',
}

export function SearchScreen({ onOpenGuide }: { onOpenGuide: (guide: Guide) => void }) {
  const { lang, t } = useLanguage()
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState<(typeof themes)[number]>('すべて')

  const filteredGuides = useMemo(() => {
    const q = query.trim().toLowerCase()
    return guides.filter((guide) => {
      const hitTheme = theme === 'すべて' || guide.themes.includes(theme)
      const haystack = [guide.name, guide.kana, guide.area, guide.intro, ...guide.languages, ...guide.themes, ...guide.offers]
        .join(' ')
        .toLowerCase()
      return hitTheme && (!q || haystack.includes(q))
    })
  }, [query, theme])

  return (
    <div className="flex flex-col pb-4">
      <HomeHero />

      <section className="px-4 pt-5">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-primary">CONNECTIONS</p>
            <h2 className="mt-1 font-serif text-xl font-bold text-foreground">{t('ひとつのアプリで、5つの交流。', 'Five kinds of connection, in one app.')}</h2>
          </div>
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">{t('恋愛目的ではありません', 'Not for dating')}</span>
        </div>

        <div className="space-y-2.5">
          <ExchangeCard
            icon={HeartHandshake}
            strong
            eyebrow={t('観光客 × ふるさとガイド', 'Traveler × Furusato Guide')}
            title={t('名所だけじゃない、その土地の“暮らし”を知る。', 'Discover local life, not just landmarks.')}
            body={t('文化・マナー・自然・原風景まで、地域の人との対話から深く知ります。', 'Learn culture, manners, nature, and everyday life through real conversations with locals.')}
          />
          <div className="grid grid-cols-2 gap-2.5">
            <ExchangeMini icon={Users} title={t('旅人 × 旅人', 'Traveler × Traveler')} body={t('一緒に歩き、情報を交換', 'Walk together and share tips')} />
            <ExchangeMini icon={Home} title={t('住民 × 住民', 'Resident × Resident')} body={t('昔からの人と移住者をつなぐ', 'Connect locals and newcomers')} />
            <ExchangeMini icon={Sprout} title={t('世代を越えて', 'Across generations')} body={t('地域の知恵を次の世代へ', 'Pass local wisdom forward')} />
            <ExchangeMini icon={Clock3} title={t('時を越えて', 'Across time')} body={t('教わった旅人が次は案内役に', 'Visitors return as guides')} />
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <div className="rounded-[1.75rem] border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Search className="h-4 w-4" aria-hidden /></span>
            <div>
              <p className="font-serif text-base font-bold text-foreground">{t('ふるさとガイドを探す', 'Find a Furusato Guide')}</p>
              <p className="text-[11px] text-muted-foreground">{t('地域・言語・得意テーマから、会いたい人を。', 'Search by place, language, or local expertise.')}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-background px-3.5 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('例：長野、English、自然', 'e.g. Nagano, English, nature')}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {themes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTheme(item)}
                className={cn(
                  'whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                  theme === item ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground',
                )}
              >
                {lang === 'ja' ? item : themeEn[item]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3 px-4 pt-4">
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide) => <GuideCard key={guide.id} guide={guide} onClick={() => onOpenGuide(guide)} />)
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-card p-6 text-center">
            <p className="font-serif text-sm font-bold text-foreground">{t('条件に合うガイドが見つかりませんでした', 'No guides matched your filters')}</p>
            <button type="button" onClick={() => { setQuery(''); setTheme('すべて') }} className="mt-2 text-xs font-medium text-primary">{t('条件をリセット', 'Reset filters')}</button>
          </div>
        )}
      </section>

      <section className="mx-4 mt-6 overflow-hidden rounded-[1.75rem] bg-foreground p-5 text-background">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-background/10"><Leaf className="h-5 w-5" aria-hidden /></span>
          <div>
            <p className="text-[10px] font-bold tracking-[0.14em] text-background/60">OUR GOAL</p>
            <h2 className="mt-1 font-serif text-lg font-bold leading-snug">{t('観光客を増やすのではなく、“ふるさと”を持つ人を増やす。', 'Not more tourists — more people who have a place to call home.')}</h2>
            <p className="mt-2 text-xs leading-relaxed text-background/70">{t('交流が続けば、文化・伝統・自然も次の人へ受け継がれていく。', 'Lasting relationships help pass local culture, traditions, and nature to the next person.')}</p>
          </div>
        </div>
        <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-background py-3 text-sm font-bold text-foreground">
          {t('あなたの“ふるさと”をつくろう', 'Find your furusato')}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </section>
    </div>
  )
}

function HomeHero() {
  const { t } = useLanguage()

  return (
    <header className="px-4 pt-4">
      <div className="overflow-hidden rounded-[2rem] bg-primary p-5 text-primary-foreground shadow-lg shadow-primary/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/15">
              <Home className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-serif text-xl font-bold leading-tight">ふるさとマッチ</p>
              <p className="mt-1 text-[9px] font-bold tracking-[0.2em] text-white/65">FURUSATO MATCH</p>
            </div>
          </div>
          <LanguageToggle inverse />
        </div>

        <div className="mt-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-bold ring-1 ring-white/15">
            <Handshake className="h-3.5 w-3.5" aria-hidden />
            {t('恋愛じゃなく、“交流”のマッチング', 'Matching for connection — not dating')}
          </span>
          <h1 className="mt-3 text-balance font-serif text-[28px] font-bold leading-[1.25]">
            {t('日本に、“ただいま”と\n言える場所を。', 'Find a place in Japan\nyou can call home.')}
          </h1>
          <p className="mt-3 max-w-[30rem] text-[13px] leading-relaxed text-white/78">
            {t('外国人観光客、新しく暮らし始めた人、昔から地域で暮らす人。交流を通じて、人と地域を何重にもつなぎます。', 'Travelers, newcomers, and longtime residents connect through local culture, everyday life, and shared experiences.')}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {[t('文化・暮らし', 'Culture & life'), t('自然・原風景', 'Nature & landscapes'), t('人とのつながり', 'Human connection')].map((label) => (
            <span key={label} className="rounded-full bg-black/10 px-2.5 py-1 text-[10px] font-medium text-white/85">{label}</span>
          ))}
        </div>
      </div>
    </header>
  )
}

function ExchangeCard({ icon: Icon, eyebrow, title, body, strong }: { icon: typeof Users; eyebrow: string; title: string; body: string; strong?: boolean }) {
  return (
    <article className={cn('rounded-3xl border p-4', strong ? 'border-primary/20 bg-primary/5' : 'border-border bg-card')}>
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Icon className="h-5 w-5" aria-hidden /></span>
        <div>
          <p className="text-[10px] font-bold tracking-wide text-primary">{eyebrow}</p>
          <h3 className="mt-1 font-serif text-base font-bold leading-snug text-foreground">{title}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{body}</p>
        </div>
      </div>
    </article>
  )
}

function ExchangeMini({ icon: Icon, title, body }: { icon: typeof Users; title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-3.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="h-4 w-4" aria-hidden /></span>
      <h3 className="mt-2 font-serif text-[13px] font-bold text-foreground">{title}</h3>
      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{body}</p>
    </article>
  )
}

function GuideCard({ guide, onClick }: { guide: Guide; onClick: () => void }) {
  const { t } = useLanguage()

  return (
    <button type="button" onClick={onClick} className="w-full overflow-hidden rounded-3xl border border-border bg-card text-left shadow-sm transition-transform active:scale-[0.99]">
      <div className="flex gap-3 p-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
          <Image src={guide.photo || '/placeholder.svg'} alt={`${guide.name} profile`} fill className="object-cover" sizes="96px" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-serif text-base font-bold text-foreground">{guide.name}</p>
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
        {guide.themes.map((item) => <ThemeTag key={item} label={item} />)}
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-primary">{t('詳しく見る', 'View profile')}<ArrowRight className="h-3 w-3" aria-hidden /></span>
      </div>
    </button>
  )
}
