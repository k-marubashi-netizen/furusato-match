'use client'

import Image from 'next/image'
import { BadgeCheck, ChevronLeft, Footprints, MessageCircle, ShieldCheck, Sprout, Star, Wallet } from 'lucide-react'
import type { Guide } from '@/lib/data'
import { LanguageBadge, OriginLabel, ThemeTag } from './badges'
import { LanguageToggle, useLanguage } from './language-context'

const offerEn: Record<string, string> = {
  '里山の歩き方': 'Walking the satoyama',
  '郷土料理づくり': 'Local cooking',
  '雪国の暮らし': 'Life in snow country',
  '地域のマナー': 'Local manners',
  '朝市めぐり': 'Morning market walk',
  '海辺の暮らし': 'Coastal life',
  '発酵食づくり': 'Fermented food making',
  '文化のはなし': 'Local culture stories',
  'お茶畑の見学': 'Tea field visit',
  '市場のあるき方': 'How to enjoy the market',
  '郷土の味めぐり': 'Local food tasting',
  'かやぶき集落めぐり': 'Thatched-roof village walk',
  '季節の行事': 'Seasonal traditions',
  '和のマナー': 'Japanese manners',
  '暮らしの知恵': 'Everyday local wisdom',
}

export function GuideDetail({
  guide,
  onBack,
  onMessage,
}: {
  guide: Guide
  onBack: () => void
  onMessage: (guide: Guide) => void
}) {
  const { lang, t } = useLanguage()

  return (
    <div className="flex flex-col pb-28">
      <div className="relative h-60 w-full">
        <Image src={guide.photo || '/placeholder.svg'} alt={`${guide.name} profile`} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
        <button type="button" onClick={onBack} aria-label={t('戻る', 'Back')} className="absolute left-3 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/92 text-foreground shadow-sm backdrop-blur">
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <LanguageToggle className="absolute right-3 top-4 bg-card/92" />
        <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
          <div className="mb-2 flex flex-wrap gap-1.5">
            <OriginLabel origin={guide.origin} className="bg-card/92" />
            <span className="inline-flex items-center gap-1 rounded-full bg-card/92 px-2 py-0.5 text-[11px] font-bold text-primary">
              <BadgeCheck className="h-3 w-3" aria-hidden />{t('本人確認済みガイド', 'Verified guide')}
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold">{guide.name}</h1>
          <p className="text-sm opacity-90">{guide.kana}・{guide.area}</p>
        </div>
      </div>

      <div className="space-y-5 px-4 pt-4">
        <p className="text-sm leading-relaxed text-foreground/85">{guide.intro}</p>

        <section className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-border bg-card p-3">
            <p className="flex items-center gap-1 text-xs text-muted-foreground"><Wallet className="h-3.5 w-3.5 text-primary" aria-hidden />{t('料金の目安', 'Typical fee')}</p>
            <p className="mt-1 font-serif text-sm font-bold text-foreground">¥1,500–3,000 / {t('回', 'session')}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-3">
            <p className="flex items-center gap-1 text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />{t('安心設計', 'Safety')}</p>
            <p className="mt-1 font-serif text-sm font-bold text-foreground">{t('相互レビュー制', 'Mutual reviews')}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-bold text-foreground"><Sprout className="h-4 w-4 text-primary" aria-hidden />{t('地域の知識度', 'Local knowledge')}</span>
            <span className="font-serif text-lg font-bold text-primary">Lv.{guide.level}</span>
          </div>
          <div className="mt-3 flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => <span key={i} className={`h-3 flex-1 rounded-full ${i < guide.level ? 'bg-primary' : 'bg-primary/15'}`} />)}
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{t('知識度は、交流を重ねて地域を学ぶほど育っていくパラメーターです。', 'Local knowledge grows as you spend time with people and learn about the community.')}</p>
        </section>

        <section className="rounded-3xl bg-primary/5 p-4">
          <p className="text-xs font-bold text-primary">{t('この交流の目的', 'Purpose of the exchange')}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">{t('一方的に“日本のルールを教える”のではなく、文化・習慣の違いをお互いに知ること。対話から地域への理解を深めます。', 'This is not about one-way instruction. It is about understanding differences in culture and customs through conversation.')}</p>
        </section>

        <Section title={t('得意テーマ', 'Local expertise')}>
          <div className="flex flex-wrap gap-1.5">{guide.themes.map((item) => <ThemeTag key={item} label={item} />)}</div>
        </Section>

        <Section title={t('対応言語', 'Languages')}>
          <div className="flex flex-wrap gap-1.5">{guide.languages.map((item) => <LanguageBadge key={item} label={item} />)}</div>
        </Section>

        <Section title={t('案内できること', 'What we can do together')}>
          <ul className="grid grid-cols-2 gap-2">
            {guide.offers.map((offer) => <li key={offer} className="rounded-2xl bg-secondary px-3 py-2.5 text-[13px] font-medium text-secondary-foreground">{lang === 'en' ? offerEn[offer] ?? offer : offer}</li>)}
          </ul>
        </Section>

        <Section title={t(`レビュー（${guide.reviewCount}件）`, `Reviews (${guide.reviewCount})`)}>
          <div className="space-y-2.5">
            {guide.reviews.map((review, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{review.name} <span className="text-xs font-normal text-muted-foreground">・{review.country}</span></p>
                  <span className="flex items-center gap-0.5">{Array.from({ length: review.rating }).map((_, s) => <Star key={s} className="h-3.5 w-3.5 fill-yamabuki text-yamabuki" aria-hidden />)}</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/80">{review.comment}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-md gap-2.5">
          <button type="button" onClick={() => onMessage(guide)} className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary bg-card py-3 text-sm font-bold text-primary transition-colors active:bg-accent"><MessageCircle className="h-4 w-4" aria-hidden />{t('メッセージ', 'Message')}</button>
          <button type="button" className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-shu py-3 text-sm font-bold text-shu-foreground shadow-sm transition-transform active:scale-[0.98]"><Footprints className="h-4 w-4" aria-hidden />{t('一緒に歩く', 'Walk together')}</button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="mb-2 font-serif text-sm font-bold text-foreground">{title}</h2>{children}</section>
}
