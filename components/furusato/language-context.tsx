'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AppLanguage = 'ja' | 'en' | 'zh' | 'es' | 'de' | 'fr' | 'it'

type LanguageContextValue = {
  lang: AppLanguage
  setLang: (lang: AppLanguage) => void
  t: (ja: string, en: string) => string
}

type ExtraTranslations = Partial<Record<Exclude<AppLanguage, 'ja' | 'en'>, string>>

const extraTranslations: Record<string, ExtraTranslations> = {
  '恋愛じゃなく、“交流”のマッチング': {
    zh: '不是恋爱，而是“交流”的匹配', es: 'Conexiones, no citas', de: 'Begegnungen statt Dating', fr: 'Des rencontres, pas des rendez-vous amoureux', it: 'Connessioni, non appuntamenti',
  },
  '日本に、“ただいま”と言える場所を。': {
    zh: '在日本，找到一个能说“我回来了”的地方。', es: 'Encuentra en Japón un lugar al que puedas decir «he vuelto».', de: 'Finde in Japan einen Ort, an dem du sagen kannst: „Ich bin wieder da.“', fr: 'Trouvez au Japon un endroit où vous pouvez dire « je suis de retour ».', it: 'Trova in Giappone un luogo in cui poter dire “sono tornato”.',
  },
  '外国人観光客、昔からの住民、移住者、そして地域の近くに暮らす大学生や社会人まで。地域を知る人と、知りたい人をつなぎます。': {
    zh: '连接外国游客、老居民、新居民，以及住在附近的大学生和上班族，让了解当地的人与想了解当地的人相遇。',
    es: 'Conectamos a viajeros con residentes de toda la vida, nuevos vecinos y estudiantes o trabajadores de zonas cercanas que conocen la comunidad.',
    de: 'Wir verbinden Reisende mit langjährigen Bewohnern, Zugezogenen sowie Studierenden und Berufstätigen aus der Umgebung, die die Region kennen.',
    fr: 'Nous mettons en relation les voyageurs avec les habitants de longue date, les nouveaux arrivants et les étudiants ou actifs des environs qui connaissent la région.',
    it: 'Mettiamo in contatto i viaggiatori con residenti di lunga data, nuovi abitanti e studenti o lavoratori delle zone vicine che conoscono il territorio.',
  },
  'おすすめの旅人': { zh: '推荐旅人', es: 'Viajeros recomendados', de: 'Empfohlene Reisende', fr: 'Voyageurs recommandés', it: 'Viaggiatori consigliati' },
  '同じ地域に興味を持つ旅人をフォロー。気になったらそのままDMへ。': {
    zh: '关注对同一地区感兴趣的旅人，想聊的话可以直接发私信。', es: 'Sigue a viajeros interesados en los mismos lugares y pasa directamente al mensaje privado.', de: 'Folge Reisenden mit Interesse an denselben Orten und starte direkt eine Nachricht.', fr: 'Suivez des voyageurs intéressés par les mêmes lieux et passez directement en message privé.', it: 'Segui viaggiatori interessati agli stessi luoghi e passa subito ai messaggi privati.',
  },
  '旅人どうしでも、地域の発見を交換。': { zh: '旅人之间也能分享当地发现。', es: 'Los viajeros también comparten descubrimientos locales.', de: 'Auch Reisende teilen lokale Entdeckungen.', fr: 'Les voyageurs partagent aussi leurs découvertes locales.', it: 'Anche i viaggiatori condividono scoperte locali.' },
  'DMを見てみる': { zh: '查看私信', es: 'Abrir mensaje', de: 'Nachricht öffnen', fr: 'Ouvrir le message', it: 'Apri il messaggio' },
  'ふるさとガイドを探す': { zh: '寻找故乡向导', es: 'Buscar un guía Furusato', de: 'Furusato-Guide finden', fr: 'Trouver un guide Furusato', it: 'Trova una guida Furusato' },
  '住民・移住者・近隣の学生や社会人など、地域を知る人を探せます。': {
    zh: '可以寻找老居民、新居民、附近学生和上班族等了解当地的人。', es: 'Busca residentes, nuevos vecinos, estudiantes o trabajadores cercanos que conozcan la zona.', de: 'Finde Bewohner, Zugezogene sowie Studierende oder Berufstätige aus der Umgebung, die die Region kennen.', fr: 'Trouvez des habitants, nouveaux arrivants, étudiants ou actifs des environs qui connaissent la région.', it: 'Trova residenti, nuovi abitanti, studenti o lavoratori delle vicinanze che conoscono la zona.',
  },
  '条件に合うガイドが見つかりませんでした': { zh: '没有找到符合条件的向导', es: 'No se encontraron guías con estos filtros', de: 'Keine passenden Guides gefunden', fr: 'Aucun guide ne correspond aux filtres', it: 'Nessuna guida corrisponde ai filtri' },
  '条件をリセット': { zh: '重置条件', es: 'Restablecer filtros', de: 'Filter zurücksetzen', fr: 'Réinitialiser les filtres', it: 'Reimposta filtri' },
  '観光客を増やすのではなく、“ふるさと”を持つ人を増やす。': {
    zh: '不是增加游客，而是增加拥有“故乡”的人。', es: 'No buscamos más turistas, sino más personas con un lugar al que llamar hogar.', de: 'Nicht mehr Touristen, sondern mehr Menschen mit einem Ort, den sie Heimat nennen.', fr: 'Pas plus de touristes, mais plus de personnes ayant un lieu qu’elles peuvent appeler chez elles.', it: 'Non più turisti, ma più persone con un luogo da chiamare casa.',
  },
  'あなたの“ふるさと”をつくろう': { zh: '找到属于你的“故乡”', es: 'Encuentra tu furusato', de: 'Finde dein Furusato', fr: 'Trouvez votre furusato', it: 'Trova il tuo furusato' },
  'フォロー中': { zh: '已关注', es: 'Siguiendo', de: 'Folge ich', fr: 'Abonné', it: 'Segui già' },
  'フォローバック': { zh: '回关', es: 'Seguir también', de: 'Zurückfolgen', fr: 'Suivre en retour', it: 'Segui anche tu' },
  'フォローする': { zh: '关注', es: 'Seguir', de: 'Folgen', fr: 'Suivre', it: 'Segui' },
  'フォロワー': { zh: '粉丝', es: 'seguidores', de: 'Follower', fr: 'abonnés', it: 'follower' },
  'DMを送る': { zh: '发送私信', es: 'Enviar mensaje', de: 'Nachricht senden', fr: 'Envoyer un message', it: 'Invia messaggio' },
  '詳しく見る': { zh: '查看详情', es: 'Ver perfil', de: 'Profil ansehen', fr: 'Voir le profil', it: 'Vedi profilo' },
  '地域の交流会': { zh: '当地交流会', es: 'Encuentros locales', de: 'Lokale Treffen', fr: 'Rencontres locales', it: 'Incontri locali' },
  '地元・近隣の人が知識を持ち寄る場所。外国人旅行者も、地域を学ぶ参加者として加われます。': {
    zh: '当地和周边的人分享彼此的知识，外国旅人也可以作为学习者参加。', es: 'Un espacio donde personas locales y cercanas comparten conocimientos. Los viajeros internacionales también pueden participar para aprender.', de: 'Ein Ort, an dem Menschen aus der Region und Umgebung Wissen teilen. Internationale Reisende können zum Lernen teilnehmen.', fr: 'Un lieu où les habitants et les personnes des environs partagent leurs connaissances. Les voyageurs internationaux peuvent aussi participer pour apprendre.', it: 'Un luogo in cui persone locali e dei dintorni condividono conoscenze. Anche i viaggiatori internazionali possono partecipare per imparare.',
  },
  '主役は、地元・近隣の人たち': { zh: '主角是当地和周边的人', es: 'Protagonizado por gente local y cercana', de: 'Im Mittelpunkt stehen Menschen aus der Region', fr: 'Au cœur : les habitants et les personnes des environs', it: 'Al centro: persone locali e dei dintorni' },
  '知識交換会を開く（主催する）': { zh: '发起知识交流会', es: 'Organizar un intercambio local', de: 'Lokalen Wissensaustausch veranstalten', fr: 'Organiser un échange de savoirs locaux', it: 'Organizza uno scambio di conoscenze locali' },
  '地元・近隣メイン': { zh: '当地为主', es: 'Liderado localmente', de: 'Lokal geführt', fr: 'Mené localement', it: 'Guidato dalla comunità' },
  '旅行者参加OK': { zh: '欢迎旅人', es: 'Viajeros bienvenidos', de: 'Reisende willkommen', fr: 'Voyageurs bienvenus', it: 'Viaggiatori benvenuti' },
  'こんな人が中心': { zh: '主要参与者', es: 'Participan sobre todo', de: 'Hauptsächlich dabei', fr: 'Participants principaux', it: 'Partecipano soprattutto' },
  '主催：': { zh: '主办：', es: 'Organiza: ', de: 'Gastgeber: ', fr: 'Organisé par : ', it: 'Organizzato da: ' },
  '参加する': { zh: '参加', es: 'Participar', de: 'Teilnehmen', fr: 'Participer', it: 'Partecipa' },
  '本人確認済みガイド': { zh: '已验证向导', es: 'Guía verificado', de: 'Verifizierter Guide', fr: 'Guide vérifié', it: 'Guida verificata' },
  '料金の目安': { zh: '参考费用', es: 'Precio orientativo', de: 'Richtpreis', fr: 'Tarif indicatif', it: 'Costo indicativo' },
  '安心設計': { zh: '安全与信任', es: 'Confianza y seguridad', de: 'Vertrauen & Sicherheit', fr: 'Confiance et sécurité', it: 'Fiducia e sicurezza' },
  '相互レビュー制': { zh: '双向评价', es: 'Reseñas mutuas', de: 'Beidseitige Bewertungen', fr: 'Avis réciproques', it: 'Recensioni reciproche' },
  '地域の知識度': { zh: '当地知识度', es: 'Conocimiento local', de: 'Lokalkenntnis', fr: 'Connaissance locale', it: 'Conoscenza locale' },
  'この交流の目的': { zh: '交流的目的', es: 'Objetivo del intercambio', de: 'Ziel des Austauschs', fr: 'But de l’échange', it: 'Scopo dello scambio' },
  '得意テーマ': { zh: '擅长主题', es: 'Especialidades', de: 'Schwerpunkte', fr: 'Spécialités locales', it: 'Specialità locali' },
  '対応言語': { zh: '支持语言', es: 'Idiomas', de: 'Sprachen', fr: 'Langues', it: 'Lingue' },
  '案内できること': { zh: '可以一起做的事', es: 'Qué podemos hacer', de: 'Was wir gemeinsam machen können', fr: 'Ce que nous pouvons faire ensemble', it: 'Cosa possiamo fare insieme' },
  'メッセージ': { zh: '消息', es: 'Mensaje', de: 'Nachricht', fr: 'Message', it: 'Messaggio' },
  '一緒に歩く': { zh: '一起走走', es: 'Caminar juntos', de: 'Gemeinsam unterwegs', fr: 'Marcher ensemble', it: 'Camminare insieme' },
  '昔からの地元': { zh: '老居民', es: 'Residente de siempre', de: 'Langjährig vor Ort', fr: 'Habitant de longue date', it: 'Residente da sempre' },
  '移り住んだ人': { zh: '新居民', es: 'Nuevo residente', de: 'Zugezogen', fr: 'Nouvel habitant', it: 'Nuovo residente' },
  '近隣から通う人': { zh: '周边参与者', es: 'Participante cercano', de: 'Teilnehmer aus der Umgebung', fr: 'Participant des environs', it: 'Partecipante dei dintorni' },
  'すべて': { zh: '全部', es: 'Todo', de: 'Alle', fr: 'Tout', it: 'Tutto' },
  '自然': { zh: '自然', es: 'Naturaleza', de: 'Natur', fr: 'Nature', it: 'Natura' },
  '歴史': { zh: '历史', es: 'Historia', de: 'Geschichte', fr: 'Histoire', it: 'Storia' },
  '食': { zh: '美食', es: 'Comida', de: 'Essen', fr: 'Cuisine', it: 'Cibo' },
  '祭り': { zh: '节庆', es: 'Festivales', de: 'Feste', fr: 'Fêtes', it: 'Festival' },
  '暮らし': { zh: '生活', es: 'Vida local', de: 'Alltag', fr: 'Vie locale', it: 'Vita locale' },
  'マナー': { zh: '礼仪', es: 'Modales', de: 'Verhaltensregeln', fr: 'Savoir-vivre', it: 'Buone maniere' },
  '日本語': { zh: '日语', es: 'Japonés', de: 'Japanisch', fr: 'Japonais', it: 'Giapponese' },
  '翻訳機OK': { zh: '可使用翻译工具', es: 'Traductor OK', de: 'Übersetzer OK', fr: 'Traducteur accepté', it: 'Traduttore OK' },
  'スキップ': { zh: '跳过', es: 'Saltar', de: 'Überspringen', fr: 'Passer', it: 'Salta' },
  '次へ': { zh: '下一步', es: 'Siguiente', de: 'Weiter', fr: 'Suivant', it: 'Avanti' },
  'ふるさとを探しにいく': { zh: '去寻找你的故乡', es: 'Buscar tu furusato', de: 'Finde dein Furusato', fr: 'Trouver votre furusato', it: 'Trova il tuo furusato' },
  'なにを投稿しますか？': { zh: '你想发布什么？', es: '¿Qué quieres publicar?', de: 'Was möchtest du posten?', fr: 'Que souhaitez-vous publier ?', it: 'Cosa vuoi pubblicare?' },
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export const languageOptions: { code: AppLanguage; short: string; label: string }[] = [
  { code: 'ja', short: 'JP', label: '日本語' },
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'zh', short: '中文', label: '中文' },
  { code: 'es', short: 'ES', label: 'Español' },
  { code: 'de', short: 'DE', label: 'Deutsch' },
  { code: 'fr', short: 'FR', label: 'Français' },
  { code: 'it', short: 'IT', label: 'Italiano' },
]

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<AppLanguage>('ja')

  const t = (ja: string, en: string) => {
    if (lang === 'ja') return ja
    if (lang === 'en') return en
    return extraTranslations[ja]?.[lang] ?? en
  }

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}

export function LanguageToggle({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <label
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-bold shadow-sm',
        inverse ? 'bg-white/15 text-white' : 'border border-border bg-card text-foreground',
        className,
      )}
    >
      <Languages className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as AppLanguage)}
        className={cn('max-w-[92px] cursor-pointer bg-transparent outline-none', inverse ? 'text-white' : 'text-foreground')}
        aria-label="Language"
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code} className="text-foreground">
            {option.short} · {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
