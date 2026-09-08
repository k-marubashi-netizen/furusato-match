'use client'

import { useState } from 'react'
import { ArrowRight, CalendarHeart, Footprints, HeartHandshake, Home, Sprout, X } from 'lucide-react'
import type { Guide } from '@/lib/data'
import { conversations } from '@/lib/data'
import { LanguageProvider, useLanguage } from './language-context'
import { localize, type LocalizedText } from './locale-utils'
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
  const { lang } = useLanguage()
  const items: { icon: typeof HeartHandshake; kicker: LocalizedText; title: LocalizedText; body: LocalizedText }[] = [
    {
      icon: HeartHandshake,
      kicker: { ja: '恋愛じゃなく、“交流”のマッチング', en: 'Matching for connection — not dating', zh: '不是恋爱，而是为了交流而匹配', es: 'Conexiones, no citas', de: 'Begegnungen statt Dating', fr: 'Des rencontres, pas du dating', it: 'Connessioni, non appuntamenti' },
      title: { ja: '会いたいのは、地域を知っている人。', en: 'Meet people who know the place.', zh: '想见的，是了解当地的人。', es: 'Conoce a personas que conocen el lugar.', de: 'Triff Menschen, die den Ort kennen.', fr: 'Rencontrez des personnes qui connaissent le lieu.', it: 'Incontra persone che conoscono il territorio.' },
      body: { ja: '外国人旅行者、新しく暮らし始めた人、地域の近くに暮らす大学生や社会人、昔からの住民。立場を越えてつながります。', en: 'Travelers, newcomers, nearby students and workers, and longtime residents connect beyond their usual circles.', zh: '外国旅人、新居民、附近学生和上班族、长期居民，都能跨越立场建立联系。', es: 'Viajeros, nuevos residentes, estudiantes y trabajadores cercanos y habitantes de toda la vida conectan más allá de sus círculos habituales.', de: 'Reisende, Zugezogene, Studierende und Berufstätige aus der Umgebung sowie langjährige Bewohner kommen miteinander in Kontakt.', fr: 'Voyageurs, nouveaux habitants, étudiants et actifs des environs ainsi qu’habitants de longue date se rencontrent au-delà de leurs cercles habituels.', it: 'Viaggiatori, nuovi residenti, studenti e lavoratori dei dintorni e abitanti di lunga data si connettono oltre i propri ambienti abituali.' },
    },
    {
      icon: Home,
      kicker: { ja: '観光で終わらない関係を', en: 'A relationship beyond sightseeing', zh: '不止于观光的关系', es: 'Una relación más allá del turismo', de: 'Beziehungen über Sightseeing hinaus', fr: 'Une relation au-delà du tourisme', it: 'Un legame oltre il turismo' },
      title: { ja: '“ふるさと”を持つ人を増やす。', en: 'More people with a place to call home.', zh: '让更多人拥有可以称为“故乡”的地方。', es: 'Más personas con un lugar al que llamar hogar.', de: 'Mehr Menschen mit einem Ort, den sie Heimat nennen.', fr: 'Plus de personnes avec un lieu qu’elles peuvent appeler chez elles.', it: 'Più persone con un luogo da chiamare casa.' },
      body: { ja: '一度きりの観光ではなく、「会いたい人がいるから帰る」関係を地域につくります。', en: 'Create a reason to return: not just a place to visit, but people you want to see again.', zh: '不只是一次观光，而是因为“有想再见的人”而想回来的关系。', es: 'Crea un motivo para volver: no solo un lugar que visitar, sino personas que quieras volver a ver.', de: 'Ein Grund zurückzukommen: nicht nur ein Ort, sondern Menschen, die man wiedersehen möchte.', fr: 'Créer une raison de revenir : pas seulement un lieu à visiter, mais des personnes que l’on veut revoir.', it: 'Crea un motivo per tornare: non solo un luogo da visitare, ma persone che vuoi rivedere.' },
    },
    {
      icon: Sprout,
      kicker: { ja: '教わる人から、伝える人へ', en: 'From learner to guide', zh: '从学习者到传递者', es: 'De aprendiz a guía', de: 'Vom Lernenden zum Guide', fr: 'D’apprenant à guide', it: 'Da chi impara a chi guida' },
      title: { ja: '交流するほど、あなたもガイドに育つ。', en: 'The more you connect, the more you can guide.', zh: '交流越多，你也越能成为向导。', es: 'Cuanto más conectas, más preparado estás para guiar.', de: 'Je mehr du dich austauschst, desto mehr kannst du selbst führen.', fr: 'Plus vous échangez, plus vous pouvez devenir guide.', it: 'Più incontri persone, più puoi diventare una guida.' },
      body: { ja: 'STEP1 教わる → STEP2 一緒に案内 → STEP3 独り立ち → STEP4 次へ伝える。', en: 'STEP 1 Learn → STEP 2 Guide together → STEP 3 Guide independently → STEP 4 Pass it on.', zh: 'STEP1 学习 → STEP2 一起带路 → STEP3 独立带路 → STEP4 传给下一位。', es: 'STEP 1 Aprender → STEP 2 Guiar juntos → STEP 3 Guiar por tu cuenta → STEP 4 Transmitirlo.', de: 'STEP 1 Lernen → STEP 2 Gemeinsam führen → STEP 3 Selbstständig führen → STEP 4 Weitergeben.', fr: 'STEP 1 Apprendre → STEP 2 Guider ensemble → STEP 3 Guider seul → STEP 4 Transmettre.', it: 'STEP 1 Imparare → STEP 2 Guidare insieme → STEP 3 Guidare in autonomia → STEP 4 Trasmettere.' },
    },
  ]
  const item = items[index]
  const Icon = item.icon
  const last = index === items.length - 1

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-foreground/35 p-3 backdrop-blur-sm">
      <div className="w-full rounded-[2rem] bg-card p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">{items.map((_, i) => <span key={i} className={`h-1.5 rounded-full ${i === index ? 'w-8 bg-primary' : 'w-3 bg-border'}`} />)}</div>
          <button type="button" onClick={onSkip} className="text-xs text-muted-foreground">
            {localize(lang, { ja: 'スキップ', en: 'Skip', zh: '跳过', es: 'Saltar', de: 'Überspringen', fr: 'Passer', it: 'Salta' })}
          </button>
        </div>
        <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="h-7 w-7" aria-hidden /></div>
        <p className="mt-4 text-xs font-bold text-primary">{localize(lang, item.kicker)}</p>
        <h2 className="mt-1 font-serif text-[20px] font-bold leading-[1.35] tracking-[-0.01em] text-foreground">{localize(lang, item.title)}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{localize(lang, item.body)}</p>
        <button type="button" onClick={onNext} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground">
          {last
            ? localize(lang, { ja: 'ふるさとを探しにいく', en: 'Find your furusato', zh: '去寻找你的故乡', es: 'Buscar tu furusato', de: 'Finde dein Furusato', fr: 'Trouver votre furusato', it: 'Trova il tuo furusato' })
            : localize(lang, { ja: '次へ', en: 'Next', zh: '下一步', es: 'Siguiente', de: 'Weiter', fr: 'Suivant', it: 'Avanti' })}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}

function CreateSheet({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage()
  return (
    <div className="absolute inset-0 z-40 flex items-end">
      <button type="button" aria-label="close" onClick={onClose} className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="relative z-10 w-full rounded-t-4xl border-t border-border bg-card p-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-foreground">{localize(lang, { ja: 'なにを投稿しますか？', en: 'What would you like to post?', zh: '你想发布什么？', es: '¿Qué quieres publicar?', de: 'Was möchtest du posten?', fr: 'Que souhaitez-vous publier ?', it: 'Cosa vuoi pubblicare?' })}</h2>
          <button type="button" onClick={onClose} aria-label="close" className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground"><X className="h-4 w-4" aria-hidden /></button>
        </div>
        <div className="space-y-3">
          <CreateOption
            icon={CalendarHeart}
            title={localize(lang, { ja: '交流イベントを開く', en: 'Host an exchange event', zh: '发起交流活动', es: 'Organizar un evento de intercambio', de: 'Austausch-Event veranstalten', fr: 'Organiser un événement d’échange', it: 'Organizza un evento di scambio' })}
            desc={localize(lang, { ja: '散歩、食事、地域交流、宿泊交流などを募集します', en: 'Create a walk, meal, community gathering, or stay-based exchange', zh: '发起散步、吃饭、当地交流或住宿交流', es: 'Crea un paseo, una comida, un encuentro local o una experiencia con estancia', de: 'Erstelle einen Spaziergang, ein Essen, ein lokales Treffen oder einen Aufenthalt', fr: 'Créez une balade, un repas, une rencontre locale ou un échange avec séjour', it: 'Crea una passeggiata, un pasto, un incontro locale o uno scambio con soggiorno' })}
          />
          <CreateOption
            icon={Footprints}
            title={localize(lang, { ja: '一緒に歩く募集', en: 'Find someone to walk with', zh: '寻找一起散步的人', es: 'Buscar a alguien con quien caminar', de: 'Jemanden zum gemeinsamen Erkunden finden', fr: 'Trouver quelqu’un avec qui marcher', it: 'Trova qualcuno con cui camminare' })}
            desc={localize(lang, { ja: '案内してほしい旅先を投稿します', en: 'Post a place you would like to explore together', zh: '发布你想和别人一起探索的地方', es: 'Publica un lugar que te gustaría explorar acompañado', de: 'Poste einen Ort, den du gemeinsam erkunden möchtest', fr: 'Publiez un lieu que vous souhaitez explorer à plusieurs', it: 'Pubblica un luogo che vorresti esplorare insieme a qualcuno' })}
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
