'use client'

import Image from 'next/image'
import { CalendarDays, Globe2, MapPin, Plus, ShieldCheck, Users, Wallet } from 'lucide-react'
import { ScreenHeader } from './screen-header'
import { useLanguage } from './language-context'
import { localize, type LocalizedText } from './locale-utils'

type DemoEvent = {
  id: string
  image: string
  title: LocalizedText
  description: LocalizedText
  date: LocalizedText
  place: LocalizedText
  capacity: LocalizedText
  fee: LocalizedText
  host: LocalizedText
  target: LocalizedText
  badge: LocalizedText
  visitorFocused?: boolean
  stay?: boolean
}

const events: DemoEvent[] = [
  {
    id: 'e1', image: '/events/event-1.png',
    title: { ja: '雪国の暮らしをのぞく、里山さんぽ', en: 'A Satoyama Walk into Snow-Country Life', zh: '走进雪国生活的里山散步', es: 'Paseo satoyama por la vida en la nieve', de: 'Satoyama-Spaziergang durch das Leben im Schneeland', fr: 'Balade satoyama à la découverte de la vie sous la neige', it: 'Passeggiata satoyama nella vita del paese della neve' },
    description: { ja: '田んぼの畦道を歩きながら、雪国の暮らしや山の恵みを地域の人に教わります。', en: 'Walk the rice-field paths while local people share how snowy seasons shape daily life and the landscape.', zh: '沿着田埂散步，由当地人介绍雪国生活与山里的恩惠。', es: 'Camina entre arrozales mientras la gente local comparte cómo la nieve da forma a la vida cotidiana.', de: 'Auf Feldwegen erzählen Einheimische, wie Schnee und Landschaft den Alltag prägen.', fr: 'En marchant entre les rizières, les habitants racontent comment la neige façonne le quotidien.', it: 'Camminando tra le risaie, gli abitanti raccontano come la neve modella la vita quotidiana.' },
    date: { ja: '9月19日(土) 15:00〜17:00', en: 'Sat, Sep 19 · 3:00–5:00 PM', zh: '9月19日（周六）15:00–17:00', es: 'Sáb, 19 sep · 15:00–17:00', de: 'Sa., 19. Sep. · 15:00–17:00', fr: 'Sam. 19 sept. · 15:00–17:00', it: 'Sab 19 set · 15:00–17:00' },
    place: { ja: '長野県・小谷村', en: 'Otari, Nagano', zh: '长野县・小谷村', es: 'Otari, Nagano', de: 'Otari, Nagano', fr: 'Otari, Nagano', it: 'Otari, Nagano' },
    capacity: { ja: '定員 16名', en: '16 people', zh: '16人', es: '16 personas', de: '16 Personen', fr: '16 personnes', it: '16 persone' },
    fee: { ja: '参加費 500円', en: '¥500', zh: '500日元', es: '¥500', de: '¥500', fr: '500 ¥', it: '¥500' },
    host: { ja: '小谷の地域メンバー', en: 'Otari community members', zh: '小谷社区成员', es: 'Miembros de la comunidad de Otari', de: 'Mitglieder der Gemeinde Otari', fr: 'Membres de la communauté d’Otari', it: 'Membri della comunità di Otari' },
    target: { ja: '地域を知りたい人なら誰でも', en: 'Anyone curious about the area', zh: '任何想了解当地的人', es: 'Cualquiera que quiera conocer la zona', de: 'Alle, die die Region kennenlernen möchten', fr: 'Toute personne curieuse de la région', it: 'Chiunque voglia conoscere il territorio' },
    badge: { ja: '自然体験', en: 'Nature', zh: '自然体验', es: 'Naturaleza', de: 'Natur', fr: 'Nature', it: 'Natura' },
  },
  {
    id: 'e2', image: '/events/event-2.png',
    title: { ja: '朝市で朝ごはん。能登の食卓を知る', en: 'Breakfast at the Morning Market: Everyday Noto', zh: '在早市吃早餐，认识能登的日常餐桌', es: 'Desayuno en el mercado: descubre Noto', de: 'Frühstück auf dem Morgenmarkt: Noto im Alltag', fr: 'Petit-déjeuner au marché : le quotidien de Noto', it: 'Colazione al mercato: la vita quotidiana di Noto' },
    description: { ja: '地元の人と朝市を歩き、旬の魚や発酵食を選んで、小さな朝ごはんを一緒に囲みます。', en: 'Explore the market with locals, choose seasonal food, then sit down for a simple breakfast together.', zh: '和当地人逛早市，挑选时令食材，然后一起吃一顿简单早餐。', es: 'Recorre el mercado con gente local, elige productos de temporada y comparte un desayuno.', de: 'Mit Einheimischen über den Markt gehen, Saisonales auswählen und gemeinsam frühstücken.', fr: 'Parcourez le marché avec des habitants, choisissez des produits de saison puis partagez un petit-déjeuner.', it: 'Visita il mercato con gli abitanti, scegli prodotti di stagione e condividi una colazione.' },
    date: { ja: '9月20日(日) 8:00〜10:00', en: 'Sun, Sep 20 · 8:00–10:00 AM', zh: '9月20日（周日）8:00–10:00', es: 'Dom, 20 sep · 8:00–10:00', de: 'So., 20. Sep. · 8:00–10:00', fr: 'Dim. 20 sept. · 8:00–10:00', it: 'Dom 20 set · 8:00–10:00' },
    place: { ja: '石川県・能登町 朝市周辺', en: 'Morning market area, Noto, Ishikawa', zh: '石川县・能登町早市周边', es: 'Mercado matinal de Noto, Ishikawa', de: 'Morgenmarkt in Noto, Ishikawa', fr: 'Marché du matin de Noto, Ishikawa', it: 'Mercato mattutino di Noto, Ishikawa' },
    capacity: { ja: '定員 12名', en: '12 people', zh: '12人', es: '12 personas', de: '12 Personen', fr: '12 personnes', it: '12 persone' },
    fee: { ja: '参加費 1,200円', en: '¥1,200', zh: '1,200日元', es: '¥1.200', de: '¥1.200', fr: '1 200 ¥', it: '¥1.200' },
    host: { ja: '能登の住民・飲食店メンバー', en: 'Noto residents & local food businesses', zh: '能登居民与当地餐饮成员', es: 'Residentes y comercios locales de Noto', de: 'Bewohner von Noto & lokale Gastronomie', fr: 'Habitants de Noto et commerces locaux', it: 'Residenti di Noto e attività locali' },
    target: { ja: '地域の人・外国人旅行者・国内旅行者', en: 'Locals, international and domestic travelers', zh: '当地居民、外国旅人、国内旅人', es: 'Gente local y viajeros', de: 'Einheimische und Reisende', fr: 'Habitants et voyageurs', it: 'Persone locali e viaggiatori' },
    badge: { ja: '食で交流', en: 'Food & connection', zh: '美食交流', es: 'Comida y encuentro', de: 'Essen & Begegnung', fr: 'Cuisine & rencontre', it: 'Cibo e incontro' },
  },
  {
    id: 'e3', image: '/events/event-3.png',
    title: { ja: '美山の夜、囲炉裏で暮らしトーク', en: 'An Evening in Miyama: Fireside Local-Life Talk', zh: '美山之夜：围炉聊当地生活', es: 'Una noche en Miyama: charla junto al fuego', de: 'Ein Abend in Miyama: Gespräch am Feuer', fr: 'Une soirée à Miyama : discussion autour du feu', it: 'Una sera a Miyama: chiacchiere accanto al focolare' },
    description: { ja: '季節の行事、ご近所づきあい、お風呂の入り方まで。地域の日常を囲炉裏を囲んで気軽に話します。', en: 'Sit around the hearth and talk about seasonal customs, neighborly life, bathing culture, and everyday questions.', zh: '围坐炉边，聊季节习俗、邻里生活、泡澡文化和日常问题。', es: 'Charla junto al fuego sobre costumbres, vecindad, baños y preguntas cotidianas.', de: 'Am Feuer über Bräuche, Nachbarschaft, Badekultur und Alltagsfragen sprechen.', fr: 'Autour du feu, échangez sur les coutumes, le voisinage, les bains et le quotidien.', it: 'Accanto al focolare si parla di tradizioni, vicinato, bagni e vita quotidiana.' },
    date: { ja: '9月26日(土) 18:00〜19:30', en: 'Sat, Sep 26 · 6:00–7:30 PM', zh: '9月26日（周六）18:00–19:30', es: 'Sáb, 26 sep · 18:00–19:30', de: 'Sa., 26. Sep. · 18:00–19:30', fr: 'Sam. 26 sept. · 18:00–19:30', it: 'Sab 26 set · 18:00–19:30' },
    place: { ja: '京都府・美山町地域交流館', en: 'Miyama Community Hall, Kyoto', zh: '京都府・美山町社区交流馆', es: 'Centro comunitario de Miyama, Kioto', de: 'Gemeinschaftshaus Miyama, Kyoto', fr: 'Maison communautaire de Miyama, Kyoto', it: 'Centro comunitario di Miyama, Kyoto' },
    capacity: { ja: '定員 20名', en: '20 people', zh: '20人', es: '20 personas', de: '20 Personen', fr: '20 personnes', it: '20 persone' },
    fee: { ja: '参加費 無料', en: 'Free', zh: '免费', es: 'Gratis', de: 'Kostenlos', fr: 'Gratuit', it: 'Gratuito' },
    host: { ja: '美山の地域メンバー', en: 'Miyama community members', zh: '美山社区成员', es: 'Miembros de la comunidad de Miyama', de: 'Mitglieder der Gemeinde Miyama', fr: 'Membres de la communauté de Miyama', it: 'Membri della comunità di Miyama' },
    target: { ja: '住民・近隣の学生・旅行者', en: 'Residents, nearby students and travelers', zh: '居民、附近学生与旅人', es: 'Residentes, estudiantes cercanos y viajeros', de: 'Bewohner, Studierende aus der Umgebung und Reisende', fr: 'Habitants, étudiants des environs et voyageurs', it: 'Residenti, studenti vicini e viaggiatori' },
    badge: { ja: '暮らしを語る', en: 'Local-life talk', zh: '聊当地生活', es: 'Vida local', de: 'Alltagsgespräch', fr: 'Vie locale', it: 'Vita locale' },
  },
  {
    id: 'e4', image: '/events/event-4.png', visitorFocused: true,
    title: { ja: 'Welcome to 美山！ローカルごはん交流ナイト', en: 'Welcome to Miyama! Local Dinner Exchange Night', zh: '欢迎来到美山！当地晚餐交流之夜', es: '¡Bienvenidos a Miyama! Noche de cena local', de: 'Willkommen in Miyama! Lokaler Dinner-Abend', fr: 'Bienvenue à Miyama ! Soirée dîner local', it: 'Benvenuti a Miyama! Serata di cena locale' },
    description: { ja: '外国人旅行者・留学生向け。家庭料理を一緒に作りながら、食卓のマナーや地域の暮らしを自然に教わります。', en: 'Designed for international travelers and students. Cook a home-style meal together and learn table customs through conversation.', zh: '面向外国旅人和留学生。一起做家常菜，在交流中自然了解餐桌礼仪和当地生活。', es: 'Para viajeros y estudiantes internacionales. Cocina una comida casera y aprende las costumbres de mesa conversando.', de: 'Für internationale Reisende und Studierende: gemeinsam Hausmannskost kochen und Tischkultur im Gespräch kennenlernen.', fr: 'Pour voyageurs et étudiants internationaux : cuisinez un repas familial et découvrez les usages à table en échangeant.', it: 'Per viaggiatori e studenti internazionali: cucina un pasto casalingo e scopri le usanze a tavola parlando insieme.' },
    date: { ja: '10月3日(土) 17:30〜20:00', en: 'Sat, Oct 3 · 5:30–8:00 PM', zh: '10月3日（周六）17:30–20:00', es: 'Sáb, 3 oct · 17:30–20:00', de: 'Sa., 3. Okt. · 17:30–20:00', fr: 'Sam. 3 oct. · 17:30–20:00', it: 'Sab 3 ott · 17:30–20:00' },
    place: { ja: '京都府・美山町地域交流館', en: 'Miyama Community Hall, Kyoto', zh: '京都府・美山町社区交流馆', es: 'Centro comunitario de Miyama, Kioto', de: 'Gemeinschaftshaus Miyama, Kyoto', fr: 'Maison communautaire de Miyama, Kyoto', it: 'Centro comunitario di Miyama, Kyoto' },
    capacity: { ja: '定員 18名', en: '18 people', zh: '18人', es: '18 personas', de: '18 Personen', fr: '18 personnes', it: '18 persone' },
    fee: { ja: '参加費 1,500円', en: '¥1,500', zh: '1,500日元', es: '¥1.500', de: '¥1.500', fr: '1 500 ¥', it: '¥1.500' },
    host: { ja: '美山の地域メンバー', en: 'Miyama community members', zh: '美山社区成员', es: 'Miembros de la comunidad de Miyama', de: 'Mitglieder der Gemeinde Miyama', fr: 'Membres de la communauté de Miyama', it: 'Membri della comunità di Miyama' },
    target: { ja: '外国人旅行者・留学生・地域の人', en: 'International travelers, students and locals', zh: '外国旅人、留学生和当地居民', es: 'Viajeros internacionales, estudiantes y gente local', de: 'Internationale Reisende, Studierende und Einheimische', fr: 'Voyageurs internationaux, étudiants et habitants', it: 'Viaggiatori internazionali, studenti e persone locali' },
    badge: { ja: '外国人向け', en: 'International welcome', zh: '面向外国人', es: 'Internacional', de: 'International', fr: 'International', it: 'Internazionale' },
  },
  {
    id: 'e5', image: '/events/event-5.png', visitorFocused: true, stay: true,
    title: { ja: '古民家ステイ＆朝ごはんづくり', en: 'Kominka Stay & Breakfast with Local Hosts', zh: '古民家住宿与早餐制作', es: 'Estancia en kominka y desayuno con anfitriones locales', de: 'Kominka-Aufenthalt & Frühstück mit lokalen Gastgebern', fr: 'Séjour en kominka & petit-déjeuner avec des hôtes locaux', it: 'Soggiorno in kominka e colazione con host locali' },
    description: { ja: '提携する宿泊施設に泊まり、夕方の交流から翌朝の朝ごはんづくりまで地域の暮らしに触れます。', en: 'Stay at a partner lodging facility and experience local life from the evening gathering through breakfast the next morning.', zh: '入住合作住宿设施，从傍晚交流到第二天早餐制作，体验当地生活。', es: 'Alójate en un establecimiento asociado y vive la vida local desde la reunión de la tarde hasta el desayuno.', de: 'In einer Partnerunterkunft übernachten und vom Abendtreffen bis zum Frühstück lokalen Alltag erleben.', fr: 'Séjournez dans un hébergement partenaire et découvrez la vie locale, de la soirée au petit-déjeuner.', it: 'Soggiorna in una struttura partner e vivi la quotidianità locale dalla sera alla colazione.' },
    date: { ja: '10月10日(土) 16:00〜翌9:00', en: 'Sat, Oct 10 · 4:00 PM–9:00 AM next day', zh: '10月10日（周六）16:00–次日9:00', es: 'Sáb, 10 oct · 16:00–9:00 del día siguiente', de: 'Sa., 10. Okt. · 16:00–9:00 Uhr am Folgetag', fr: 'Sam. 10 oct. · 16:00–9:00 le lendemain', it: 'Sab 10 ott · 16:00–9:00 del giorno successivo' },
    place: { ja: '長野県・小谷村', en: 'Otari, Nagano', zh: '长野县・小谷村', es: 'Otari, Nagano', de: 'Otari, Nagano', fr: 'Otari, Nagano', it: 'Otari, Nagano' },
    capacity: { ja: '定員 8名', en: '8 people', zh: '8人', es: '8 personas', de: '8 Personen', fr: '8 personnes', it: '8 persone' },
    fee: { ja: '参加費 8,500円', en: '¥8,500', zh: '8,500日元', es: '¥8.500', de: '¥8.500', fr: '8 500 ¥', it: '¥8.500' },
    host: { ja: '小谷の地域ホスト＋提携宿', en: 'Otari local hosts + partner lodging', zh: '小谷当地接待者＋合作住宿设施', es: 'Anfitriones de Otari + alojamiento asociado', de: 'Lokale Gastgeber in Otari + Partnerunterkunft', fr: 'Hôtes locaux d’Otari + hébergement partenaire', it: 'Host locali di Otari + struttura partner' },
    target: { ja: '外国人旅行者・国内旅行者', en: 'International and domestic travelers', zh: '外国旅人、国内旅人', es: 'Viajeros internacionales y nacionales', de: 'Internationale und japanische Reisende', fr: 'Voyageurs internationaux et japonais', it: 'Viaggiatori internazionali e giapponesi' },
    badge: { ja: '宿泊体験', en: 'Overnight stay', zh: '住宿体验', es: 'Estancia', de: 'Übernachtung', fr: 'Séjour', it: 'Soggiorno' },
  },
]

export function EventsScreen() {
  const { lang } = useLanguage()
  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader title="イベント" titleEn="Events" subtitle="歩く、食べる、語る、泊まる。地域の人と会うきっかけを、いろんな形で。" subtitleEn="Walk, eat, talk, stay — different ways to meet people who know the place." />
      <div className="px-4 pb-3 pt-2">
        <div className="rounded-2xl border border-primary/15 bg-primary/5 p-3.5">
          <p className="flex items-center gap-1.5 text-xs font-bold text-primary"><Globe2 className="h-4 w-4" aria-hidden />{localize(lang, { ja: '旅行者向けも、地域の人向けもあります', en: 'For travelers and community members', zh: '既有面向旅人的活动，也有面向当地人的活动', es: 'Para viajeros y miembros de la comunidad', de: 'Für Reisende und Menschen aus der Region', fr: 'Pour les voyageurs et les habitants', it: 'Per viaggiatori e persone della comunità' })}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{localize(lang, { ja: '「観光メニュー」ではなく、一緒に何かをすることで自然に会話が始まるイベントを並べています。', en: 'Not just tourist activities: each event gives people something to do together so conversation starts naturally.', zh: '不只是观光项目，而是通过一起做某件事，让交流自然发生。', es: 'No son solo actividades turísticas: hacer algo juntos hace que la conversación surja de forma natural.', de: 'Nicht nur Touristenprogramme: Gemeinsames Tun lässt Gespräche ganz natürlich entstehen.', fr: 'Pas seulement des activités touristiques : faire quelque chose ensemble fait naître la conversation naturellement.', it: 'Non semplici attività turistiche: fare qualcosa insieme fa nascere la conversazione in modo naturale.' })}</p>
        </div>
        <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow-sm"><Plus className="h-4 w-4" aria-hidden />{localize(lang, { ja: 'イベントを開く（主催する）', en: 'Host an event', zh: '发起活动', es: 'Organizar un evento', de: 'Event veranstalten', fr: 'Organiser un événement', it: 'Organizza un evento' })}</button>
      </div>
      <div className="space-y-4 px-4">{events.map((event) => <EventCard key={event.id} event={event} />)}</div>
    </div>
  )
}

function EventCard({ event }: { event: DemoEvent }) {
  const { lang } = useLanguage()
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="relative h-40 w-full">
        <Image src={event.image} alt={localize(lang, event.title)} fill className="object-cover" sizes="100vw" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className={event.visitorFocused ? 'rounded-full bg-shu/90 px-2.5 py-1 text-[11px] font-bold text-shu-foreground backdrop-blur' : 'rounded-full bg-card/92 px-2.5 py-1 text-[11px] font-bold text-primary backdrop-blur'}>{localize(lang, event.badge)}</span>
          {event.visitorFocused && <span className="inline-flex items-center gap-1 rounded-full bg-card/92 px-2.5 py-1 text-[11px] font-bold text-primary backdrop-blur"><Globe2 className="h-3 w-3" aria-hidden />{localize(lang, { ja: '外国人歓迎', en: 'International welcome', zh: '欢迎外国旅人', es: 'Viajeros internacionales bienvenidos', de: 'Internationale Gäste willkommen', fr: 'Voyageurs internationaux bienvenus', it: 'Viaggiatori internazionali benvenuti' })}</span>}
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-serif text-lg font-bold text-foreground">{localize(lang, event.title)}</h2>
        <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{localize(lang, event.description)}</p>
        <div className="mt-3 rounded-2xl bg-secondary p-3"><p className="text-[11px] font-bold text-secondary-foreground">{localize(lang, { ja: 'こんな人におすすめ', en: 'Good for', zh: '推荐给', es: 'Ideal para', de: 'Gut geeignet für', fr: 'Idéal pour', it: 'Ideale per' })}</p><p className="mt-1 text-[12px] text-secondary-foreground/80">{localize(lang, event.target)}</p></div>
        <dl className="mt-3 space-y-1.5 text-[13px] text-foreground/80"><Row icon={CalendarDays}>{localize(lang, event.date)}</Row><Row icon={MapPin}>{localize(lang, event.place)}</Row><Row icon={Users}>{localize(lang, event.capacity)}</Row><Row icon={Wallet}>{localize(lang, event.fee)}</Row></dl>
        {event.stay && <div className="mt-3 flex items-start gap-2 rounded-2xl border border-primary/15 bg-primary/5 p-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /><p className="text-[11px] leading-relaxed text-muted-foreground">{localize(lang, { ja: '宿泊は、必要な許可・届出を行った提携宿泊施設を利用する想定です。', en: 'Demo concept: overnight stays use partner lodging facilities with the required licenses or notifications.', zh: '演示设定：住宿使用已取得必要许可或完成申报的合作住宿设施。', es: 'Concepto demo: el alojamiento se realiza en establecimientos asociados con las licencias o registros necesarios.', de: 'Demo-Konzept: Übernachtungen erfolgen in Partnerunterkünften mit den erforderlichen Genehmigungen oder Meldungen.', fr: 'Concept de démonstration : les nuitées ont lieu dans des hébergements partenaires disposant des autorisations ou déclarations nécessaires.', it: 'Concept demo: i pernottamenti avvengono in strutture partner con le autorizzazioni o notifiche necessarie.' })}</p></div>}
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/60 pt-3"><div className="min-w-0"><p className="text-sm font-medium text-foreground">{localize(lang, { ja: '主催：', en: 'Host: ', zh: '主办：', es: 'Organiza: ', de: 'Gastgeber: ', fr: 'Organisé par : ', it: 'Organizzato da: ' })}{localize(lang, event.host)}</p></div><button type="button" className="shrink-0 rounded-full bg-shu px-5 py-2 text-sm font-medium text-shu-foreground">{localize(lang, { ja: '参加する', en: 'Join', zh: '参加', es: 'Participar', de: 'Teilnehmen', fr: 'Participer', it: 'Partecipa' })}</button></div>
      </div>
    </article>
  )
}

function Row({ icon: Icon, children }: { icon: typeof CalendarDays; children: React.ReactNode }) {
  return <div className="flex items-center gap-2"><Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden /><dd>{children}</dd></div>
}
