'use client'

import { useState } from 'react'
import { CalendarHeart, Footprints, X } from 'lucide-react'
import type { Guide } from '@/lib/data'
import { conversations } from '@/lib/data'
import { TabBar } from './tab-bar'
import { SearchScreen } from './search-screen'
import { EventsScreen } from './events-screen'
import { MessagesScreen } from './messages-screen'
import { MyPageScreen } from './mypage-screen'
import { GuideDetail } from './guide-detail'
import type { Tab } from './types'

export function FurusatoApp() {
  const [tab, setTab] = useState<Tab>('search')
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null)
  const [openConversationId, setOpenConversationId] = useState<string | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  function goToMessages(guide: Guide) {
    const convo = conversations.find((c) => c.guideId === guide.id)
    setActiveGuide(null)
    setOpenConversationId(convo?.id ?? null)
    setTab('messages')
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto overscroll-contain pb-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {activeGuide ? (
          <GuideDetail guide={activeGuide} onBack={() => setActiveGuide(null)} onMessage={goToMessages} />
        ) : (
          <>
            {tab === 'search' && <SearchScreen onOpenGuide={setActiveGuide} />}
            {tab === 'events' && <EventsScreen />}
            {tab === 'messages' && (
              <MessagesScreen
                initialConversationId={openConversationId}
                onConsumeInitial={() => setOpenConversationId(null)}
              />
            )}
            {tab === 'mypage' && <MyPageScreen />}
          </>
        )}
      </div>

      {!activeGuide && (
        <TabBar
          active={tab}
          onChange={(t) => {
            setOpenConversationId(null)
            setTab(t)
          }}
          onCreate={() => setCreateOpen(true)}
        />
      )}

      {createOpen && <CreateSheet onClose={() => setCreateOpen(false)} />}
    </div>
  )
}

function CreateSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end">
      <button type="button" aria-label="閉じる" onClick={onClose} className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="relative z-10 w-full rounded-t-4xl border-t border-border bg-card p-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-foreground">なにを投稿しますか？</h2>
          <button type="button" onClick={onClose} aria-label="閉じる" className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground">
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="space-y-3">
          <CreateOption
            icon={CalendarHeart}
            title="交流イベントを開く"
            desc="地域の体験や集まりを募集します"
          />
          <CreateOption
            icon={Footprints}
            title="一緒に歩く募集"
            desc="案内してほしい旅先を投稿します"
          />
        </div>
      </div>
    </div>
  )
}

function CreateOption({ icon: Icon, title, desc }: { icon: typeof Footprints; title: string; desc: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-2xl border border-border bg-background p-4 text-left transition-colors active:bg-secondary"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block font-serif text-[15px] font-medium text-foreground">{title}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
    </button>
  )
}
