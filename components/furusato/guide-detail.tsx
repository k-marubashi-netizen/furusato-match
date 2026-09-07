'use client'

import Image from 'next/image'
import { ChevronLeft, Footprints, MessageCircle, Sprout, Star } from 'lucide-react'
import type { Guide } from '@/lib/data'
import { LanguageBadge, OriginLabel, ThemeTag } from './badges'

export function GuideDetail({
  guide,
  onBack,
  onMessage,
}: {
  guide: Guide
  onBack: () => void
  onMessage: (guide: Guide) => void
}) {
  return (
    <div className="flex flex-col pb-28">
      <div className="relative h-56 w-full">
        <Image src={guide.photo || '/placeholder.svg'} alt={`${guide.name}さんの写真`} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
        <button
          type="button"
          onClick={onBack}
          aria-label="戻る"
          className="absolute left-3 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="absolute bottom-3 left-4 right-4 text-primary-foreground">
          <div className="mb-1">
            <OriginLabel origin={guide.origin} className="bg-card/90" />
          </div>
          <h1 className="font-serif text-2xl font-bold">{guide.name}</h1>
          <p className="text-sm opacity-90">{guide.kana}・{guide.area}</p>
        </div>
      </div>

      <div className="space-y-5 px-4 pt-4">
        <p className="text-sm leading-relaxed text-foreground/85">{guide.intro}</p>

        {/* 知識度ゲージ (large) */}
        <section className="rounded-3xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Sprout className="h-4 w-4 text-primary" aria-hidden />
              地域の知識度
            </span>
            <span className="font-serif text-lg font-bold text-primary">Lv.{guide.level}</span>
          </div>
          <div className="mt-3 flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-3 flex-1 rounded-full ${i < guide.level ? 'bg-primary' : 'bg-primary/15'}`}
              />
            ))}
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
            知識度は、交流を重ねて地域を学ぶほど育っていくパラメーターです。
          </p>
        </section>

        <Section title="得意テーマ">
          <div className="flex flex-wrap gap-1.5">
            {guide.themes.map((t) => (
              <ThemeTag key={t} label={t} />
            ))}
          </div>
        </Section>

        <Section title="対応言語">
          <div className="flex flex-wrap gap-1.5">
            {guide.languages.map((l) => (
              <LanguageBadge key={l} label={l} />
            ))}
          </div>
        </Section>

        <Section title="案内できること">
          <ul className="grid grid-cols-2 gap-2">
            {guide.offers.map((o) => (
              <li key={o} className="rounded-2xl bg-secondary px-3 py-2.5 text-[13px] font-medium text-secondary-foreground">
                {o}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={`レビュー（${guide.reviewCount}件）`}>
          <div className="space-y-2.5">
            {guide.reviews.map((r, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {r.name} <span className="text-xs font-normal text-muted-foreground">・{r.country}</span>
                  </p>
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: r.rating }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-yamabuki text-yamabuki" aria-hidden />
                    ))}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/80">{r.comment}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Sticky action bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-md gap-2.5">
          <button
            type="button"
            onClick={() => onMessage(guide)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary bg-card py-3 text-sm font-medium text-primary transition-colors active:bg-accent"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            メッセージを送る
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-shu py-3 text-sm font-medium text-shu-foreground shadow-sm transition-transform active:scale-[0.98]"
          >
            <Footprints className="h-4 w-4" aria-hidden />
            一緒に歩くリクエスト
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 font-serif text-sm font-bold text-foreground">{title}</h2>
      {children}
    </section>
  )
}
