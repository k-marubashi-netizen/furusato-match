'use client'

import Image from 'next/image'
import { useState } from 'react'
import { BadgeCheck, ChevronLeft, Languages, Send, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { conversations, type ChatMessage, type Conversation } from '@/lib/data'
import { travelerConversations } from '@/lib/social-data'
import { ScreenHeader } from './screen-header'
import { useLanguage, type AppLanguage } from './language-context'
import { languageNames, localize, type LocalizedText } from './locale-utils'

const allConversations = [...conversations, ...travelerConversations]

type ConversationCopy = { name: string; area: LocalizedText; preview: LocalizedText }

const conversationCopy: Record<string, ConversationCopy> = {
  c1: {
    name: 'Makoto Yamaguchi',
    area: { ja: '長野県・小谷村', en: 'Otari, Nagano', zh: '长野县・小谷村', es: 'Otari, Nagano', de: 'Otari, Nagano', fr: 'Otari, Nagano', it: 'Otari, Nagano' },
    preview: { ja: '一緒に歩けるのを楽しみにしています！', en: 'Looking forward to walking with you!', zh: '很期待和你一起散步！', es: '¡Tengo muchas ganas de caminar contigo!', de: 'Ich freue mich auf unseren Spaziergang!', fr: 'J’ai hâte de marcher avec vous !', it: 'Non vedo l’ora di camminare insieme!' },
  },
  c2: {
    name: 'Sayaka Tamura',
    area: { ja: '石川県・能登町', en: 'Noto, Ishikawa', zh: '石川县・能登町', es: 'Noto, Ishikawa', de: 'Noto, Ishikawa', fr: 'Noto, Ishikawa', it: 'Noto, Ishikawa' },
    preview: { ja: '朝市は7時からですよ〜', en: 'The morning market starts at 7am!', zh: '早市早上7点开始哦！', es: '¡El mercado matinal empieza a las 7!', de: 'Der Morgenmarkt beginnt um 7 Uhr!', fr: 'Le marché du matin commence à 7 h !', it: 'Il mercato mattutino inizia alle 7!' },
  },
  c3: {
    name: 'Hisako Kobayashi',
    area: { ja: '京都府・美山町', en: 'Miyama, Kyoto', zh: '京都府・美山町', es: 'Miyama, Kioto', de: 'Miyama, Kyoto', fr: 'Miyama, Kyoto', it: 'Miyama, Kyoto' },
    preview: { ja: 'またいつでも帰ってきてね。', en: 'Come back anytime.', zh: '随时欢迎你再回来。', es: 'Vuelve cuando quieras.', de: 'Komm jederzeit wieder.', fr: 'Revenez quand vous voulez.', it: 'Torna quando vuoi.' },
  },
  tc1: {
    name: 'Sofia Martinez',
    area: { ja: 'スペイン・能登を旅行中', en: 'Spain · Traveling in Noto', zh: '西班牙・正在能登旅行', es: 'España · Viajando por Noto', de: 'Spanien · Unterwegs in Noto', fr: 'Espagne · En voyage à Noto', it: 'Spagna · In viaggio a Noto' },
    preview: { ja: '古い漁港の近くの夕日がすごく綺麗だったよ。', en: 'The sunset near the old fishing port was beautiful.', zh: '老渔港附近的夕阳特别美。', es: 'La puesta de sol junto al viejo puerto pesquero fue preciosa.', de: 'Der Sonnenuntergang am alten Fischerhafen war wunderschön.', fr: 'Le coucher de soleil près du vieux port de pêche était magnifique.', it: 'Il tramonto vicino al vecchio porto dei pescatori era bellissimo.' },
  },
  tc2: {
    name: 'Lucas Bernard',
    area: { ja: 'フランス・小谷村へ再訪', en: 'France · Back in Otari', zh: '法国・再次来到小谷村', es: 'Francia · De vuelta en Otari', de: 'Frankreich · Wieder in Otari', fr: 'France · De retour à Otari', it: 'Francia · Di nuovo a Otari' },
    preview: { ja: '棚田の道にまた来たよ。やっぱり綺麗。', en: 'I found the rice terrace trail again — still beautiful.', zh: '我又找到那条梯田小路了，还是很美。', es: 'Volví a encontrar el sendero de las terrazas de arroz: sigue precioso.', de: 'Ich habe den Reisterrassen-Weg wiedergefunden – immer noch wunderschön.', fr: 'J’ai retrouvé le sentier des rizières en terrasse : toujours aussi beau.', it: 'Ho ritrovato il sentiero delle risaie terrazzate: ancora bellissimo.' },
  },
  tc3: {
    name: 'Mei Lin',
    area: { ja: '台湾・八女を旅行中', en: 'Taiwan · Traveling in Yame', zh: '台湾・正在八女旅行', es: 'Taiwán · Viajando por Yame', de: 'Taiwan · Unterwegs in Yame', fr: 'Taïwan · En voyage à Yame', it: 'Taiwan · In viaggio a Yame' },
    preview: { ja: '朝早い茶畑が本当に綺麗！', en: 'The tea fields are amazing early in the morning!', zh: '清晨的茶园真的太美了！', es: '¡Los campos de té son increíbles por la mañana!', de: 'Die Teefelder sind früh am Morgen unglaublich schön!', fr: 'Les champs de thé sont magnifiques tôt le matin !', it: 'I campi di tè sono stupendi al mattino presto!' },
  },
}

const messageTranslations: Record<string, Partial<Record<AppLanguage, string>>> = {
  'こんにちは！小谷村へようこそ。いつ頃いらっしゃいますか？': {
    en: 'Hello! Welcome to Otari. When are you planning to come?', zh: '你好！欢迎来到小谷村。你打算什么时候来？', es: '¡Hola! Bienvenido a Otari. ¿Cuándo piensas venir?', de: 'Hallo! Willkommen in Otari. Wann möchtest du kommen?', fr: 'Bonjour ! Bienvenue à Otari. Quand pensez-vous venir ?', it: 'Ciao! Benvenuto a Otari. Quando pensi di arrivare?',
  },
  'Hello Makoto-san! I arrive next Saturday. So excited!': {
    ja: 'マコトさんこんにちは！次の土曜に着きます。楽しみです！', zh: '诚先生你好！我下周六到，太期待了！', es: '¡Hola, Makoto! Llego el próximo sábado. ¡Qué ganas!', de: 'Hallo Makoto! Ich komme nächsten Samstag. Ich freue mich riesig!', fr: 'Bonjour Makoto ! J’arrive samedi prochain. J’ai hâte !', it: 'Ciao Makoto! Arrivo sabato prossimo. Non vedo l’ora!',
  },
  'それは良かった。畦道さんぽに一緒に行きましょう。': {
    en: "Wonderful. Let's go for the rice-path walk together.", zh: '太好了。我们一起去走田埂小路吧。', es: 'Qué bien. Vamos juntos a caminar por los senderos entre arrozales.', de: 'Wie schön. Lass uns gemeinsam auf den Feldwegen spazieren.', fr: 'Parfait. Allons ensemble nous promener sur les chemins entre les rizières.', it: 'Che bello. Andiamo insieme a camminare sui sentieri tra le risaie.',
  },
  'Looking forward to walking with you!': {
    ja: '一緒に歩けるのを楽しみにしています！', zh: '很期待和你一起散步！', es: '¡Tengo muchas ganas de caminar contigo!', de: 'Ich freue mich auf unseren Spaziergang!', fr: 'J’ai hâte de marcher avec vous !', it: 'Non vedo l’ora di camminare insieme!',
  },
  'Sayaka-san, what time does the morning market start?': {
    ja: 'さやかさん、朝市は何時からですか？', zh: '早香小姐，早市几点开始？', es: 'Sayaka, ¿a qué hora empieza el mercado matinal?', de: 'Sayaka, wann beginnt der Morgenmarkt?', fr: 'Sayaka, à quelle heure commence le marché du matin ?', it: 'Sayaka, a che ora inizia il mercato mattutino?',
  },
  '朝市は7時からですよ〜。早起きして行きましょう！': {
    en: "The market starts at 7am. Let's wake up early and go!", zh: '早市7点开始哦。我们早点起床一起去吧！', es: 'El mercado empieza a las 7. ¡Madruguemos y vayamos juntos!', de: 'Der Markt beginnt um 7 Uhr. Lass uns früh aufstehen und hingehen!', fr: 'Le marché commence à 7 h. Levons-nous tôt et allons-y ensemble !', it: 'Il mercato inizia alle 7. Alziamoci presto e andiamo insieme!',
  },
  '無事に着きましたか？またいつでも帰ってきてね。': {
    en: 'Did you get home safely? Come back anytime.', zh: '平安到家了吗？随时欢迎你再回来。', es: '¿Llegaste bien? Vuelve cuando quieras.', de: 'Bist du gut angekommen? Komm jederzeit wieder.', fr: 'Vous êtes bien rentré ? Revenez quand vous voulez.', it: 'Sei arrivato bene? Torna quando vuoi.',
  },
  'Thank you Hisako-san. I already miss Miyama. Tadaima soon!': {
    ja: 'ひさこさんありがとう。もう美山が恋しいです。またすぐ「ただいま」します！', zh: '久子女士，谢谢你。我已经开始想念美山了，很快还会回来！', es: 'Gracias, Hisako. Ya echo de menos Miyama. ¡Volveré pronto!', de: 'Danke, Hisako. Ich vermisse Miyama schon. Ich komme bald wieder!', fr: 'Merci, Hisako. Miyama me manque déjà. Je reviendrai bientôt !', it: 'Grazie, Hisako. Mi manca già Miyama. Tornerò presto!',
  },
  'The sunset near the old fishing port was beautiful. There is a quiet path behind the shrine too.': {
    ja: '古い漁港の近くの夕日がすごく綺麗だったよ。神社の裏に静かな小道もあるよ。', zh: '老渔港附近的夕阳特别美，神社后面还有一条安静的小路。', es: 'La puesta de sol junto al viejo puerto fue preciosa. También hay un sendero tranquilo detrás del santuario.', de: 'Der Sonnenuntergang am alten Fischerhafen war wunderschön. Hinter dem Schrein gibt es auch einen ruhigen Weg.', fr: 'Le coucher de soleil près du vieux port était magnifique. Il y a aussi un chemin tranquille derrière le sanctuaire.', it: 'Il tramonto vicino al vecchio porto era bellissimo. Dietro al santuario c’è anche un sentiero tranquillo.',
  },
  'That sounds perfect. Was it crowded around sunset?': {
    ja: 'すごく良さそう。夕日の時間は混んでた？', zh: '听起来太棒了。日落的时候人多吗？', es: 'Suena perfecto. ¿Había mucha gente al atardecer?', de: 'Klingt perfekt. War es zum Sonnenuntergang voll?', fr: 'Ça a l’air parfait. Il y avait du monde au coucher du soleil ?', it: 'Sembra perfetto. C’era molta gente al tramonto?',
  },
  'Not really. A local woman told me around 5pm is the nicest time. I can send you the spot!': {
    ja: 'そんなに混んでなかったよ。地元の方が17時ごろが一番いいって教えてくれた。場所送れるよ！', zh: '人不太多。当地一位女士告诉我下午5点左右最好。我可以把地点发给你！', es: 'No mucho. Una mujer local me dijo que sobre las 17:00 es la mejor hora. ¡Puedo enviarte el sitio!', de: 'Nicht wirklich. Eine Einheimische meinte, gegen 17 Uhr sei es am schönsten. Ich kann dir den Ort schicken!', fr: 'Pas vraiment. Une habitante m’a dit que vers 17 h c’était le plus beau. Je peux t’envoyer l’endroit !', it: 'Non molto. Una signora del posto mi ha detto che verso le 17 è il momento migliore. Posso mandarti il punto!',
  },
  'I found the rice terrace trail again — still beautiful. Makoto showed me this path last year.': {
    ja: '棚田の道にまた来たよ。やっぱり綺麗。去年マコトさんに教えてもらった道なんだ。', zh: '我又找到那条梯田小路了，还是很美。去年是诚先生带我来的。', es: 'Volví a encontrar el sendero de las terrazas. Sigue precioso. Makoto me lo enseñó el año pasado.', de: 'Ich habe den Reisterrassen-Weg wiedergefunden – immer noch wunderschön. Makoto hat ihn mir letztes Jahr gezeigt.', fr: 'J’ai retrouvé le sentier des rizières en terrasse, toujours aussi beau. Makoto me l’avait montré l’an dernier.', it: 'Ho ritrovato il sentiero delle risaie terrazzate, ancora bellissimo. Makoto me l’ha mostrato l’anno scorso.',
  },
  'I want to go there next week. Is the trail easy to walk?': {
    ja: '来週行ってみたい！歩きやすい道？', zh: '我下周也想去！这条路好走吗？', es: 'Quiero ir la semana que viene. ¿Es fácil caminar por el sendero?', de: 'Ich möchte nächste Woche hin. Ist der Weg leicht zu laufen?', fr: 'J’aimerais y aller la semaine prochaine. Le sentier est facile ?', it: 'Vorrei andarci la prossima settimana. Il sentiero è facile da percorrere?',
  },
  'The tea fields are amazing early in the morning! A farmer explained how the first leaves are picked.': {
    ja: '朝早い茶畑が本当に綺麗！農家の方が新芽の摘み方も教えてくれたよ。', zh: '清晨的茶园真的太美了！一位茶农还给我讲了嫩芽是怎么采的。', es: '¡Los campos de té son increíbles por la mañana! Un agricultor me explicó cómo se recogen los primeros brotes.', de: 'Die Teefelder sind früh am Morgen unglaublich schön! Ein Bauer erklärte mir, wie die ersten Blätter gepflückt werden.', fr: 'Les champs de thé sont magnifiques tôt le matin ! Un producteur m’a expliqué comment on cueille les premières feuilles.', it: 'I campi di tè sono stupendi al mattino presto! Un coltivatore mi ha spiegato come si raccolgono le prime foglie.',
  },
  'That is exactly what I want to learn. Which area did you visit?': {
    ja: 'まさにそういうことを知りたい！どのあたりに行ったの？', zh: '这正是我想了解的！你去了哪个区域？', es: 'Eso es exactamente lo que quiero aprender. ¿Qué zona visitaste?', de: 'Genau das möchte ich lernen. In welchem Teil warst du?', fr: 'C’est exactement ce que je veux apprendre. Dans quel secteur es-tu allé ?', it: 'È esattamente quello che voglio imparare. In quale zona sei stata?',
  },
}

export function MessagesScreen({ initialConversationId, onConsumeInitial }: { initialConversationId?: string | null; onConsumeInitial?: () => void }) {
  const [openId, setOpenId] = useState<string | null>(initialConversationId ?? null)
  const { lang } = useLanguage()
  const open = allConversations.find((c) => c.id === openId)

  if (open) {
    return <ChatView conversation={open} onBack={() => { setOpenId(null); onConsumeInitial?.() }} />
  }

  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader
        title="メッセージ"
        titleEn="Messages"
        subtitle="ガイドにも、旅人にも。フォローからDMへつながります。"
        subtitleEn="Message guides and fellow travelers. A follow can become a conversation."
      />

      <div className="mx-4 mt-2 rounded-2xl bg-primary/5 p-3">
        <p className="flex items-center gap-1.5 text-xs font-bold text-primary">
          <Users className="h-4 w-4" aria-hidden />
          {localize(lang, { ja: 'ガイドとも、旅人とも話せます', en: 'Chat with guides and fellow travelers', zh: '可以与向导和旅人聊天', es: 'Habla con guías y otros viajeros', de: 'Mit Guides und anderen Reisenden chatten', fr: 'Discutez avec des guides et d’autres voyageurs', it: 'Chatta con guide e altri viaggiatori' })}
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          {localize(lang, { ja: '相手のメッセージは原文のまま。必要なときだけ、今選んでいる言語で翻訳を表示できます。', en: 'Messages stay in their original language. Show a translation in your selected language only when you need it.', zh: '消息保留原文，需要时可显示为当前选择的语言。', es: 'Los mensajes conservan el idioma original. Muestra la traducción al idioma seleccionado solo cuando la necesites.', de: 'Nachrichten bleiben im Original. Bei Bedarf kannst du eine Übersetzung in deiner gewählten Sprache einblenden.', fr: 'Les messages restent dans leur langue d’origine. Affichez une traduction dans la langue choisie seulement si nécessaire.', it: 'I messaggi restano nella lingua originale. Mostra la traduzione nella lingua selezionata solo quando serve.' })}
        </p>
      </div>

      <ul className="mt-2 divide-y divide-border/70">
        {allConversations.map((c) => {
          const info = conversationCopy[c.id]
          const traveler = c.id.startsWith('tc')
          const name = lang === 'ja' && !traveler ? c.name : info?.name ?? c.name
          const area = info ? localize(lang, info.area) : c.area
          const preview = info ? localize(lang, info.preview) : c.preview
          return (
            <li key={c.id}>
              <button type="button" onClick={() => setOpenId(c.id)} className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors active:bg-secondary/60">
                <Avatar src={c.photo} name={name} size={48} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-serif text-[15px] font-medium text-foreground">{name}</p>
                    <RoleBadge traveler={traveler} />
                    <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{area}</p>
                  <p className="mt-0.5 truncate text-[13px] text-foreground/70">{preview}</p>
                </div>
                {c.unread > 0 && <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-shu px-1.5 text-[11px] font-medium text-shu-foreground">{c.unread}</span>}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ChatView({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) {
  const { lang } = useLanguage()
  const info = conversationCopy[conversation.id]
  const traveler = conversation.id.startsWith('tc')
  const name = lang === 'ja' && !traveler ? conversation.name : info?.name ?? conversation.name
  const area = info ? localize(lang, info.area) : conversation.area

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-card/95 px-3 py-3 backdrop-blur">
        <button type="button" onClick={onBack} aria-label="back" className="flex h-9 w-9 items-center justify-center rounded-full text-foreground"><ChevronLeft className="h-5 w-5" aria-hidden /></button>
        <Avatar src={conversation.photo} name={name} size={40} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-serif text-[15px] font-medium text-foreground">{name}</p>
            <RoleBadge traveler={traveler} />
          </div>
          <p className="truncate text-xs text-muted-foreground">{area}</p>
        </div>
      </header>

      <div className="flex-1 space-y-3 px-4 py-4">{conversation.messages.map((m, i) => <Bubble key={i} message={m} />)}</div>

      <div className="sticky bottom-0 border-t border-border bg-card/95 px-3 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center rounded-full border border-border bg-background px-4 py-2.5">
            <input
              placeholder={localize(lang, { ja: 'メッセージを入力…', en: 'Type a message…', zh: '输入消息…', es: 'Escribe un mensaje…', de: 'Nachricht schreiben…', fr: 'Écrire un message…', it: 'Scrivi un messaggio…' })}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button type="button" aria-label="send" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground"><Send className="h-4 w-4" aria-hidden /></button>
        </div>
      </div>
    </div>
  )
}

function Bubble({ message }: { message: ChatMessage }) {
  const [showTranslation, setShowTranslation] = useState(false)
  const { lang } = useLanguage()
  const mine = message.from === 'me'
  const originalLanguage = (message.originalLanguage ?? 'ja') as AppLanguage
  const fallbackTranslation = lang === 'ja' ? message.translation : lang === 'en' ? message.translation : undefined
  const translated = messageTranslations[message.text]?.[lang] ?? fallbackTranslation
  const canTranslate = lang !== originalLanguage && Boolean(translated)

  return (
    <div className={cn('flex flex-col', mine ? 'items-end' : 'items-start')}>
      <div className={cn('max-w-[78%] rounded-3xl px-4 py-2.5 text-[14px] leading-relaxed', mine ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md border border-border bg-card text-foreground')}>
        <p>{message.text}</p>
        {showTranslation && translated && (
          <div className={cn('mt-2 border-t pt-2', mine ? 'border-primary-foreground/25' : 'border-border')}>
            <p className={cn('mb-1 text-[10px] font-bold', mine ? 'text-primary-foreground/65' : 'text-primary')}>
              {localize(lang, { ja: '日本語で表示', en: `Translation · ${languageNames[lang]}`, zh: `翻译 · ${languageNames[lang]}`, es: `Traducción · ${languageNames[lang]}`, de: `Übersetzung · ${languageNames[lang]}`, fr: `Traduction · ${languageNames[lang]}`, it: `Traduzione · ${languageNames[lang]}` })}
            </p>
            <p className={cn('text-[13px]', mine ? 'text-primary-foreground/90' : 'text-muted-foreground')}>{translated}</p>
          </div>
        )}
      </div>
      <div className="mt-1 flex items-center gap-2">
        {canTranslate && (
          <button type="button" onClick={() => setShowTranslation((v) => !v)} className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
            <Languages className="h-3 w-3" aria-hidden />
            {showTranslation
              ? localize(lang, { ja: '翻訳を隠す', en: 'Hide translation', zh: '隐藏翻译', es: 'Ocultar traducción', de: 'Übersetzung ausblenden', fr: 'Masquer la traduction', it: 'Nascondi traduzione' })
              : localize(lang, { ja: '選択中の言語に翻訳', en: `Translate to ${languageNames[lang]}`, zh: `翻译成${languageNames[lang]}`, es: `Traducir a ${languageNames[lang]}`, de: `Auf ${languageNames[lang]} übersetzen`, fr: `Traduire en ${languageNames[lang]}`, it: `Traduci in ${languageNames[lang]}` })}
          </button>
        )}
        <span className="text-[10px] text-muted-foreground">{message.time}</span>
      </div>
    </div>
  )
}

function RoleBadge({ traveler }: { traveler: boolean }) {
  const { lang } = useLanguage()
  return traveler ? (
    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
      {localize(lang, { ja: '旅人', en: 'Traveler', zh: '旅人', es: 'Viajero', de: 'Reisender', fr: 'Voyageur', it: 'Viaggiatore' })}
    </span>
  ) : (
    <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-shu/12 px-2 py-0.5 text-[9px] font-bold text-shu">
      <BadgeCheck className="h-2.5 w-2.5" aria-hidden />
      {localize(lang, { ja: 'ガイド', en: 'Guide', zh: '向导', es: 'Guía', de: 'Guide', fr: 'Guide', it: 'Guida' })}
    </span>
  )
}

function Avatar({ src, name, size }: { src: string; name: string; size: number }) {
  const className = cn('shrink-0 rounded-full object-cover', size === 48 ? 'h-12 w-12' : 'h-10 w-10')

  if (src.startsWith('http')) {
    return <img src={src} alt={name} width={size} height={size} className={className} />
  }

  return <Image src={src || '/placeholder.svg'} alt={name} width={size} height={size} className={className} />
}
