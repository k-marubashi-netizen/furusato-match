'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ArrowRight, Handshake, Home, MessageCircle, Search, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { guides, type Guide } from '@/lib/data'
import { recommendedTravelers, type FollowState, type TravelerProfile } from '@/lib/social-data'
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

const guideEn: Record<string, { name: string; area: string; intro: string }> = {
  g1: {
    name: 'Makoto Yamaguchi',
    area: 'Otari, Nagano',
    intro: 'Born and raised in this valley. I can show you satoyama life, mountain traditions, and the small details visitors usually miss.',
  },
  g2: {
    name: 'Sayaka Tamura',
    area: 'Noto, Ishikawa',
    intro: 'I moved here from Tokyo seven years ago. Because I was once a newcomer too, I can help bridge local life and a visitor’s point of view.',
  },
  g3: {
    name: 'Yosuke Nakamura',
    area: 'Yame, Fukuoka',
    intro: 'My family grows Yame tea. Ask me about tea fields, local markets, and the food culture of the area.',
  },
  g4: {
    name: 'Hisako Kobayashi',
    area: 'Miyama, Kyoto',
    intro: 'I live in the thatched-roof village. I would love to share the seasons, festivals, and everyday wisdom of Miyama.',
  },
}

export function SearchScreen({
  onOpenGuide,
  onOpenConversation,
}: {
  onOpenGuide: (guide: Guide) => void
  onOpenConversation: (conversationId: string) => void
}) {
  const { lang, t } = useLanguage()
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState<(typeof themes)[number]>('すべて')
  const [followStates, setFollowStates] = useState<Record<string, FollowState>>(
    Object.fromEntries(recommendedTravelers.map((traveler) => [traveler.id, traveler.followState])),
  )

  const filteredGuides = useMemo(() => {
    const q = query.trim().toLowerCase()
    return guides.filter((guide) => {
      const hitTheme = theme === 'すべて' || guide.themes.includes(theme)
      const en = guideEn[guide.id]
      const haystack = [
        guide.name,
        guide.kana,
        guide.area,
        guide.intro,
        en?.name ?? '',
        en?.area ?? '',
        en?.intro ?? '',
        ...guide.languages,
        ...guide.themes,
        ...guide.offers,
      ]
        .join(' ')
        .toLowerCase()
      return hitTheme && (!q || haystack.includes(q))
    })
  }, [query, theme])

  function toggleFollow(traveler: TravelerProfile) {
    setFollowStates((current) => ({
      ...current,
      [traveler.id]: current[traveler.id] === 'following' ? 'none' : 'following',
    }))
  }

  return (
    <div className="flex flex-col pb-5">
      <HomeHero />

      <section className="px-4 pt-5">
        <div className="mb-3">
          <p className="text-[10px] font-bold tracking-[0.16em] text-primary">PEOPLE TO FOLLOW</p>
          <h2 className="mt-1 font-serif text-xl font-bold text-foreground">{t('おすすめの旅人', 'Suggested travelers')}</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {t('同じ地域に興味を持つ旅人をフォロー。気になったらそのままDMへ。', 'Follow travelers who like the same places, then move straight into a DM.')}
          </p>
        </div>

        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {recommendedTravelers.map((traveler) => (
            <TravelerCard
              key={traveler.id}
              traveler={traveler}
              state={followStates[traveler.id]}
              onFollow={() => toggleFollow(traveler)}
              onMessage={() => onOpenConversation(traveler.conversationId)}
            />
          ))}
        </div>
      </section>

      <section className="mx-4 mt-4 rounded-3xl border border-primary/15 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <div className="flex shrink-0 -space-x-2">
            <img src={recommendedTravelers[0].photo} alt="Sofia" className="h-9 w-9 rounded-full border-2 border-background object-cover" />
            <img src={recommendedTravelers[1].photo} alt="Lucas" className="h-9 w-9 rounded-full border-2 border-background object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-[0.12em] text-primary">TRAVELER DM</p>
            <h3 className="mt-1 font-serif text-sm font-bold text-foreground">{t('旅人どうしでも、地域の発見を交換。', 'Travelers share local discoveries too.')}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              {t('「漁港の夕日が綺麗だった」「神社の裏の小道が静かだった」——知らない旅人同士でも、フォローから会話が始まります。', '“The fishing-port sunset was beautiful.” “There is a quiet path behind the shrine.” Following someone can become a real conversation.')}
            </p>
            <button
              type="button"
              onClick={() => onOpenConversation('tc1')}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              {t('DMを見てみる', 'Open the DM')}
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <div className="rounded-[1.75rem] border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Search className="h-4 w-4" aria-hidden /></span>
            <div>
              <p className="font-serif text-base font-bold text-foreground">{t('ふるさとガイドを探す', 'Find a Furusato Guide')}</p>
              <p className="text-[11px] text-muted-foreground">{t('住民・移住者・近隣の学生や社会人など、地域を知る人を探せます。', 'Find longtime residents, newcomers, nearby students, workers, and others who know the area.')}</p>
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

      <section className="mx-4 mt-6 rounded-[1.75rem] border border-primary/15 bg-primary/5 p-5">
        <p className="text-[10px] font-bold tracking-[0.14em] text-primary">OUR GOAL</p>
        <h2 className="mt-1 font-serif text-[17px] font-bold leading-relaxed text-foreground">
          {t('観光客を増やすのではなく、“ふるさと”を持つ人を増やす。', 'Not more tourists — more people with a place they can call home.')}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {t('交流が続けば、文化・伝統・自然も次の人へ受け継がれていきます。', 'Long-lasting relationships help pass local culture, traditions, and nature to the next person.')}
        </p>
        <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground">
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
      <div className="rounded-[2rem] border border-primary/15 bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Home className="h-5 w-5" aria-hidden />
          </span>
          <p className="whitespace-nowrap font-serif text-[18px] font-bold leading-none text-foreground">ふるさとマッチ</p>
          <span className="ml-auto hidden text-[9px] font-bold tracking-[0.14em] text-muted-foreground min-[370px]:block">FURUSATO MATCH</span>
        </div>

        <div className="mt-3 flex justify-end border-t border-border/60 pt-3">
          <LanguageToggle />
        </div>

        <div className="mt-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold text-primary">
            <Handshake className="h-3.5 w-3.5" aria-hidden />
            {t('恋愛じゃなく、“交流”のマッチング', 'Matching for connection — not dating')}
          </span>
          <h1 className="mt-3 font-serif text-[23px] font-bold leading-[1.45] tracking-[-0.01em] text-foreground">
            {t('日本に、“ただいま”と言える場所を。', 'Find a place in Japan you can call home.')}
          </h1>
          <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
            {t('外国人観光客、昔からの住民、移住者、そして地域の近くに暮らす大学生や社会人まで。地域を知る人と、知りたい人をつなぎます。', 'Travelers connect with longtime residents, newcomers, and nearby students or workers who know and care about the community.')}
          </p>
        </div>
      </div>
    </header>
  )
}

function TravelerCard({
  traveler,
  state,
  onFollow,
  onMessage,
}: {
  traveler: TravelerProfile
  state: FollowState
  onFollow: () => void
  onMessage: () => void
}) {
  const { lang, t } = useLanguage()
  const followLabel =
    state === 'following'
      ? t('フォロー中', 'Following')
      : state === 'follows-you'
        ? t('フォローバック', 'Follow back')
        : t('フォローする', 'Follow')

  return (
    <article className="w-[230px] shrink-0 rounded-3xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <img src={traveler.photo} alt={traveler.name} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-primary/10" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-sm font-bold text-foreground">{traveler.name}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            {lang === 'ja' ? traveler.countryJa : traveler.countryEn} · {lang === 'ja' ? traveler.statusJa : traveler.statusEn}
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground">
            {traveler.followers} {t('フォロワー', 'followers')} · {traveler.following} {t('フォロー中', 'following')}
          </p>
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-[12px] leading-relaxed text-foreground/75">{lang === 'ja' ? traveler.bioJa : traveler.bioEn}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {(lang === 'ja' ? traveler.interestsJa : traveler.interestsEn).map((interest) => (
          <span key={interest} className="rounded-full bg-secondary px-2 py-1 text-[10px] text-secondary-foreground">{interest}</span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
        <button
          type="button"
          onClick={onFollow}
          className={cn(
            'inline-flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-[11px] font-bold transition-colors',
            state === 'following' ? 'border border-border bg-background text-foreground' : 'bg-primary text-primary-foreground',
          )}
        >
          <UserPlus className="h-3.5 w-3.5" aria-hidden />
          {followLabel}
        </button>
        <button
          type="button"
          onClick={onMessage}
          aria-label={t('DMを送る', 'Send DM')}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-primary"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </article>
  )
}

function GuideCard({ guide, onClick }: { guide: Guide; onClick: () => void }) {
  const { lang, t } = useLanguage()
  const en = guideEn[guide.id]
  const name = lang === 'en' ? en?.name ?? guide.name : guide.name
  const area = lang === 'en' ? en?.area ?? guide.area : guide.area
  const intro = lang === 'en' ? en?.intro ?? guide.intro : guide.intro

  return (
    <button type="button" onClick={onClick} className="w-full overflow-hidden rounded-3xl border border-border bg-card text-left shadow-sm transition-transform active:scale-[0.99]">
      <div className="flex gap-3 p-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
          <Image src={guide.photo || '/placeholder.svg'} alt={`${name} profile`} fill className="object-cover" sizes="96px" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-serif text-base font-bold text-foreground">{name}</p>
              <p className="truncate text-xs text-muted-foreground">{area}</p>
            </div>
            <OriginLabel origin={guide.origin} />
          </div>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-foreground/80">{intro}</p>
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
