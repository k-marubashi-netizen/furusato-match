'use client'

import { useState } from 'react'
import { ArrowRight, CalendarHeart, Footprints, HeartHandshake, Home, Sprout, X } from 'lucide-react'
import type { Guide } from '@/lib/data'
import { conversations } from '@/lib/data'
import { TabBar } from './tab-bar'
import { SearchScreen } from './search-screen'
import { EventsScreen } from './events-screen'
import { MessagesScreen } from './messages-screen'
import { MyPageScreen } from './mypage-screen'
import { GuideDetail } from './guide-detail'
import { LanguageProvider, useLanguage } from './language-context'
import type { Tab } from './types'

const onboardingJa = [
  {
    icon: HeartHandshake,
    kicker: '恋愛じゃなく、“交流”のマッチング',
    title: '会いたいのは、地域を知っている人。',
    body: '外国人観光客、新しく暮らし始めた人、昔から地域で暮らす人。立場を越えてつながります。',
  },
  {
    icon: Home,
    kicker: '観光客を増やすのではなく',
    title: '“ふるさと”を持つ人を増やす。',
    body: '一度きりの観光ではなく、「会いたい人がいるから帰る」関係を地域につくります。',
  },
  {
    icon: Sprout,
    kicker: '教わる人から、伝える人へ',
    title: '交流するほど、あなたもガイドに育つ。',
    body: 'STEP1 教わる → STEP2 一緒に案内 → STEP3 独り立ち → STEP4 次へ伝える。',
  },
]

const onboardingEn = [
  {
    icon: HeartHandshake,
    kicker: 'A matching app for connection — not dating',
    title: 'Meet people who truly know the place.',
    body: 'Travelers, newcomers, and longtime residents connect across backgrounds and generations.',
  },
  {
    icon: Home,
    kicker: 'Not about increasing tourist numbers',
    title: 'Create more people who have a “furusato.”',
    body: 'Go beyond a one-time visit and build relationships that make you want to come back.',
  },
  {
    icon: Sprout,
    kicker: 'From learner to local guide',
    title: 'The more you connect, the more you can pass on.',
    body: 'STEP 1 Learn → STEP 2 Guide together → STEP 3 Guide independently → STEP 4 Pass it on.',
  },
]

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

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto overscroll-contain pb-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {activeGuide ? (
          <GuideDetail guide={activeGuide} onBack={() => setActiveGuide(null)} onMessage={goToMessages} />
        ) : (
          <>
            {tab === 'search' && <SearchScreen onOpenGuide={setActiveGuide} />}
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
            if (onboardingIndex === onboardingJa.length - 1) setOnboardingOpen(false)
            else setOnboardingIndex((v) => v + 1)
          }}
        />
      )}
    </div>
  )
}

function Onboarding({ index, onSkip, onNext }: { index: number; onSkip: () => void; onNext: () => void }) {
  const { lang, t } = useLanguage()
  const list = lang === 'ja' ? onboardingJa : onboardingEn
  const item = list[index]
  const Icon = item.icon
  const last = index === list.length - 1

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-foreground/45 p-3 backdrop-blur-sm">
      <div className="w-full rounded-[2rem] border border-white/20 bg-card p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {list.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-primary' : 'w-3 bg-border'}`} />)}
          </div>
          <button type="button" onClick={onSkip} className="text-xs font-medium text-muted-foreground">{t('スキップ', 'Skip')}</button>
        </div>
        <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-8 w-8" aria-hidden />
        </div>
        <p className="mt-5 text-xs font-bold tracking-wide text-primary">{item.kicker}</p>
        <h2 className="mt-1 text-balance font-serif text-2xl font-bold leading-tight text-foreground">{item.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
        <button type="button" onClick={onNext} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-sm">
          {last ? t('ふるさとを探しにいく', 'Start exploring') : t('次へ', 'Next')}
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
      <button type="button" aria-label={t('閉じる', 'Close')} onClick={onClose} className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="relative z-10 w-full rounded-t-4xl border-t border-border bg-card p-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-foreground">{t('なにを投稿しますか？', 'What would you like to post?')}</h2>
          <button type="button" onClick={onClose} aria-label={t('閉じる', 'Close')} className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground"><X className="h-4 w-4" aria-hidden /></button>
        </div>
        <div className="space-y-3">
          <CreateOption icon={CalendarHeart} title={t('交流イベントを開く', 'Host a local event')} desc={t('地域の体験や集まりを募集します', 'Invite people to a local experience or gathering')} />
          <CreateOption icon={Footprints} title={t('一緒に歩く募集', 'Find someone to walk with')} desc={t('案内してほしい旅先を投稿します', 'Post where you would like a local guide')} />
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
