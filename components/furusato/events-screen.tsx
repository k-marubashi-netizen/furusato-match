'use client'

import Image from 'next/image'
import { CalendarDays, MapPin, Plus, Users, Wallet } from 'lucide-react'
import { events, type EventItem } from '@/lib/data'
import { ScreenHeader } from './screen-header'

export function EventsScreen() {
  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader title="イベント" subtitle="顔を合わせる、地域の交流会。ここから「ふるさと」が始まる。" />

      <div className="px-4 pb-4 pt-2">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow-sm transition-transform active:scale-[0.99]"
        >
          <Plus className="h-4 w-4" aria-hidden />
          イベントを開く（主催する）
        </button>
      </div>

      <div className="space-y-4 px-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="relative h-36 w-full">
        <Image src={event.image || '/placeholder.svg'} alt={event.title} fill className="object-cover" sizes="100vw" />
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-medium text-primary backdrop-blur">
          {event.place}
        </span>
      </div>
      <div className="p-4">
        <h2 className="font-serif text-lg font-bold text-foreground">{event.title}</h2>

        <dl className="mt-2.5 space-y-1.5 text-[13px] text-foreground/80">
          <Row icon={CalendarDays}>{event.date}</Row>
          <Row icon={MapPin}>{event.place}</Row>
          <Row icon={Users}>{event.capacity}</Row>
          <Row icon={Wallet}>{event.fee}</Row>
        </dl>

        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">主催：{event.host}</p>
            <p className="truncate text-xs text-muted-foreground">{event.hostArea}</p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full bg-shu px-5 py-2 text-sm font-medium text-shu-foreground transition-transform active:scale-95"
          >
            参加する
          </button>
        </div>
      </div>
    </article>
  )
}

function Row({ icon: Icon, children }: { icon: typeof CalendarDays; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      <dd>{children}</dd>
    </div>
  )
}
