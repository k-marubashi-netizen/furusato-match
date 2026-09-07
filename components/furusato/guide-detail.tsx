'use client'

import Image from 'next/image'
import { BadgeCheck, ChevronLeft, Footprints, MessageCircle, ShieldCheck, Sprout, Star, Wallet } from 'lucide-react'
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
        <button type="button" onClick={onBack} aria-label="戻る" className="absolute left-3 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur">
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="absolute bottom-3 left-4 right-4 text-primary-foreground">
          <div className="mb-1 flex flex-wrap gap-1.5">
            <OriginLabel origin={guide.origin} className="bg-card/90" />
            <span className="inline-flex items-center gap-1 rounded-full bg-card/90 px-2 py-0.5 text-[11px] font-medium text-primary">
              <BadgeCheck className="h-3 w-3" aria-hidden />本人確認済みガイド
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
            <p className="flex items-center gap-1 text-xs text-muted-foreground"><Wallet className="h-3.5 w-3.5 text-primary" aria-hidden />料金の目安</p>
            <p className="mt-1 font-serif text-sm font-bold text-foreground">1,500〜3,000円 / 回</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-3">
            <p className="flex items-center gap-1 text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />安心設計</p>
            <p className="mt-1 font-serif text-sm font-bold text-foreground">相互レビュー制</p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground"><Sprout className="h-4 w-4 text-primary" aria-hidden />地域の知識度</span>
            <span className="font-serif text-lg font-bold text-primary">Lv.{guide.level}</span>
          </div>
          <div className="mt-3 flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => <span key={i} className={`h-3 flex-1 rounded-full ${i < guide.level ? 'bg-primary' : 'bg-primary/15'}`} />)}
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">知識度は、交流を重ねて地域を学ぶほど育っていくパラメーターです。</p>
        </section>

        <section className="rounded-3xl bg-primary/5 p-4">
          <p className="text-xs font-medium text-primary">この交流の目的</p>
          <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">一方的に“日本のルールを教える”のではなく、文化・習慣の違いをお互いに知ること。対話から地域への理解を深めます。</p>
        </section>

        <Section title="得意テーマ">
          <div className="flex flex-wrap gap-1.5">{guide.themes.map((t) => <ThemeTag key={t} label={t} />)}</div>
        </Section>

        <Section title="対応言語">
          <div className="flex flex-wrap gap-1.5">{guide.languages.map((l) => <LanguageBadge key={l} label={l} />)}</div>
        </Section>

        <Section title="案内できること">
          <ul className="grid grid-cols-2 gap-2">
            {guide.offers.map((o) => <li key={o} className="rounded-2xl bg-secondary px-3 py-2.5 text-[13px] font-medium text-secondary-foreground">{o}</li>)}
          </ul>
        </Section>

        <Section title={`レビュー（${guide.reviewCount}件）`}>
          <div className="space-y-2.5">
            {guide.reviews.map((r, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{r.name} <span className="text-xs font-normal text-muted-foreground">・{r.country}</span></p>
                  <span className="flex items-center gap-0.5">{Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="h-3.5 w-3.5 fill-yamabuki text-yamabuki" aria-hidden />)}</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/80">{r.comment}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-md gap-2.5">
          <button type="button" onClick={() => onMessage(guide)} className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary bg-card py-3 text-sm font-medium text-primary transition-colors active:bg-accent"><MessageCircle className="h-4 w-4" aria-hidden />メッセージ</button>
          <button type="button" className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-shu py-3 text-sm font-medium text-shu-foreground shadow-sm transition-transform active:scale-[0.98]"><Footprints className="h-4 w-4" aria-hidden />一緒に歩く</button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="mb-2 font-serif text-sm font-bold text-foreground">{title}</h2>{children}</section>
}
