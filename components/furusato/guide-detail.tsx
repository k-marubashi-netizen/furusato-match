'use client'

import Image from 'next/image'
import { BadgeCheck, ChevronLeft, Footprints, MessageCircle, ShieldCheck, Sprout, Star, Wallet } from 'lucide-react'
import type { Guide } from '@/lib/data'
import { LanguageBadge, OriginLabel, ThemeTag } from './badges'
import { useLanguage } from './language-context'

const guideEn: Record<string, {
  name: string
  area: string
  intro: string
  offers: string[]
  reviews: { name: string; country: string; comment: string }[]
}> = {
  g1: {
    name: 'Makoto Yamaguchi',
    area: 'Otari, Nagano',
    intro: 'Born and raised in this valley for 60 years. I can show you satoyama life, mountain traditions, and the gifts of the seasons.',
    offers: ['Walking the satoyama', 'Cooking local dishes', 'Life in snow country', 'Local manners'],
    reviews: [
      { name: 'Emma', country: 'United Kingdom', comment: 'Makoto-san felt like family. I really said “tadaima” here.' },
      { name: 'Lucas', country: 'France', comment: 'His knowledge of the mountains is incredible. I learned something at every step.' },
      { name: 'Mei', country: 'Taiwan', comment: 'He was so welcoming. I already want to come back to Otari.' },
    ],
  },
  g2: {
    name: 'Sayaka Tamura',
    area: 'Noto, Ishikawa',
    intro: 'I moved here from Tokyo seven years ago. Because I was once a newcomer, I can help visitors understand Noto from both sides.',
    offers: ['Morning market walk', 'Life by the sea', 'Fermented food', 'Local culture'],
    reviews: [
      { name: 'Sofia', country: 'Spain', comment: 'Sayaka understands both sides. Perfect guide for first-timers.' },
      { name: 'Daniel', country: 'Germany', comment: 'I will never forget what I learned about local fermented food.' },
    ],
  },
  g3: {
    name: 'Yosuke Nakamura',
    area: 'Yame, Fukuoka · nearby university student',
    intro: 'I study in Fukuoka City and regularly visit Yame for fieldwork with tea farmers. Because I come from nearby rather than living here full-time, I can explain the area clearly to first-time visitors.',
    offers: ['Tea-field visit', 'How to enjoy the market', 'Yame through a student perspective'],
    reviews: [
      { name: 'Olivia', country: 'United States', comment: 'The tea tasting was unforgettable. Yosuke is so warm!' },
      { name: 'Chen', country: 'China', comment: 'I fell in love with Yame tea.' },
    ],
  },
  g4: {
    name: 'Hisako Kobayashi',
    area: 'Miyama, Kyoto',
    intro: 'I live in the thatched-roof village. I love sharing the seasons, festivals, and everyday wisdom of rural Japan.',
    offers: ['Thatched village walk', 'Seasonal traditions', 'Japanese manners', 'Everyday wisdom'],
    reviews: [
      { name: 'James', country: 'Canada', comment: 'Hisako-san taught me the meaning of “furusato”. Truly special.' },
      { name: 'Anna', country: 'Italy', comment: 'My time in Miyama became a lifelong memory. I really felt I could say “I’m home”.' },
    ],
  },
}

export function GuideDetail({ guide, onBack, onMessage }: { guide: Guide; onBack: () => void; onMessage: (guide: Guide) => void }) {
  const { lang, t } = useLanguage()
  const en = guideEn[guide.id]
  const name = lang === 'ja' ? guide.name : en?.name ?? guide.name
  const area = lang === 'ja' ? guide.area : en?.area ?? guide.area
  const intro = lang === 'ja' ? guide.intro : en?.intro ?? guide.intro
  const offers = lang === 'ja' ? guide.offers : en?.offers ?? guide.offers

  return (
    <div className="flex flex-col pb-28">
      <div className="relative h-56 w-full">
        <Image src={guide.photo || '/placeholder.svg'} alt={`${name} profile`} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
        <button type="button" onClick={onBack} aria-label="back" className="absolute left-3 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur">
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="absolute bottom-3 left-4 right-4 text-primary-foreground">
          <div className="mb-1 flex flex-wrap gap-1.5">
            <OriginLabel origin={guide.origin} className="bg-card/90" />
            <span className="inline-flex items-center gap-1 rounded-full bg-card/90 px-2 py-0.5 text-[11px] font-medium text-primary">
              <BadgeCheck className="h-3 w-3" aria-hidden />{t('本人確認済みガイド', 'Verified guide')}
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold">{name}</h1>
          <p className="text-sm opacity-90">{area}</p>
        </div>
      </div>

      <div className="space-y-5 px-4 pt-4">
        <p className="text-sm leading-relaxed text-foreground/85">{intro}</p>

        <section className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-border bg-card p-3">
            <p className="flex items-center gap-1 text-xs text-muted-foreground"><Wallet className="h-3.5 w-3.5 text-primary" aria-hidden />{t('料金の目安', 'Typical fee')}</p>
            <p className="mt-1 font-serif text-sm font-bold text-foreground">{t('1,500〜3,000円 / 回', '¥1,500–3,000 / session')}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-3">
            <p className="flex items-center gap-1 text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />{t('安心設計', 'Trust & safety')}</p>
            <p className="mt-1 font-serif text-sm font-bold text-foreground">{t('相互レビュー制', 'Two-way reviews')}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground"><Sprout className="h-4 w-4 text-primary" aria-hidden />{t('地域の知識度', 'Local knowledge')}</span>
            <span className="font-serif text-lg font-bold text-primary">Lv.{guide.level}</span>
          </div>
          <div className="mt-3 flex gap-1.5">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={`h-3 flex-1 rounded-full ${i < guide.level ? 'bg-primary' : 'bg-primary/15'}`} />)}</div>
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{t('知識度は、交流を重ねて地域を学ぶほど育っていくパラメーターです。', 'Local knowledge grows as you learn through repeated exchanges and experiences.')}</p>
        </section>

        <section className="rounded-3xl bg-primary/5 p-4">
          <p className="text-xs font-medium text-primary">{t('この交流の目的', 'Purpose of the exchange')}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">{t('一方的に“日本のルールを教える”のではなく、文化・習慣の違いをお互いに知ること。対話から地域への理解を深めます。', 'This is not about one-way rule teaching. It is about understanding differences in culture and customs through conversation.')}</p>
        </section>

        <Section title={t('得意テーマ', 'Local expertise')}><div className="flex flex-wrap gap-1.5">{guide.themes.map((item) => <ThemeTag key={item} label={item} />)}</div></Section>
        <Section title={t('対応言語', 'Languages')}><div className="flex flex-wrap gap-1.5">{guide.languages.map((item) => <LanguageBadge key={item} label={item} />)}</div></Section>
        <Section title={t('案内できること', 'What we can do together')}><ul className="grid grid-cols-2 gap-2">{offers.map((item) => <li key={item} className="rounded-2xl bg-secondary px-3 py-2.5 text-[13px] font-medium text-secondary-foreground">{item}</li>)}</ul></Section>

        <Section title={t(`レビュー（${guide.reviewCount}件）`, `Reviews (${guide.reviewCount})`)}>
          <div className="space-y-2.5">
            {guide.reviews.map((review, i) => {
              const translated = en?.reviews[i]
              const reviewName = lang === 'ja' ? review.name : translated?.name ?? review.name
              const reviewCountry = lang === 'ja' ? review.country : translated?.country ?? review.country
              const reviewComment = lang === 'ja' ? review.comment : translated?.comment ?? review.comment
              return (
                <div key={i} className="rounded-2xl border border-border bg-card p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{reviewName} <span className="text-xs font-normal text-muted-foreground">・{reviewCountry}</span></p>
                    <span className="flex items-center gap-0.5">{Array.from({ length: review.rating }).map((_, s) => <Star key={s} className="h-3.5 w-3.5 fill-yamabuki text-yamabuki" aria-hidden />)}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/80">{reviewComment}</p>
                </div>
              )
            })}
          </div>
        </Section>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-md gap-2.5">
          <button type="button" onClick={() => onMessage(guide)} className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary bg-card py-3 text-sm font-medium text-primary transition-colors active:bg-accent"><MessageCircle className="h-4 w-4" aria-hidden />{t('メッセージ', 'Message')}</button>
          <button type="button" className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-shu py-3 text-sm font-medium text-shu-foreground shadow-sm transition-transform active:scale-[0.98]"><Footprints className="h-4 w-4" aria-hidden />{t('一緒に歩く', 'Walk together')}</button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="mb-2 font-serif text-sm font-bold text-foreground">{title}</h2>{children}</section>
}
