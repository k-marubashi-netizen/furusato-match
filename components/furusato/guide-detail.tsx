'use client'

import Image from 'next/image'
import { BadgeCheck, ChevronLeft, Footprints, MessageCircle, ShieldCheck, Sprout, Star, Wallet } from 'lucide-react'
import type { Guide } from '@/lib/data'
import { LanguageBadge, OriginLabel, ThemeTag } from './badges'
import { useLanguage } from './language-context'
import { localize } from './locale-utils'
import { guideCopy, guideYears } from './profile-locales'
import { guideDetailCopy } from './guide-detail-locales'

export function GuideDetail({ guide, onBack, onMessage }: { guide: Guide; onBack: () => void; onMessage: (guide: Guide) => void }) {
  const { lang } = useLanguage()
  const profile = guideCopy[guide.id]
  const detail = guideDetailCopy[guide.id]
  const name = lang === 'ja' ? guide.name : profile?.name ?? guide.name
  const area = profile ? localize(lang, profile.area) : guide.area
  const intro = profile ? localize(lang, profile.intro) : guide.intro

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
            <OriginLabel origin={guide.origin} years={guideYears[guide.id]} className="bg-card/90" />
            <span className="inline-flex items-center gap-1 rounded-full bg-card/90 px-2 py-0.5 text-[11px] font-medium text-primary">
              <BadgeCheck className="h-3 w-3" aria-hidden />
              {localize(lang, { ja: '本人確認済みガイド', en: 'Verified guide', zh: '已验证向导', es: 'Guía verificado', de: 'Verifizierter Guide', fr: 'Guide vérifié', it: 'Guida verificata' })}
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
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Wallet className="h-3.5 w-3.5 text-primary" aria-hidden />
              {localize(lang, { ja: '料金の目安', en: 'Typical fee', zh: '参考费用', es: 'Precio orientativo', de: 'Richtpreis', fr: 'Tarif indicatif', it: 'Costo indicativo' })}
            </p>
            <p className="mt-1 font-serif text-sm font-bold text-foreground">¥1,500–3,000</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-3">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
              {localize(lang, { ja: '安心設計', en: 'Trust & safety', zh: '安全与信任', es: 'Confianza y seguridad', de: 'Vertrauen & Sicherheit', fr: 'Confiance et sécurité', it: 'Fiducia e sicurezza' })}
            </p>
            <p className="mt-1 font-serif text-sm font-bold text-foreground">
              {localize(lang, { ja: '相互レビュー制', en: 'Two-way reviews', zh: '双向评价', es: 'Reseñas mutuas', de: 'Beidseitige Bewertungen', fr: 'Avis réciproques', it: 'Recensioni reciproche' })}
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Sprout className="h-4 w-4 text-primary" aria-hidden />
              {localize(lang, { ja: '地域の知識度', en: 'Local knowledge', zh: '当地知识度', es: 'Conocimiento local', de: 'Lokalkenntnis', fr: 'Connaissance locale', it: 'Conoscenza locale' })}
            </span>
            <span className="font-serif text-lg font-bold text-primary">Lv.{guide.level}</span>
          </div>
          <div className="mt-3 flex gap-1.5">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={`h-3 flex-1 rounded-full ${i < guide.level ? 'bg-primary' : 'bg-primary/15'}`} />)}</div>
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
            {localize(lang, { ja: '交流を重ね、地域を学ぶほど知識度が育ちます。', en: 'Local knowledge grows as you learn through repeated exchanges.', zh: '交流越多、越了解当地，知识度就会提升。', es: 'El conocimiento local crece a medida que aprendes a través de los intercambios.', de: 'Deine Lokalkenntnis wächst mit jeder Begegnung und jedem neuen Wissen.', fr: 'La connaissance locale progresse au fil des échanges et des apprentissages.', it: 'La conoscenza locale cresce con gli scambi e con ciò che impari.' })}
          </p>
        </section>

        <section className="rounded-3xl bg-primary/5 p-4">
          <p className="text-xs font-medium text-primary">
            {localize(lang, { ja: 'この交流の目的', en: 'Purpose of the exchange', zh: '交流的目的', es: 'Objetivo del intercambio', de: 'Ziel des Austauschs', fr: 'But de l’échange', it: 'Scopo dello scambio' })}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">
            {localize(lang, { ja: '一方的に日本のルールを教えるのではなく、文化や習慣の違いをお互いに知ること。対話から地域への理解を深めます。', en: 'This is not one-way rule teaching. It is about understanding differences in culture and customs through conversation.', zh: '不是单方面教授日本规则，而是通过对话互相理解文化与习惯的差异。', es: 'No se trata de enseñar reglas en una sola dirección, sino de comprender las diferencias culturales mediante la conversación.', de: 'Es geht nicht um einseitiges Belehren, sondern darum, kulturelle Unterschiede im Gespräch zu verstehen.', fr: 'Il ne s’agit pas d’imposer des règles, mais de comprendre les différences culturelles par le dialogue.', it: 'Non si tratta di insegnare regole in modo unidirezionale, ma di capire le differenze culturali attraverso il dialogo.' })}
          </p>
        </section>

        <Section title={localize(lang, { ja: '得意テーマ', en: 'Local expertise', zh: '擅长主题', es: 'Especialidades', de: 'Schwerpunkte', fr: 'Spécialités locales', it: 'Specialità locali' })}>
          <div className="flex flex-wrap gap-1.5">{guide.themes.map((item) => <ThemeTag key={item} label={item} />)}</div>
        </Section>

        <Section title={localize(lang, { ja: '対応言語', en: 'Languages', zh: '支持语言', es: 'Idiomas', de: 'Sprachen', fr: 'Langues', it: 'Lingue' })}>
          <div className="flex flex-wrap gap-1.5">{guide.languages.map((item) => <LanguageBadge key={item} label={item} />)}</div>
        </Section>

        <Section title={localize(lang, { ja: '案内できること', en: 'What we can do together', zh: '可以一起做的事', es: 'Qué podemos hacer', de: 'Was wir gemeinsam machen können', fr: 'Ce que nous pouvons faire ensemble', it: 'Cosa possiamo fare insieme' })}>
          <ul className="grid grid-cols-2 gap-2">
            {(detail?.offers ?? []).map((item) => <li key={item.ja} className="rounded-2xl bg-secondary px-3 py-2.5 text-[13px] font-medium text-secondary-foreground">{localize(lang, item)}</li>)}
          </ul>
        </Section>

        <Section title={localize(lang, { ja: `レビュー（${guide.reviewCount}件）`, en: `Reviews (${guide.reviewCount})`, zh: `评价（${guide.reviewCount}）`, es: `Reseñas (${guide.reviewCount})`, de: `Bewertungen (${guide.reviewCount})`, fr: `Avis (${guide.reviewCount})`, it: `Recensioni (${guide.reviewCount})` })}>
          <div className="space-y-2.5">
            {(detail?.reviews ?? []).map((review, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{review.name} <span className="text-xs font-normal text-muted-foreground">・{localize(lang, review.country)}</span></p>
                  <span className="flex items-center gap-0.5">{Array.from({ length: guide.reviews[i]?.rating ?? 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5 fill-yamabuki text-yamabuki" aria-hidden />)}</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/80">{localize(lang, review.comment)}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-md gap-2.5">
          <button type="button" onClick={() => onMessage(guide)} className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary bg-card py-3 text-sm font-medium text-primary transition-colors active:bg-accent">
            <MessageCircle className="h-4 w-4" aria-hidden />
            {localize(lang, { ja: 'メッセージ', en: 'Message', zh: '消息', es: 'Mensaje', de: 'Nachricht', fr: 'Message', it: 'Messaggio' })}
          </button>
          <button type="button" className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-shu py-3 text-sm font-medium text-shu-foreground shadow-sm transition-transform active:scale-[0.98]">
            <Footprints className="h-4 w-4" aria-hidden />
            {localize(lang, { ja: '一緒に歩く', en: 'Walk together', zh: '一起走走', es: 'Caminar juntos', de: 'Gemeinsam unterwegs', fr: 'Marcher ensemble', it: 'Camminare insieme' })}
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="mb-2 font-serif text-sm font-bold text-foreground">{title}</h2>{children}</section>
}
