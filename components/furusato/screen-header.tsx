'use client'

import { Home } from 'lucide-react'
import { LanguageToggle, useLanguage, type AppLanguage } from './language-context'

const titleTranslations: Record<string, Partial<Record<AppLanguage, string>>> = {
  '地域の交流会': { en: 'Local Gatherings', zh: '当地交流会', es: 'Encuentros locales', de: 'Lokale Treffen', fr: 'Rencontres locales', it: 'Incontri locali' },
  'メッセージ': { en: 'Messages', zh: '消息', es: 'Mensajes', de: 'Nachrichten', fr: 'Messages', it: 'Messaggi' },
  'マイページ': { en: 'My Page', zh: '我的页面', es: 'Mi página', de: 'Mein Bereich', fr: 'Mon espace', it: 'Il mio profilo' },
}

const subtitleTranslations: Record<string, Partial<Record<AppLanguage, string>>> = {
  '言葉が違っても、気持ちは翻訳できる。': {
    en: 'Different languages, same feelings — translation helps us connect.',
    zh: '语言不同，心意也能被翻译。',
    es: 'Idiomas distintos, sentimientos compartidos: la traducción nos conecta.',
    de: 'Andere Sprachen, gleiche Gefühle – Übersetzung verbindet.',
    fr: 'Des langues différentes, des émotions partagées : la traduction nous rapproche.',
    it: 'Lingue diverse, emozioni condivise: la traduzione ci avvicina.',
  },
  'あなたも、いつか誰かの「ふるさとガイド」に。': {
    en: 'One day, you can become someone else’s Furusato Guide.',
    zh: '有一天，你也可以成为别人的“故乡向导”。',
    es: 'Algún día, tú también podrás ser el guía Furusato de otra persona.',
    de: 'Eines Tages kannst auch du für jemand anderen ein Furusato-Guide sein.',
    fr: 'Un jour, vous pourrez vous aussi devenir le guide Furusato de quelqu’un.',
    it: 'Un giorno anche tu potrai diventare la guida Furusato di qualcun altro.',
  },
  '地元・近隣の人が知識を持ち寄る場所。外国人旅行者も、地域を学ぶ参加者として加われます。': {
    en: 'Local and nearby people share what they know. International visitors are welcome to join and learn.',
    zh: '当地和周边的人分享彼此的知识，外国旅人也可以作为学习者参加。',
    es: 'Personas locales y cercanas comparten lo que saben. Los viajeros internacionales también pueden participar para aprender.',
    de: 'Menschen aus der Region und Umgebung teilen ihr Wissen. Internationale Reisende können zum Lernen teilnehmen.',
    fr: 'Les habitants et les personnes des environs partagent leurs connaissances. Les voyageurs internationaux peuvent aussi participer pour apprendre.',
    it: 'Persone locali e dei dintorni condividono ciò che sanno. Anche i viaggiatori internazionali possono partecipare per imparare.',
  },
}

export function ScreenHeader({
  title,
  titleEn,
  subtitle,
  subtitleEn,
}: {
  title: string
  titleEn?: string
  subtitle?: string
  subtitleEn?: string
}) {
  const { lang, t } = useLanguage()
  const localizedTitle = lang === 'ja' ? title : titleTranslations[title]?.[lang] ?? t(title, titleEn ?? title)
  const localizedSubtitle = subtitle
    ? lang === 'ja'
      ? subtitle
      : subtitleTranslations[subtitle]?.[lang] ?? t(subtitle, subtitleEn ?? subtitle)
    : undefined

  return (
    <header className="px-4 pb-2 pt-4">
      <div className="rounded-2xl border border-border/70 bg-card/95 px-3.5 py-3 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Home className="h-4 w-4" aria-hidden />
          </span>
          <p className="whitespace-nowrap font-serif text-[15px] font-bold leading-none text-foreground">ふるさとマッチ</p>
          <span className="ml-auto hidden text-[9px] font-semibold tracking-[0.14em] text-primary min-[370px]:block">FURUSATO MATCH</span>
        </div>
        <div className="mt-2.5 flex justify-end border-t border-border/60 pt-2.5">
          <LanguageToggle />
        </div>
      </div>

      <div className="pt-4">
        <h1 className="text-balance font-serif text-[25px] font-bold leading-tight text-foreground">{localizedTitle}</h1>
        {localizedSubtitle && (
          <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-muted-foreground">{localizedSubtitle}</p>
        )}
      </div>
    </header>
  )
}
