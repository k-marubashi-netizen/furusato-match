'use client'

import { useState } from 'react'
import { ArrowRight, CalendarHeart, Footprints, HeartHandshake, Home, Sprout, X } from 'lucide-react'
import type { Guide } from '@/lib/data'
import { conversations } from '@/lib/data'
import { LanguageProvider, useLanguage } from './language-context'
import { TabBar } from './tab-bar'
import { SearchScreen } from './search-screen'
import { EventsScreen } from './events-screen'
import { MessagesScreen } from './messages-screen'
import { MyPageScreen } from './mypage-screen'
import { GuideDetail } from './guide-detail'
import type { Tab } from './types'

export function FurusatoApp() {
  return (
    <LanguageProvider>
      <FurusatoAppInner />
    </LanguageProvider>
  )
}

function FurusatoAppInner() {
  const [tab, setTab] = useState<Tab>('search')
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null)
  const [openConversationId, setOpenConversationId] = useState<string | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [onboardingOpen, setOnboardingOpen] = useState(true)
  const [onboardingIndex, setOnboardingIndex] = useState(0)

  function goToMessages(guide: Guide) {
    const convo = conversations.find((c) => c.guideId === guide.id)
    setActiveGuide(null)
    setOpenConversationId(convo?.id ?? null)
    setTab('messages')
  }

  function openConversation(conversationId: string) {
    setActiveGuide(null)
    setOpenConversationId(conversationId)
    setTab('messages')
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto overscroll-contain pb-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {activeGuide ? (
          <GuideDetail guide={activeGuide} onBack={() => setActiveGuide(null)} onMessage={goToMessages} />
        ) : (
          <>
            {tab === 'search' && <SearchScreen onOpenGuide={setActiveGuide} onOpenConversation={openConversation} />}
            {tab === 'events' && <EventsScreen />}
            {tab === 'messages' && <MessagesScreen initialConversationId={openConversationId} onConsumeInitial={() => setOpenConversationId(null)} />}
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
      {onboardingOpen && (
        <Onboarding
          index={onboardingIndex}
          onSkip={() => setOnboardingOpen(false)}
          onNext={() => {
            if (onboardingIndex === 2) setOnboardingOpen(false)
            else setOnboardingIndex((v) => v + 1)
          }}
        />
      )}
    </div>
  )
}

function Onboarding({ index, onSkip, onNext }: { index: number; onSkip: () => void; onNext: () => void }) {
  const { t } = useLanguage()
  const items = [
    {
      icon: HeartHandshake,
      kicker: t('恋愛じゃなく、“交流”のマッチング', 'Matching for connection — not dating'),
      title: t('会いたいのは、地域を知っている人。', 'Meet people who know the place.'),
      body: t('外国人観光客、新しく暮らし始めた人、近隣の大学生や社会人、昔からの住民。立場を越えてつながります。', 'Travelers, newcomers, nearby students and workers, and longtime residents connect beyond their usual circles.'),
    },
    {
      icon: Home,
      kicker: t('観光で終わらない関係を', 'A relationship beyond sightseeing'),
      title: t('“ふるさと”を持つ人を増やす。', 'More people with a place to call home.'),
      body: t('一度きりの観光ではなく、「会いたい人がいるから帰る」関係を地域につくります。', 'Create a reason to return: not just a place to visit, but people you want to see again.'),
    },
    {
      icon: Sprout,
      kicker: t('教わる人から、伝える人へ', 'From learner to guide'),
      title: t('交流するほど、あなたもガイドに育つ。', 'The more you connect, the more you can guide.'),
      body: t('STEP1 教わる → STEP2 一緒に案内 → STEP3 独り立ち → STEP4 次へ伝える。', 'STEP 1 Learn → STEP 2 Guide together → STEP 3 Guide independently → STEP 4 Pass it on.'),
    },
  ]
  const item = items[index]
  const Icon = item.icon
  const last = index === items.length - 1

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-foreground/35 p-3 backdrop-blur-sm">
      <div className="w-full rounded-[2rem] bg-card p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {items.map((_, i) => <span key={i} className={`h-1.5 rounded-full ${i === index ? 'w-8 bg-primary' : 'w-3 bg-border'}`} />)}
          </div>
          <button type="button" onClick={onSkip} className="text-xs text-muted-foreground">{t('スキップ', 'Skip')}</button>
        </div>
        <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-7 w-7" aria-hidden />
        </div>
        <p className="mt-4 text-xs font-bold text-primary">{item.kicker}</p>
        <h2 className="mt-1 font-serif text-[20px] font-bold leading-[1.35] tracking-[-0.01em] text-foreground">{item.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
        <button type="button" onClick={onNext} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground">
          {last ? t('ふるさとを探しにいく', 'Find your furusato') : t('次へ', 'Next')}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}

function CreateSheet({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()
  return (
    <div className="absolute inset-0 z-40 flex items-end">
      <button type="button" aria-label="close" onClick={onClose} className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="relative z-10 w-full rounded-t-4xl border-t border-border bg-card p-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-foreground">{t('なにを投稿しますか？', 'What would you like to post?')}</h2>
          <button type="button" onClick={onClose} aria-label="close" className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground"><X className="h-4 w-4" aria-hidden /></button>
        </div>
        <div className="space-y-3">
          <CreateOption
            icon={CalendarHeart}
            title={t('地域の知識交換会を開く', 'Host a local knowledge exchange')}
            desc={t('地元・近隣の人が文化や暮らしの知恵を持ち寄ります', 'Local and nearby people share culture, traditions, and everyday knowledge')}
          />
          <CreateOption
            icon={Footprints}
            title={t('一緒に歩く募集', 'Find someone to walk with')}
            desc={t('案内してほしい旅先を投稿します', 'Post a place you would like to explore together')}
          />
        </div>
      </div>
    </div>
  )
}

function CreateOption({ icon: Icon, title, desc }: { icon: typeof Footprints; title: string; desc: string }) {
  return (
    <button type="button" className="flex w-full items-center gap-3 rounded-2xl border border-border bg-background p-4 text-left transition-colors active:bg-secondary">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
      <span className="min-w-0"><span className="block font-serif text-[15px] font-medium text-foreground">{title}</span><span className="block text-xs text-muted-foreground">{desc}</span></span>
    </button>
  )
}
