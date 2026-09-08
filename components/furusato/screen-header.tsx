'use client'

import { Home } from 'lucide-react'
import { LanguageToggle, useLanguage } from './language-context'
import { localize, type LocalizedText } from './locale-utils'

const titleTranslations: Record<string, LocalizedText> = {
  イベント: { ja: 'イベント', en: 'Events', zh: '活动', es: 'Eventos', de: 'Events', fr: 'Événements', it: 'Eventi' },
  メッセージ: { ja: 'メッセージ', en: 'Messages', zh: '消息', es: 'Mensajes', de: 'Nachrichten', fr: 'Messages', it: 'Messaggi' },
  マイページ: { ja: 'マイページ', en: 'My Page', zh: '我的主页', es: 'Mi perfil', de: 'Mein Profil', fr: 'Mon profil', it: 'Il mio profilo' },
  地域の交流会: { ja: '地域の交流会', en: 'Local Gatherings', zh: '当地交流会', es: 'Encuentros locales', de: 'Lokale Treffen', fr: 'Rencontres locales', it: 'Incontri locali' },
}

const subtitleTranslations: Record<string, LocalizedText> = {
  '地域の人と旅行者が、実際に会って一緒に過ごす。興味に合う交流を選べます。': {
    ja: '地域の人と旅行者が、実際に会って一緒に過ごす。興味に合う交流を選べます。',
    en: 'Meet local people in person and choose the kind of exchange that fits your trip.',
    zh: '与当地人真正见面并一起度过时间，选择适合自己的交流方式。',
    es: 'Conoce a gente local en persona y elige el tipo de intercambio que encaje con tu viaje.',
    de: 'Triff Menschen vor Ort persönlich und wähle die Begegnung, die zu deiner Reise passt.',
    fr: 'Rencontrez les habitants en personne et choisissez le type d’échange qui correspond à votre voyage.',
    it: 'Incontra le persone del posto e scegli il tipo di scambio più adatto al tuo viaggio.',
  },
  'ガイドにも、旅人にも。フォローからDMへつながります。': {
    ja: 'ガイドにも、旅人にも。フォローからDMへつながります。',
    en: 'Message guides and fellow travelers. A follow can become a conversation.',
    zh: '可以给向导和其他旅人发消息，从关注开始一段交流。',
    es: 'Escribe a guías y otros viajeros. Un seguimiento puede convertirse en una conversación.',
    de: 'Schreibe Guides und anderen Reisenden. Aus einem Follow kann ein Gespräch werden.',
    fr: 'Écrivez aux guides et aux autres voyageurs. Un abonnement peut devenir une conversation.',
    it: 'Scrivi a guide e altri viaggiatori. Da un follow può nascere una conversazione.',
  },
  'あなたも、いつか誰かの「ふるさとガイド」に。': {
    ja: 'あなたも、いつか誰かの「ふるさとガイド」に。',
    en: "Learn the place, build relationships, and one day become someone else's Furusato Guide.",
    zh: '了解一个地方、建立关系，有一天你也可以成为别人的“故乡向导”。',
    es: 'Conoce el lugar, crea vínculos y algún día conviértete en el guía Furusato de otra persona.',
    de: 'Lerne den Ort kennen, baue Beziehungen auf und werde eines Tages selbst Furusato-Guide.',
    fr: 'Découvrez le lieu, créez des liens et devenez un jour le guide Furusato de quelqu’un.',
    it: 'Conosci il luogo, crea legami e un giorno diventa la guida Furusato di qualcun altro.',
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
  const { lang } = useLanguage()
  const localizedTitle = titleTranslations[title]
    ? localize(lang, titleTranslations[title])
    : lang === 'ja'
      ? title
      : titleEn ?? title
  const localizedSubtitle = subtitle
    ? subtitleTranslations[subtitle]
      ? localize(lang, subtitleTranslations[subtitle])
      : lang === 'ja'
        ? subtitle
        : subtitleEn ?? subtitle
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
        {localizedSubtitle && <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-muted-foreground">{localizedSubtitle}</p>}
      </div>
    </header>
  )
}
