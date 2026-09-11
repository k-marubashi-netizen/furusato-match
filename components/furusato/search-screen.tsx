'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Compass,
  Heart,
  Home,
  Map,
  MapPin,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { events, guides, type Guide } from '@/lib/data'
import { recommendedTravelers } from '@/lib/social-data'
import { KnowledgeGauge } from './knowledge-gauge'
import { LanguageBadge, OriginLabel, Rating, ThemeTag } from './badges'
import { LanguageToggle, useLanguage } from './language-context'
import { FurusatoLogo } from './logo'

const themes = ['すべて', '自然', '歴史', '食', '祭り', '暮らし'] as const
const themeEn: Record<(typeof themes)[number], string> = {
  すべて: 'All',
  自然: 'Nature',
  歴史: 'History',
  食: 'Food',
  祭り: 'Festivals',
  暮らし: 'Local life',
}

const heroImage = '/events/hero-village.png'
const regionImages = [
  '/events/event-1.png',
  '/events/event-2.png',
  '/events/event-3.png',
]
const guideImages: Record<string, string> = {
  g1: '/guides/guide-1.png',
  g2: '/guides/guide-2.png',
  g3: '/guides/guide-3.png',
  g4: '/guides/guide-4.png',
}

const regions = [
  { ja: '長野・小谷', en: 'Nagano · Otari', noteJa: '山と人がつながる里山', noteEn: 'Mountain life, shared by locals' },
  { ja: '石川・能登', en: 'Ishikawa · Noto', noteJa: '海と食から始まる交流', noteEn: 'Meet through food and the sea' },
  { ja: '京都・美山', en: 'Kyoto · Miyama', noteJa: '暮らしと文化を教わる', noteEn: 'Learn everyday culture' },
]

export function SearchScreen({
  onOpenGuide,
  onOpenConversation,
  onOpenMap,
  onCreate,
}: {
  onOpenGuide: (guide: Guide) => void
  onOpenConversation: (conversationId: string) => void
  onOpenMap: () => void
  onCreate: () => void
}) {
  const { t } = useLanguage()
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
    <div className="flex flex-col pb-7">
      <Hero query={query} setQuery={setQuery} onCreate={onCreate} />

      <section className="px-4 pt-5">
        <div className="grid grid-cols-3 gap-2.5">
          <QuickAction icon={Map} title={t('地域から', 'By place')} desc={t('日本の地域を見る', 'Browse regions')} onClick={onOpenMap} />
          <QuickAction icon={Sparkles} title={t('体験から', 'By experience')} desc={t('暮らしに混ざる', 'Join local life')} />
          <QuickAction icon={Users} title={t('人から', 'By people')} desc={t('会いたい人を探す', 'Meet someone')} />
        </div>
      </section>

      <SectionTitle eyebrow="DISCOVER" title={t('“ふるさと”になりそうな場所', 'Places that could become your furusato')} />
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {regions.map((region, index) => (
          <article key={region.ja} className="group relative h-[190px] w-[255px] shrink-0 overflow-hidden rounded-[1.8rem] border border-white/30 bg-card shadow-[0_16px_40px_rgba(47,111,106,0.12)]">
            <Image src={regionImages[index]} alt={region.ja} fill className="object-cover transition-transform duration-500 group-active:scale-[1.02]" sizes="255px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5" />
            <button type="button" aria-label="お気に入り" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-shu shadow-sm backdrop-blur">
              <Heart className="h-4 w-4" aria-hidden />
            </button>
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="flex items-center gap-1 text-[11px] font-bold text-white/80"><MapPin className="h-3.5 w-3.5" />{t(region.ja, region.en)}</div>
              <h3 className="mt-1 font-serif text-lg font-bold">{t(region.noteJa, region.noteEn)}</h3>
              <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-white/90">{t('地域を見る', 'Explore')}<ArrowRight className="h-3.5 w-3.5" /></p>
            </div>
          </article>
        ))}
      </div>

      <SectionTitle eyebrow="LOCAL EXPERIENCES" title={t('地域の日常に、少しだけ混ざる', 'Step into everyday local life')} />
      <div className="space-y-3 px-4">
        {events.map((event, index) => (
          <article key={event.id} className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
            <div className="grid grid-cols-[118px_1fr]">
              <div className="relative min-h-[132px]">
                <Image src={regionImages[index]} alt={event.title} fill className="object-cover" sizes="118px" />
                <span className="absolute left-2 top-2 rounded-full bg-card/90 px-2 py-1 text-[10px] font-bold text-primary backdrop-blur">
                  {index === 0 ? t('里山', 'Satoyama') : index === 1 ? t('食・市場', 'Food & market') : t('文化', 'Culture')}
                </span>
              </div>
              <div className="flex min-w-0 flex-col justify-center p-3.5">
                <p className="text-[10px] font-bold tracking-[0.12em] text-primary">{event.date.split(' ')[0]}</p>
                <h3 className="mt-1 font-serif text-[15px] font-bold leading-snug text-foreground">{event.title}</h3>
                <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground"><MapPin className="h-3 w-3" />{event.place}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-foreground/75">{event.fee}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary">{t('詳しく見る', 'Details')}<ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="px-4 pt-7">
        <div className="rounded-[1.9rem] border border-border bg-card p-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-primary">FURUSATO GUIDES</p>
              <h2 className="mt-1 font-serif text-xl font-bold text-foreground">{t('あなたに合うガイド', 'Guides who fit your trip')}</h2>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{t('住民・移住者・近隣の学生など、地域を知る人から探せます。', 'Find locals, newcomers, nearby students, and others who know the area.')}</p>
            </div>
            <Compass className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {themes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTheme(item)}
                className={cn(
                  'whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                  theme === item ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground',
                )}
              >
                {t(item, themeEn[item])}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3 px-4 pt-4">
        {filteredGuides.map((guide, index) => (
          <GuideCard key={guide.id} guide={guide} match={94 - index * 3} onClick={() => onOpenGuide(guide)} />
        ))}
        {filteredGuides.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border bg-card p-6 text-center">
            <p className="font-serif text-sm font-bold text-foreground">{t('条件に合うガイドが見つかりませんでした', 'No guides matched your filters')}</p>
            <button type="button" onClick={() => { setQuery(''); setTheme('すべて') }} className="mt-2 text-xs font-bold text-primary">{t('条件をリセット', 'Reset filters')}</button>
          </div>
        )}
      </section>

      <SectionTitle eyebrow="TRAVELER TO TRAVELER" title={t('旅人どうしでも、地域を交換する', 'Travelers share local discoveries too')} />
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {recommendedTravelers.map((traveler) => (
          <article key={traveler.id} className="w-[220px] shrink-0 rounded-[1.7rem] border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <img src={traveler.photo} alt={traveler.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/10" />
              <div className="min-w-0">
                <p className="truncate font-serif text-sm font-bold text-foreground">{traveler.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">{t(traveler.statusJa, traveler.statusEn)}</p>
              </div>
            </div>
            <p className="mt-3 line-clamp-3 text-[12px] leading-relaxed text-foreground/75">{t(traveler.bioJa, traveler.bioEn)}</p>
            <button type="button" onClick={() => onOpenConversation(traveler.conversationId)} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-2 text-[11px] font-bold text-primary">
              <MessageCircle className="h-3.5 w-3.5" />{t('DMする', 'Message')}
            </button>
          </article>
        ))}
      </div>

      <section className="mx-4 mt-7 overflow-hidden rounded-[2rem] bg-primary p-5 text-primary-foreground shadow-[0_18px_50px_rgba(47,111,106,0.22)]">
        <p className="text-[10px] font-bold tracking-[0.16em] text-primary-foreground/70">OUR PURPOSE</p>
        <h2 className="mt-2 font-serif text-[20px] font-bold leading-relaxed">{t('観光客を増やすのではなく、“ふるさと”を持つ人を増やす。', 'Not more tourists — more people with a place they can call home.')}</h2>
        <p className="mt-2 text-[12px] leading-relaxed text-primary-foreground/75">{t('「会いたい人がいるから帰る」。そんな関係が、地域の文化や自然を次の人へつないでいきます。', 'Return because there is someone you want to see. Those relationships help carry local culture and nature forward.')}</p>
        <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold text-primary">
          <Home className="h-4 w-4" />{t('あなたの“ふるさと”を探す', 'Find your furusato')}<ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  )
}

function Hero({ query, setQuery, onCreate }: { query: string; setQuery: (value: string) => void; onCreate: () => void }) {
  const { t } = useLanguage()
  return (
    <header className="relative overflow-hidden rounded-b-[2.4rem] bg-primary text-white shadow-[0_18px_48px_rgba(47,111,106,0.16)]">
      <div className="relative h-[355px]">
        <Image src={heroImage} alt="日本の里山" fill priority className="object-cover" sizes="420px" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/70" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-2 font-serif text-sm font-bold text-primary shadow-sm backdrop-blur"><FurusatoLogo className="h-[18px] w-[18px]" />ふるさとマッチ</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onCreate} aria-label={t('投稿する', 'Create')} className="flex h-9 w-9 items-center justify-center rounded-full bg-shu text-shu-foreground shadow-sm transition-transform active:scale-95"><Plus className="h-5 w-5" aria-hidden /></button>
            <div className="rounded-full bg-white/92 px-2 py-1 shadow-sm backdrop-blur"><LanguageToggle /></div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 pb-7">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold backdrop-blur"><Sparkles className="h-3.5 w-3.5" />{t('人と地域が出会う、交流のマッチング', 'Matching people with places')}</span>
          <h1 className="mt-3 whitespace-pre-line font-serif text-[29px] font-bold leading-[1.35] tracking-[-0.02em]">{t('ふるさとが、\nきっと見つかる。', 'Find a place that\nfeels like home.')}</h1>
          <p className="mt-2 max-w-[310px] text-[12px] leading-relaxed text-white/82">{t('観光で終わらず、「また会いたい」が残る旅へ。地域の人と出会い、学び、いつか自分も伝える人になる。', 'Go beyond sightseeing. Meet local people, learn from them, and one day become someone who passes it on.')}</p>
        </div>
      </div>
      <div className="relative -mt-1 px-4 pb-5">
        <div className="flex items-center gap-2 rounded-[1.15rem] bg-white px-4 py-3.5 text-foreground shadow-[0_14px_32px_rgba(0,0,0,0.16)]">
          <Search className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('行き先・体験・人から探す', 'Search place, experience, or person')}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </header>
  )
}

function QuickAction({ icon: Icon, title, desc, onClick }: { icon: typeof Map; title: string; desc: string; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-[1.35rem] border border-border bg-card p-3 text-left shadow-sm transition-transform active:scale-[0.98]">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
      <span className="mt-2.5 block font-serif text-[13px] font-bold text-foreground">{title}</span>
      <span className="mt-0.5 block text-[10px] leading-snug text-muted-foreground">{desc}</span>
    </button>
  )
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="px-4 pb-3 pt-7">
      <p className="text-[10px] font-bold tracking-[0.16em] text-primary">{eyebrow}</p>
      <h2 className="mt-1 font-serif text-xl font-bold leading-snug text-foreground">{title}</h2>
    </div>
  )
}

function GuideCard({ guide, match, onClick }: { guide: Guide; match: number; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="w-full overflow-hidden rounded-[1.8rem] border border-border bg-card text-left shadow-sm transition-transform active:scale-[0.99]">
      <div className="relative h-[190px] w-full">
        <Image src={guideImages[guide.id] ?? guide.photo} alt={`${guide.name}さん`} fill className="object-cover" sizes="390px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
        <span className="absolute left-3 top-3 rounded-full bg-card/92 px-2.5 py-1 text-[11px] font-bold text-primary shadow-sm backdrop-blur">{match}% MATCH</span>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-end justify-between gap-3">
            <div>
              <OriginLabel origin={guide.origin} className="mb-1 bg-white/92" />
              <p className="font-serif text-xl font-bold">{guide.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-white/80"><MapPin className="h-3.5 w-3.5" />{guide.area}</p>
            </div>
            <Rating value={guide.rating} count={guide.reviewCount} className="rounded-full bg-white/92 px-2.5 py-1 text-foreground" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-[13px] leading-relaxed text-foreground/78">{guide.intro}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <KnowledgeGauge level={guide.level} />
          <span className="text-[11px] font-bold text-primary">プロフィールを見る →</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-3">
          {guide.languages.slice(0, 2).map((l) => <LanguageBadge key={l} label={l} />)}
          {guide.themes.slice(0, 2).map((tag) => <ThemeTag key={tag} label={tag} />)}
        </div>
      </div>
    </button>
  )
}
