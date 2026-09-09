'use client'

import { useState } from 'react'
import { ArrowRight, CalendarHeart, Check, ChevronRight, Compass, Heart, MapPin, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScreenHeader } from './screen-header'
import { useLanguage } from './language-context'
import { localize, type LocalizedText } from './locale-utils'

type FurusatoJourney = {
  id: string
  place: LocalizedText
  image: string
  step: 1 | 2 | 3 | 4
  completed: boolean
  next: LocalizedText
  note: LocalizedText
}

const stepLabels: LocalizedText[] = [
  { ja: '教わる', en: 'Learn', zh: '学习', es: 'Aprender', de: 'Lernen', fr: 'Apprendre', it: 'Imparare' },
  { ja: '一緒に案内', en: 'Guide together', zh: '一起带路', es: 'Guiar juntos', de: 'Gemeinsam führen', fr: 'Guider ensemble', it: 'Guidare insieme' },
  { ja: '独り立ち', en: 'Guide independently', zh: '独立带路', es: 'Guiar por tu cuenta', de: 'Selbstständig führen', fr: 'Guider seul', it: 'Guidare in autonomia' },
  { ja: '次へ伝える', en: 'Pass it on', zh: '传给下一位', es: 'Transmitirlo', de: 'Weitergeben', fr: 'Transmettre', it: 'Trasmettere' },
]

const stepNotes: LocalizedText[] = [
  { ja: '地域の人に教わり、その土地の日常を知る', en: 'Learn the everyday life of the place from people who know it', zh: '向了解当地的人学习日常生活', es: 'Aprende la vida cotidiana del lugar con personas que lo conocen', de: 'Den Alltag des Ortes von Menschen kennenlernen, die ihn kennen', fr: 'Découvrir le quotidien du lieu avec ceux qui le connaissent', it: 'Scoprire la vita quotidiana del luogo con chi lo conosce' },
  { ja: '地域の人と一緒に、次の人を案内してみる', en: 'Welcome the next visitor together with someone from the community', zh: '和当地人一起迎接并带领下一位访客', es: 'Recibe al siguiente visitante junto a alguien de la comunidad', de: 'Gemeinsam mit jemandem aus der Region den nächsten Gast begleiten', fr: 'Accueillir le prochain visiteur avec une personne de la communauté', it: 'Accogliere il prossimo visitatore insieme a qualcuno della comunità' },
  { ja: '自分の言葉で、その地域を案内してみる', en: 'Guide the place in your own words', zh: '用自己的语言介绍这个地方', es: 'Guía el lugar con tus propias palabras', de: 'Den Ort mit eigenen Worten zeigen', fr: 'Faire découvrir le lieu avec vos propres mots', it: 'Raccontare il luogo con le tue parole' },
  { ja: 'イベントや案内を通じて、次の人へつなぐ', en: 'Pass the relationship on through guiding and local events', zh: '通过带路和活动把这份联系传给下一位', es: 'Transmite el vínculo mediante visitas y eventos locales', de: 'Die Verbindung durch Führungen und lokale Veranstaltungen weitergeben', fr: 'Transmettre le lien grâce aux visites et événements locaux', it: 'Trasmettere il legame attraverso visite ed eventi locali' },
]

const journeys: FurusatoJourney[] = [
  {
    id: 'otari',
    place: { ja: '長野県・小谷村', en: 'Otari, Nagano', zh: '长野县・小谷村', es: 'Otari, Nagano', de: 'Otari, Nagano', fr: 'Otari, Nagano', it: 'Otari, Nagano' },
    image: '/events/event-1.svg',
    step: 2,
    completed: false,
    next: { ja: '次は、地域の人と一緒に案内してみよう', en: 'Next: try guiding together with someone local', zh: '下一步：和当地人一起带路', es: 'Siguiente: prueba a guiar con alguien local', de: 'Als Nächstes: gemeinsam mit jemandem vor Ort führen', fr: 'Ensuite : essayez de guider avec une personne du lieu', it: 'Prossimo passo: prova a guidare con una persona del posto' },
    note: { ja: '里山の暮らしを教わり、顔なじみの人が増えてきました。', en: 'You have learned about satoyama life and now recognize more familiar faces.', zh: '你已经学习了里山生活，也认识了越来越多熟悉的人。', es: 'Ya conoces mejor la vida satoyama y cada vez reconoces más caras conocidas.', de: 'Du hast das Satoyama-Leben kennengelernt und triffst immer mehr bekannte Gesichter.', fr: 'Vous connaissez mieux la vie satoyama et retrouvez de plus en plus de visages familiers.', it: 'Hai conosciuto meglio la vita satoyama e ritrovi sempre più volti familiari.' },
  },
  {
    id: 'miyama',
    place: { ja: '京都府・美山町', en: 'Miyama, Kyoto', zh: '京都府・美山町', es: 'Miyama, Kioto', de: 'Miyama, Kyoto', fr: 'Miyama, Kyoto', it: 'Miyama, Kyoto' },
    image: '/events/event-3.svg',
    step: 4,
    completed: true,
    next: { ja: 'この地域では、もう迎える側として活動できます', en: 'You can now welcome others here as a guide', zh: '你现在可以在这里作为向导迎接他人', es: 'Ya puedes recibir a otras personas aquí como guía', de: 'Hier kannst du nun selbst andere als Guide willkommen heißen', fr: 'Vous pouvez maintenant accueillir les autres ici en tant que guide', it: 'Ora puoi accogliere altre persone qui come guida' },
    note: { ja: '何度も訪れ、地域の人と一緒に次の旅人を迎える段階まで進みました。', en: 'After returning several times, you are ready to welcome the next traveler with the community.', zh: '多次回来之后，你已经可以和当地人一起迎接下一位旅人。', es: 'Tras volver varias veces, ya puedes recibir al siguiente viajero junto a la comunidad.', de: 'Nach mehreren Besuchen kannst du nun gemeinsam mit der Region die nächsten Reisenden willkommen heißen.', fr: 'Après plusieurs retours, vous pouvez désormais accueillir le prochain voyageur avec la communauté.', it: 'Dopo diversi ritorni, puoi ormai accogliere il prossimo viaggiatore insieme alla comunità.' },
  },
  {
    id: 'noto',
    place: { ja: '石川県・能登町', en: 'Noto, Ishikawa', zh: '石川县・能登町', es: 'Noto, Ishikawa', de: 'Noto, Ishikawa', fr: 'Noto, Ishikawa', it: 'Noto, Ishikawa' },
    image: '/events/event-2.svg',
    step: 1,
    completed: false,
    next: { ja: 'まずは、地域の人に会って暮らしを教わろう', en: 'Start by meeting people and learning how the community lives', zh: '先去认识当地人，了解这里的生活', es: 'Empieza conociendo a la gente y aprendiendo cómo se vive aquí', de: 'Beginne damit, Menschen kennenzulernen und ihren Alltag zu entdecken', fr: 'Commencez par rencontrer des habitants et découvrir leur quotidien', it: 'Inizia incontrando le persone e scoprendo come si vive qui' },
    note: { ja: '朝市や食文化が気になっている、これから関係を育てる地域です。', en: 'You are curious about the morning market and food culture; this relationship is just beginning.', zh: '你对早市和饮食文化感兴趣，这段关系才刚刚开始。', es: 'Te interesan el mercado matinal y la cultura gastronómica; esta relación acaba de empezar.', de: 'Morgenmarkt und Esskultur interessieren dich – diese Beziehung beginnt gerade erst.', fr: 'Le marché du matin et la culture culinaire vous attirent : la relation ne fait que commencer.', it: 'Ti interessano il mercato mattutino e la cultura gastronomica: questo rapporto è appena iniziato.' },
  },
]

export function MyPageScreen() {
  const { lang } = useLanguage()
  const [selectedId, setSelectedId] = useState('otari')
  const selected = journeys.find((item) => item.id === selectedId) ?? journeys[0]

  return (
    <div className="flex flex-col pb-7">
      <ScreenHeader title="マイページ" titleEn="My Page" subtitle="ふるさとは、ひとつじゃない。地域ごとに関係が育っていきます。" subtitleEn="You can have more than one furusato. Each relationship grows at its own pace." />

      <section className="px-4 pt-3">
        <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/people/emma.svg" alt="Emma Wilson" className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-primary/10" />
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg font-bold text-foreground">Emma Wilson</p>
              <p className="text-xs text-muted-foreground">{localize(lang, { ja: 'イギリスから日本を旅しています', en: 'Traveling Japan from the United Kingdom', zh: '来自英国，正在日本旅行', es: 'Viajando por Japón desde el Reino Unido', de: 'Aus dem Vereinigten Königreich auf Reise durch Japan', fr: 'Voyage au Japon depuis le Royaume-Uni', it: 'In viaggio in Giappone dal Regno Unito' })}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-foreground/70">{localize(lang, { ja: '「会いたい人がいるから帰る」場所を少しずつ増やしています。', en: 'Building more places to return to because there are people worth seeing again.', zh: '一点点增加“因为有想见的人，所以想再回来”的地方。', es: 'Creando poco a poco más lugares a los que volver porque hay personas que quieres volver a ver.', de: 'Nach und nach entstehen mehr Orte, zu denen du wegen der Menschen zurückkehren möchtest.', fr: 'Créer peu à peu davantage de lieux où revenir parce qu’il y a des personnes que vous souhaitez revoir.', it: 'Costruendo poco a poco più luoghi in cui tornare perché ci sono persone che vuoi rivedere.' })}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 divide-x divide-border border-t border-border/70 pt-3 text-center">
            <SocialStat value="86" label={localize(lang, { ja: 'フォロー中', en: 'Following', zh: '关注中', es: 'Siguiendo', de: 'Folge ich', fr: 'Abonnements', it: 'Seguiti' })} />
            <SocialStat value="124" label={localize(lang, { ja: 'フォロワー', en: 'Followers', zh: '粉丝', es: 'Seguidores', de: 'Follower', fr: 'Abonnés', it: 'Follower' })} />
          </div>
        </div>
      </section>

      <section className="px-4 pt-5">
        <div className="mb-3">
          <p className="text-[10px] font-bold tracking-[0.14em] text-primary">MY FURUSATO JOURNEY</p>
          <h2 className="mt-1 font-serif text-xl font-bold text-foreground">{localize(lang, { ja: 'いま育っている、あなたの“ふるさと”', en: 'The furusato relationships you are growing', zh: '正在成长中的“故乡”关系', es: 'Tus relaciones furusato en crecimiento', de: 'Deine wachsenden Furusato-Beziehungen', fr: 'Vos liens furusato en train de grandir', it: 'I tuoi legami furusato che stanno crescendo' })}</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{localize(lang, { ja: '場所ごとに進み方は別々。カードを押すと、その地域で今どこまで来ているか見られます。', en: 'Each place has its own journey. Tap a card to see where you are in that relationship.', zh: '每个地方都有自己的进度。点击卡片即可查看你和当地关系发展到哪一步。', es: 'Cada lugar tiene su propio recorrido. Toca una tarjeta para ver en qué punto estás.', de: 'Jeder Ort hat seinen eigenen Weg. Tippe auf eine Karte, um deinen aktuellen Stand zu sehen.', fr: 'Chaque lieu suit son propre parcours. Touchez une carte pour voir où vous en êtes.', it: 'Ogni luogo ha il suo percorso. Tocca una scheda per vedere a che punto sei.' })}</p>
        </div>

        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {journeys.map((journey) => (
            <button key={journey.id} type="button" onClick={() => setSelectedId(journey.id)} className={cn('w-[235px] shrink-0 overflow-hidden rounded-3xl border bg-card text-left shadow-sm transition-all', selectedId === journey.id ? 'border-primary ring-2 ring-primary/10' : journey.completed ? 'border-yamabuki/60' : 'border-border')}>
              <div className="relative h-28 overflow-hidden">
                <img src={journey.image} alt={localize(lang, journey.place)} className="h-full w-full object-cover" />
                <span className={cn('absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur', journey.completed ? 'bg-yamabuki/90 text-yamabuki-foreground' : 'bg-card/92 text-primary')}>
                  {journey.completed ? localize(lang, { ja: 'ガイド可能', en: 'Ready to guide', zh: '可以带路', es: 'Listo para guiar', de: 'Bereit zu führen', fr: 'Prêt à guider', it: 'Pronto a guidare' }) : `STEP ${journey.step} / 4`}
                </span>
              </div>
              <div className="p-3.5">
                <p className="flex items-center gap-1 text-sm font-bold text-foreground"><MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />{localize(lang, journey.place)}</p>
                <div className="mt-2 flex gap-1">{[1, 2, 3, 4].map((step) => <span key={step} className={cn('h-1.5 flex-1 rounded-full', step <= journey.step ? (journey.completed ? 'bg-yamabuki' : 'bg-primary') : 'bg-border')} />)}</div>
                <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">{localize(lang, journey.next)}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 pt-4">
        <div className={cn('rounded-3xl border bg-card p-4 shadow-sm', selected.completed ? 'border-yamabuki/50' : 'border-primary/20')}>
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-[10px] font-bold tracking-[0.14em] text-primary">{localize(lang, { ja: 'この地域での現在地', en: 'YOUR JOURNEY HERE', zh: '你在这里的进度', es: 'TU RECORRIDO AQUÍ', de: 'DEIN WEG HIER', fr: 'VOTRE PARCOURS ICI', it: 'IL TUO PERCORSO QUI' })}</p><h3 className="mt-1 font-serif text-lg font-bold text-foreground">{localize(lang, selected.place)}</h3></div>
            <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-bold', selected.completed ? 'bg-yamabuki/25 text-yamabuki-foreground' : 'bg-primary/10 text-primary')}>{selected.completed ? localize(lang, { ja: '4 STEP 達成', en: '4 STEPS COMPLETE', zh: '完成4步', es: '4 PASOS COMPLETADOS', de: '4 SCHRITTE GESCHAFFT', fr: '4 ÉTAPES TERMINÉES', it: '4 PASSI COMPLETATI' }) : `STEP ${selected.step} / 4`}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{localize(lang, selected.note)}</p>

          <div className="mt-4 space-y-2.5">
            {stepLabels.map((label, index) => {
              const stepNumber = index + 1
              const done = stepNumber < selected.step || selected.completed
              const active = !selected.completed && stepNumber === selected.step
              return (
                <div key={label.ja} className={cn('flex items-start gap-3 rounded-2xl border p-3', active ? 'border-primary/25 bg-primary/5' : done ? 'border-primary/10 bg-secondary/45' : 'border-border bg-background')}>
                  <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold', done ? 'bg-primary text-primary-foreground' : active ? 'border-2 border-primary bg-card text-primary' : 'border border-border text-muted-foreground')}>{done ? <Check className="h-4 w-4" aria-hidden /> : stepNumber}</span>
                  <div className="min-w-0 flex-1"><p className={cn('font-serif text-sm font-bold', done || active ? 'text-foreground' : 'text-muted-foreground')}>STEP {stepNumber}｜{localize(lang, label)}</p><p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{localize(lang, stepNotes[index])}</p></div>
                  {active && <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-primary" aria-hidden />}
                </div>
              )
            })}
          </div>

          {selected.completed ? (
            <div className="mt-4 rounded-2xl bg-yamabuki/15 p-3.5">
              <p className="flex items-center gap-1.5 text-xs font-bold text-yamabuki-foreground"><Sparkles className="h-4 w-4" aria-hidden />{localize(lang, { ja: 'ここでは、もう迎える側です', en: 'Here, you are ready to welcome others', zh: '在这里，你已经可以迎接他人', es: 'Aquí ya puedes recibir a otras personas', de: 'Hier kannst du nun selbst andere willkommen heißen', fr: 'Ici, vous êtes prêt à accueillir les autres', it: 'Qui sei pronto ad accogliere gli altri' })}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-foreground/70">{localize(lang, { ja: 'ガイドとして案内したり、地域の人と一緒にイベントを開いたりできます。', en: 'You can guide visitors or host a local event together with community members.', zh: '你可以带领访客，也可以和当地人一起举办活动。', es: 'Puedes guiar a visitantes u organizar un evento con personas de la comunidad.', de: 'Du kannst Gäste führen oder gemeinsam mit der Region eine Veranstaltung organisieren.', fr: 'Vous pouvez guider des visiteurs ou organiser un événement avec la communauté.', it: 'Puoi guidare visitatori o organizzare un evento insieme alla comunità.' })}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button type="button" className="flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-xs font-bold text-primary-foreground"><Compass className="h-3.5 w-3.5" aria-hidden />{localize(lang, { ja: 'ガイドする', en: 'Start guiding', zh: '开始带路', es: 'Empezar a guiar', de: 'Als Guide starten', fr: 'Commencer à guider', it: 'Inizia a guidare' })}</button>
                <button type="button" className="flex items-center justify-center gap-1.5 rounded-full border border-primary bg-card px-3 py-2.5 text-xs font-bold text-primary"><CalendarHeart className="h-3.5 w-3.5" aria-hidden />{localize(lang, { ja: 'イベントを開く', en: 'Host an event', zh: '举办活动', es: 'Organizar un evento', de: 'Event veranstalten', fr: 'Organiser un événement', it: 'Organizza un evento' })}</button>
              </div>
            </div>
          ) : (
            <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground">{localize(lang, selected.next)}<ArrowRight className="h-4 w-4" aria-hidden /></button>
          )}
        </div>
      </section>

      <section className="mx-4 mt-5 rounded-3xl border border-dashed border-primary/25 bg-primary/5 p-4">
        <p className="flex items-center gap-1.5 text-xs font-bold text-primary"><Heart className="h-4 w-4" aria-hidden />{localize(lang, { ja: 'ふるさとは、増えていい。', en: 'Your furusato can keep growing.', zh: '你的“故乡”可以不断增加。', es: 'Puedes seguir sumando nuevos furusato.', de: 'Deine Furusato dürfen immer mehr werden.', fr: 'Vos furusato peuvent continuer à se multiplier.', it: 'I tuoi furusato possono continuare a crescere.' })}</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{localize(lang, { ja: '新しい地域に行き、人に会い、また帰る。その土地ごとに別々の関係が育っていきます。', en: 'Visit a new place, meet people, return again. Each community becomes its own relationship.', zh: '去新的地方、认识人、再回来。每个地方都会成长出不同的关系。', es: 'Visita un lugar nuevo, conoce gente y vuelve. Cada comunidad desarrolla su propia relación.', de: 'Einen neuen Ort besuchen, Menschen treffen, wiederkommen – jede Region entwickelt ihre eigene Beziehung.', fr: 'Découvrir un nouveau lieu, rencontrer des gens, revenir : chaque communauté développe son propre lien.', it: 'Visita un luogo nuovo, incontra persone e torna: ogni comunità sviluppa un legame diverso.' })}</p>
        <button type="button" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary">{localize(lang, { ja: '新しい“ふるさと”を見つける', en: 'Discover another furusato', zh: '寻找新的“故乡”', es: 'Descubrir otro furusato', de: 'Ein weiteres Furusato entdecken', fr: 'Découvrir un autre furusato', it: 'Scopri un altro furusato' })}<ArrowRight className="h-3.5 w-3.5" aria-hidden /></button>
      </section>
    </div>
  )
}

function SocialStat({ value, label }: { value: string; label: string }) {
  return <div className="px-2"><p className="font-serif text-base font-bold text-foreground">{value}</p><p className="mt-0.5 truncate text-[10px] text-muted-foreground">{label}</p></div>
}
