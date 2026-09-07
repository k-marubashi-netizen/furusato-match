'use client'

import Image from 'next/image'
import { CalendarDays, MapPin, Plus, Users, Wallet, Handshake, Leaf } from 'lucide-react'
import { events, type EventItem } from '@/lib/data'
import { ScreenHeader } from './screen-header'

export function EventsScreen() {
  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader title="イベント" subtitle="アプリで集まり、地域で実際に会う。ここから「ふるさと」が始まる。" />

      <div className="px-4 pb-3 pt-2">
        <div className="mb-3 rounded-2xl bg-primary/5 p-3">
          <p className="flex items-center gap-1.5 text-xs font-medium text-primary"><Handshake className="h-4 w-4" aria-hidden />対面交流が中心のイベント</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">地域の人と顔を合わせ、暮らし・文化・自然を一緒に体験します。</p>
        </div>
        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow-sm transition-transform active:scale-[0.99]">
          <Plus className="h-4 w-4" aria-hidden />イベントを開く（主催する）
        </button>
      </div>

      <div className="space-y-4 px-4">
        {events.map((event, index) => <EventCard key={event.id} event={event} nature={index === 0} />)}
      </div>
    </div>
  )
}

function EventCard({ event, nature }: { event: EventItem; nature?: boolean }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="relative h-36 w-full">
        <Image src={event.image || '/placeholder.svg'} alt={event.title} fill className="object-cover" sizes="100vw" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-medium text-primary backdrop-blur">対面</span>
          {nature && <span className="inline-flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-medium text-primary backdrop-blur"><Leaf className="h-3 w-3" aria-hidden />自然・里山</span>}
        </div>
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
          <button type="button" className="shrink-0 rounded-full bg-shu px-5 py-2 text-sm font-medium text-shu-foreground transition-transform active:scale-95">参加する</button>
        </div>
      </div>
    </article>
  )
}

function Row({ icon: Icon, children }: { icon: typeof CalendarDays; children: React.ReactNode }) {
  return <div className="flex items-center gap-2"><Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden /><dd>{children}</dd></div>
}
