'use client'

import Image from 'next/image'
import { CalendarDays, MapPin, Plus, Users, Wallet, Handshake, BookOpen, Globe2 } from 'lucide-react'
import { events, type EventItem } from '@/lib/data'
import { ScreenHeader } from './screen-header'
import { useLanguage, type AppLanguage } from './language-context'

type EventLocale = {
  title: string
  date: string
  place: string
  capacity: string
  fee: string
  host: string
  hostArea: string
}

type NonJaLanguage = Exclude<AppLanguage, 'ja'>

const eventLocales: Record<string, Record<NonJaLanguage, EventLocale>> = {
  e1: {
    en: { title: 'Otari Satoyama Knowledge Exchange', date: 'Sat, Sep 20 · 3:00–5:00 PM', place: 'Otari Community Hall, Nagano', capacity: '20 people', fee: 'Free', host: 'Otari residents & nearby university students', hostArea: 'Mainly local and nearby participants' },
    zh: { title: '小谷里山知识交流会', date: '9月20日（周六）15:00–17:00', place: '长野县 小谷村社区会馆', capacity: '20人', fee: '免费', host: '小谷居民与附近大学生', hostArea: '以当地及周边参与者为主' },
    es: { title: 'Intercambio de conocimientos de satoyama en Otari', date: 'Sáb, 20 sep · 15:00–17:00', place: 'Centro comunitario de Otari, Nagano', capacity: '20 personas', fee: 'Gratis', host: 'Residentes de Otari y universitarios cercanos', hostArea: 'Principalmente participantes locales y cercanos' },
    de: { title: 'Satoyama-Wissensaustausch in Otari', date: 'Sa., 20. Sep. · 15:00–17:00', place: 'Gemeindezentrum Otari, Nagano', capacity: '20 Personen', fee: 'Kostenlos', host: 'Bewohner von Otari & Studierende aus der Umgebung', hostArea: 'Vor allem lokale und nahegelegene Teilnehmende' },
    fr: { title: 'Échange de savoirs satoyama à Otari', date: 'Sam. 20 sept. · 15:00–17:00', place: 'Maison communautaire d’Otari, Nagano', capacity: '20 personnes', fee: 'Gratuit', host: 'Habitants d’Otari et étudiants des environs', hostArea: 'Principalement des participants locaux et proches' },
    it: { title: 'Scambio di conoscenze sul satoyama a Otari', date: 'Sab 20 set · 15:00–17:00', place: 'Centro comunitario di Otari, Nagano', capacity: '20 persone', fee: 'Gratuito', host: 'Residenti di Otari e studenti universitari vicini', hostArea: 'Soprattutto partecipanti locali e dei dintorni' },
  },
  e2: {
    en: { title: 'Noto Morning Market & Food Culture Exchange', date: 'Sun, Sep 21 · 10:00 AM–12:00 PM', place: 'Noto Community Center, Ishikawa', capacity: '24 people', fee: '¥500', host: 'Noto residents & newcomer team', hostArea: 'Mainly local and nearby participants' },
    zh: { title: '能登早市与饮食文化交流会', date: '9月21日（周日）10:00–12:00', place: '石川县 能登社区中心', capacity: '24人', fee: '500日元', host: '能登居民与新居民团队', hostArea: '以当地及周边参与者为主' },
    es: { title: 'Mercado matinal y cultura gastronómica de Noto', date: 'Dom, 21 sep · 10:00–12:00', place: 'Centro comunitario de Noto, Ishikawa', capacity: '24 personas', fee: '¥500', host: 'Residentes de Noto y nuevos vecinos', hostArea: 'Principalmente participantes locales y cercanos' },
    de: { title: 'Noto-Morgenmarkt & Esskultur-Austausch', date: 'So., 21. Sep. · 10:00–12:00', place: 'Gemeindezentrum Noto, Ishikawa', capacity: '24 Personen', fee: '¥500', host: 'Bewohner von Noto & Zugezogene', hostArea: 'Vor allem lokale und nahegelegene Teilnehmende' },
    fr: { title: 'Marché du matin et culture culinaire de Noto', date: 'Dim. 21 sept. · 10:00–12:00', place: 'Centre communautaire de Noto, Ishikawa', capacity: '24 personnes', fee: '500 ¥', host: 'Habitants de Noto et nouveaux arrivants', hostArea: 'Principalement des participants locaux et proches' },
    it: { title: 'Mercato mattutino e cultura gastronomica di Noto', date: 'Dom 21 set · 10:00–12:00', place: 'Centro comunitario di Noto, Ishikawa', capacity: '24 persone', fee: '¥500', host: 'Residenti di Noto e nuovi abitanti', hostArea: 'Soprattutto partecipanti locali e dei dintorni' },
  },
  e3: {
    en: { title: 'Miyama Local Life & Manners Roundtable', date: 'Sat, Sep 27 · 6:00–7:30 PM', place: 'Miyama Community Exchange Hall, Kyoto', capacity: '30 people', fee: 'Free', host: 'Miyama intergenerational community members', hostArea: 'Residents, nearby students and visitors' },
    zh: { title: '美山生活与礼仪交流会', date: '9月27日（周六）18:00–19:30', place: '京都府 美山社区交流馆', capacity: '30人', fee: '免费', host: '美山跨世代社区成员', hostArea: '居民、附近学生与访客' },
    es: { title: 'Mesa redonda sobre vida local y modales en Miyama', date: 'Sáb, 27 sep · 18:00–19:30', place: 'Centro de intercambio comunitario de Miyama, Kioto', capacity: '30 personas', fee: 'Gratis', host: 'Miembros de distintas generaciones de Miyama', hostArea: 'Residentes, estudiantes cercanos y visitantes' },
    de: { title: 'Gesprächsrunde zu Alltag & Umgangsformen in Miyama', date: 'Sa., 27. Sep. · 18:00–19:30', place: 'Gemeinschaftshaus Miyama, Kyoto', capacity: '30 Personen', fee: 'Kostenlos', host: 'Mehrgenerationen-Gemeinschaft Miyama', hostArea: 'Bewohner, Studierende aus der Umgebung und Besucher' },
    fr: { title: 'Table ronde sur la vie locale et les usages à Miyama', date: 'Sam. 27 sept. · 18:00–19:30', place: 'Maison d’échange communautaire de Miyama, Kyoto', capacity: '30 personnes', fee: 'Gratuit', host: 'Membres de plusieurs générations de Miyama', hostArea: 'Habitants, étudiants des environs et visiteurs' },
    it: { title: 'Incontro su vita locale e buone maniere a Miyama', date: 'Sab 27 set · 18:00–19:30', place: 'Centro di scambio comunitario di Miyama, Kyoto', capacity: '30 persone', fee: 'Gratuito', host: 'Comunità intergenerazionale di Miyama', hostArea: 'Residenti, studenti vicini e visitatori' },
  },
}

const eventMeta: Record<string, {
  descriptionJa: string
  descriptionEn: string
  audienceJa: string
  audienceEn: string
  visitorJa: string
  visitorEn: string
}> = {
  e1: {
    descriptionJa: '雪国の暮らし、山菜、田畑、里山の歩き方。昔からの住民と近隣の学生が、地域の知恵を持ち寄って交換します。',
    descriptionEn: 'Residents and nearby students share knowledge about snowy-country life, wild plants, farming, and how people live with the satoyama landscape.',
    audienceJa: '地元住民・近隣の大学生や社会人', audienceEn: 'Residents, nearby students and workers',
    visitorJa: '外国人旅行者も「教わる側」として参加OK', visitorEn: 'International visitors are welcome to join as learners',
  },
  e2: {
    descriptionJa: '朝市での買い方、発酵食、家庭の味。昔からの住民と移住者が、それぞれの「知っている能登」を持ち寄ります。',
    descriptionEn: 'Longtime residents and newcomers compare what they know about the morning market, fermented foods, and everyday home cooking in Noto.',
    audienceJa: '地元住民・移住者・近隣の人', audienceEn: 'Residents, newcomers and nearby people',
    visitorJa: '旅行者も地域文化を学ぶ参加者として歓迎', visitorEn: 'Travelers are welcome as participants learning local culture',
  },
  e3: {
    descriptionJa: 'お風呂、季節の行事、ご近所づきあい。世代ごとに違う暮らしの知恵やマナーを語り合い、次の人へ残します。',
    descriptionEn: 'People of different generations talk about bathing culture, seasonal customs, neighborly life, and the local manners they want to pass on.',
    audienceJa: '地元住民・近隣学生・地域に関わる人', audienceEn: 'Residents, nearby students and people connected to the area',
    visitorJa: '外国人も質問しながら参加できます', visitorEn: 'International visitors can join, listen and ask questions',
  },
}

export function EventsScreen() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader
        title="地域の交流会"
        titleEn="Local Gatherings"
        subtitle="地元・近隣の人が知識を持ち寄る場所。外国人旅行者も、地域を学ぶ参加者として加われます。"
        subtitleEn="Local and nearby people share what they know. International visitors are welcome to join and learn."
      />

      <div className="px-4 pb-3 pt-2">
        <div className="mb-3 rounded-2xl border border-primary/15 bg-primary/5 p-3.5">
          <p className="flex items-center gap-1.5 text-xs font-bold text-primary"><Handshake className="h-4 w-4" aria-hidden />{t('主役は、地元・近隣の人たち', 'Led by local and nearby people')}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            {t('観光客向け体験会ではなく、住民・移住者・近隣の学生や社会人が、地域の文化・暮らし・自然の知恵を交換する場です。', 'These are not tourist-only experiences. Residents, newcomers, nearby students, and workers exchange local culture, everyday knowledge, and nature-related wisdom.')}
          </p>
        </div>
        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow-sm transition-transform active:scale-[0.99]">
          <Plus className="h-4 w-4" aria-hidden />{t('知識交換会を開く（主催する）', 'Host a local knowledge exchange')}
        </button>
      </div>

      <div className="space-y-4 px-4">
        {events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  )
}

function EventCard({ event }: { event: EventItem }) {
  const { lang, t } = useLanguage()
  const meta = eventMeta[event.id]
  const locale = lang === 'ja' ? null : eventLocales[event.id]?.[lang]
  const title = locale?.title ?? event.title
  const date = locale?.date ?? event.date
  const place = locale?.place ?? event.place
  const capacity = locale?.capacity ?? event.capacity
  const fee = locale?.fee ?? event.fee
  const host = locale?.host ?? event.host
  const hostArea = locale?.hostArea ?? event.hostArea
  const description = lang === 'ja' ? meta.descriptionJa : meta.descriptionEn
  const audience = lang === 'ja' ? meta.audienceJa : meta.audienceEn
  const visitor = lang === 'ja' ? meta.visitorJa : meta.visitorEn

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="relative h-36 w-full">
        <Image src={event.image || '/placeholder.svg'} alt={title} fill className="object-cover" sizes="100vw" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-card/92 px-2.5 py-1 text-[11px] font-bold text-primary backdrop-blur">{t('地元・近隣メイン', 'Local-led')}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-card/92 px-2.5 py-1 text-[11px] font-bold text-primary backdrop-blur"><Globe2 className="h-3 w-3" aria-hidden />{t('旅行者参加OK', 'Visitors welcome')}</span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-serif text-lg font-bold text-foreground">{title}</h2>
        <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{description}</p>

        <div className="mt-3 rounded-2xl bg-secondary p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-secondary-foreground"><BookOpen className="h-3.5 w-3.5 text-primary" aria-hidden />{t('こんな人が中心', 'Who mainly joins')}</p>
          <p className="mt-1 text-[12px] text-secondary-foreground/80">{audience}</p>
          <p className="mt-1 text-[11px] text-primary">{visitor}</p>
        </div>

        <dl className="mt-3 space-y-1.5 text-[13px] text-foreground/80">
          <Row icon={CalendarDays}>{date}</Row>
          <Row icon={MapPin}>{place}</Row>
          <Row icon={Users}>{capacity}</Row>
          <Row icon={Wallet}>{fee}</Row>
        </dl>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{t('主催：', 'Host: ')}{host}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{hostArea}</p>
          </div>
          <button type="button" className="shrink-0 rounded-full bg-shu px-5 py-2 text-sm font-medium text-shu-foreground transition-transform active:scale-95">{t('参加する', 'Join')}</button>
        </div>
      </div>
    </article>
  )
}

function Row({ icon: Icon, children }: { icon: typeof CalendarDays; children: React.ReactNode }) {
  return <div className="flex items-center gap-2"><Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden /><dd>{children}</dd></div>
}
