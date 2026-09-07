'use client'

import Image from 'next/image'
import { CalendarDays, MapPin, Plus, Users, Wallet, Handshake, BookOpen, Globe2 } from 'lucide-react'
import { events, type EventItem } from '@/lib/data'
import { ScreenHeader } from './screen-header'
import { useLanguage } from './language-context'

const eventMeta: Record<string, {
  titleEn: string
  dateEn: string
  placeEn: string
  capacityEn: string
  feeEn: string
  hostEn: string
  hostAreaEn: string
  descriptionJa: string
  descriptionEn: string
  audienceJa: string
  audienceEn: string
  visitorJa: string
  visitorEn: string
}> = {
  e1: {
    titleEn: 'Otari Satoyama Knowledge Exchange',
    dateEn: 'Sat, Sep 20 · 3:00–5:00 PM',
    placeEn: 'Otari Community Hall, Nagano',
    capacityEn: '20 people',
    feeEn: 'Free',
    hostEn: 'Otari residents & nearby university students',
    hostAreaEn: 'Mainly local and nearby participants',
    descriptionJa: '雪国の暮らし、山菜、田畑、里山の歩き方。昔からの住民と近隣の学生が、地域の知恵を持ち寄って交換します。',
    descriptionEn: 'Residents and nearby students share knowledge about snowy-country life, wild plants, farming, and how people live with the satoyama landscape.',
    audienceJa: '地元住民・近隣の大学生や社会人',
    audienceEn: 'Residents, nearby students and workers',
    visitorJa: '外国人旅行者も「教わる側」として参加OK',
    visitorEn: 'International visitors are welcome to join as learners',
  },
  e2: {
    titleEn: 'Noto Morning Market & Food Culture Exchange',
    dateEn: 'Sun, Sep 21 · 10:00 AM–12:00 PM',
    placeEn: 'Noto Community Center, Ishikawa',
    capacityEn: '24 people',
    feeEn: '¥500',
    hostEn: 'Noto residents & newcomer team',
    hostAreaEn: 'Mainly local and nearby participants',
    descriptionJa: '朝市での買い方、発酵食、家庭の味。昔からの住民と移住者が、それぞれの「知っている能登」を持ち寄ります。',
    descriptionEn: 'Longtime residents and newcomers compare what they know about the morning market, fermented foods, and everyday home cooking in Noto.',
    audienceJa: '地元住民・移住者・近隣の人',
    audienceEn: 'Residents, newcomers and nearby people',
    visitorJa: '旅行者も地域文化を学ぶ参加者として歓迎',
    visitorEn: 'Travelers are welcome as participants learning local culture',
  },
  e3: {
    titleEn: 'Miyama Local Life & Manners Roundtable',
    dateEn: 'Sat, Sep 27 · 6:00–7:30 PM',
    placeEn: 'Miyama Community Exchange Hall, Kyoto',
    capacityEn: '30 people',
    feeEn: 'Free',
    hostEn: 'Miyama intergenerational community members',
    hostAreaEn: 'Residents, nearby students and visitors',
    descriptionJa: 'お風呂、季節の行事、ご近所づきあい。世代ごとに違う暮らしの知恵やマナーを語り合い、次の人へ残します。',
    descriptionEn: 'People of different generations talk about bathing culture, seasonal customs, neighborly life, and the local manners they want to pass on.',
    audienceJa: '地元住民・近隣学生・地域に関わる人',
    audienceEn: 'Residents, nearby students and people connected to the area',
    visitorJa: '外国人も質問しながら参加できます',
    visitorEn: 'International visitors can join, listen and ask questions',
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
  const title = lang === 'en' ? meta.titleEn : event.title
  const date = lang === 'en' ? meta.dateEn : event.date
  const place = lang === 'en' ? meta.placeEn : event.place
  const capacity = lang === 'en' ? meta.capacityEn : event.capacity
  const fee = lang === 'en' ? meta.feeEn : event.fee
  const host = lang === 'en' ? meta.hostEn : event.host
  const hostArea = lang === 'en' ? meta.hostAreaEn : event.hostArea
  const description = lang === 'en' ? meta.descriptionEn : meta.descriptionJa
  const audience = lang === 'en' ? meta.audienceEn : meta.audienceJa
  const visitor = lang === 'en' ? meta.visitorEn : meta.visitorJa

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
