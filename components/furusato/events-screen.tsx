'use client'

import Image from 'next/image'
import { CalendarDays, Handshake, Leaf, MapPin, Plus, Users, Wallet } from 'lucide-react'
import { events, type EventItem } from '@/lib/data'
import { ScreenHeader } from './screen-header'
import { useLanguage } from './language-context'

export function EventsScreen() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader
        title="イベント"
        titleEn="Events"
        subtitle="アプリで集まり、地域で実際に会う。ここから「ふるさと」が始まる。"
        subtitleEn="Meet through the app, then connect face-to-face in the community."
      />

      <div className="px-4 pb-3 pt-2">
        <div className="mb-3 rounded-3xl border border-primary/10 bg-primary/5 p-4">
          <p className="flex items-center gap-2 text-xs font-bold text-primary"><Handshake className="h-4 w-4" aria-hidden />{t('対面交流が中心のイベント', 'Face-to-face local experiences')}</p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{t('地域の人と顔を合わせ、暮らし・文化・自然を一緒に体験します。', 'Meet locals in person and experience everyday life, culture, and nature together.')}</p>
        </div>
        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-transform active:scale-[0.99]">
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
  const { t } = useLanguage()

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="relative h-40 w-full">
        <Image src={event.image || '/placeholder.svg'} alt={event.title} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-foreground/40 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-full bg-card/92 px-2.5 py-1 text-[11px] font-bold text-primary backdrop-blur">{t('対面', 'In person')}</span>
          {nature && <span className="inline-flex items-center gap-1 rounded-full bg-card/92 px-2.5 py-1 text-[11px] font-bold text-primary backdrop-blur"><Leaf className="h-3 w-3" aria-hidden />{t('自然・里山', 'Nature')}</span>}
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-foreground/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur"><MapPin className="mr-1 inline h-3 w-3" aria-hidden />{event.place}</span>
      </div>
      <div className="p-4">
        <h2 className="font-serif text-lg font-bold text-foreground">{event.title}</h2>
        <dl className="mt-3 space-y-1.5 text-[13px] text-foreground/80">
          <Row icon={CalendarDays}>{event.date}</Row>
          <Row icon={Users}>{event.capacity}</Row>
          <Row icon={Wallet}>{event.fee}</Row>
        </dl>
        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{t('主催', 'Host')}：{event.host}</p>
            <p className="truncate text-xs text-muted-foreground">{event.hostArea}</p>
          </div>
          <button type="button" className="shrink-0 rounded-full bg-shu px-5 py-2.5 text-sm font-bold text-shu-foreground transition-transform active:scale-95">{t('参加する', 'Join')}</button>
        </div>
      </div>
    </article>
  )
}

function Row({ icon: Icon, children }: { icon: typeof CalendarDays; children: React.ReactNode }) {
  return <div className="flex items-center gap-2"><Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden /><dd>{children}</dd></div>
}
