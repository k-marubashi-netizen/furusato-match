'use client'

import Image from 'next/image'
import { CalendarDays, MapPin, Plus, Users, Wallet, Handshake, Leaf } from 'lucide-react'
import { events, type EventItem } from '@/lib/data'
import { ScreenHeader } from './screen-header'
import { useLanguage } from './language-context'

const eventEn: Record<string, { title: string; date: string; place: string; capacity: string; fee: string; host: string; hostArea: string }> = {
  e1: {
    title: 'Walk the Rice-Field Paths',
    date: 'Sat, Sep 20 · 3:00–5:00 PM',
    place: 'Otari, Nagano',
    capacity: '8 people',
    fee: '¥1,500',
    host: 'Makoto Yamaguchi',
    hostArea: 'Furusato Guide in Otari',
  },
  e2: {
    title: 'Explore the Local Morning Market',
    date: 'Sun, Sep 21 · 7:00–9:00 AM',
    place: 'Noto, Ishikawa',
    capacity: '6 people',
    fee: '¥2,000',
    host: 'Sayaka Tamura',
    hostArea: 'Furusato Guide in Noto',
  },
  e3: {
    title: 'Onsen Manners Experience',
    date: 'Sat, Sep 27 · 6:00–7:30 PM',
    place: 'Miyama, Kyoto',
    capacity: '10 people',
    fee: 'Free',
    host: 'Hisako Kobayashi',
    hostArea: 'Furusato Guide in Miyama',
  },
}

export function EventsScreen() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader title={t('イベント', 'Events')} subtitle={t('アプリで集まり、地域で実際に会う。ここから「ふるさと」が始まる。', 'Meet through the app, then connect face-to-face in the community.')} />

      <div className="px-4 pb-3 pt-2">
        <div className="mb-3 rounded-2xl bg-primary/5 p-3">
          <p className="flex items-center gap-1.5 text-xs font-medium text-primary"><Handshake className="h-4 w-4" aria-hidden />{t('対面交流が中心のイベント', 'In-person local experiences')}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{t('地域の人と顔を合わせ、暮らし・文化・自然を一緒に体験します。', 'Meet local people and experience everyday life, culture, and nature together.')}</p>
        </div>
        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow-sm transition-transform active:scale-[0.99]">
          <Plus className="h-4 w-4" aria-hidden />{t('イベントを開く（主催する）', 'Host an event')}
        </button>
      </div>

      <div className="space-y-4 px-4">
        {events.map((event, index) => <EventCard key={event.id} event={event} nature={index === 0} />)}
      </div>
    </div>
  )
}

function EventCard({ event, nature }: { event: EventItem; nature?: boolean }) {
  const { lang, t } = useLanguage()
  const en = eventEn[event.id]
  const title = lang === 'en' ? en.title : event.title
  const date = lang === 'en' ? en.date : event.date
  const place = lang === 'en' ? en.place : event.place
  const capacity = lang === 'en' ? en.capacity : event.capacity
  const fee = lang === 'en' ? en.fee : event.fee
  const host = lang === 'en' ? en.host : event.host
  const hostArea = lang === 'en' ? en.hostArea : event.hostArea

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="relative h-36 w-full">
        <Image src={event.image || '/placeholder.svg'} alt={title} fill className="object-cover" sizes="100vw" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-medium text-primary backdrop-blur">{t('対面', 'In person')}</span>
          {nature && <span className="inline-flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-medium text-primary backdrop-blur"><Leaf className="h-3 w-3" aria-hidden />{t('自然・里山', 'Nature')}</span>}
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-serif text-lg font-bold text-foreground">{title}</h2>
        <dl className="mt-2.5 space-y-1.5 text-[13px] text-foreground/80">
          <Row icon={CalendarDays}>{date}</Row>
          <Row icon={MapPin}>{place}</Row>
          <Row icon={Users}>{capacity}</Row>
          <Row icon={Wallet}>{fee}</Row>
        </dl>
        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{t('主催：', 'Host: ')}{host}</p>
            <p className="truncate text-xs text-muted-foreground">{hostArea}</p>
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
