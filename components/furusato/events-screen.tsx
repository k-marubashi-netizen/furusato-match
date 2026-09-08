'use client'

import Image from 'next/image'
import { BookOpen, CalendarDays, Globe2, Handshake, Home, MapPin, Plus, Users, Utensils, Wallet } from 'lucide-react'
import { events, type EventItem } from '@/lib/data'
import { ScreenHeader } from './screen-header'
import { useLanguage } from './language-context'
import { localize, type LocalizedText } from './locale-utils'

const extraEvents: EventItem[] = [
  {
    id: 'e4',
    title: 'Welcome to 美山！ローカルごはん交流ナイト',
    image: '/events/event-2.png',
    date: '10月3日(土) 17:30〜20:00',
    place: '京都府・美山町地域交流館',
    capacity: '定員 18名',
    fee: '参加費 1,500円',
    host: '美山の地域メンバー',
    hostArea: '外国人旅行者・留学生向け',
  },
  {
    id: 'e5',
    title: '古民家ステイ＆朝ごはんづくり',
    image: '/events/event-1.png',
    date: '10月10日(土) 16:00〜翌9:00',
    place: '長野県・小谷村',
    capacity: '定員 8名',
    fee: '参加費 8,500円',
    host: '小谷の地域ホスト＋提携宿',
    hostArea: '外国人旅行者歓迎',
  },
]

const allEvents = [...events, ...extraEvents]

type EventCopy = {
  title: LocalizedText
  date: LocalizedText
  place: LocalizedText
  capacity: LocalizedText
  fee: LocalizedText
  host: LocalizedText
  hostArea: LocalizedText
  description: LocalizedText
  target: LocalizedText
  badge: LocalizedText
  note?: LocalizedText
  kind: 'local' | 'mixed' | 'visitor' | 'stay'
}

const copy: Record<string, EventCopy> = {
  e1: {
    title: { ja: '雪国の暮らしをのぞく、里山さんぽ', en: 'A Satoyama Walk into Snow-Country Life', zh: '走进雪国生活的里山散步', es: 'Paseo satoyama por la vida de la región de nieve', de: 'Satoyama-Spaziergang durch das Leben im Schneeland', fr: 'Balade satoyama à la découverte de la vie sous la neige', it: 'Passeggiata satoyama nella vita del paese della neve' },
    date: { ja: '9月19日(土) 15:00〜17:00', en: 'Sat, Sep 19 · 3:00–5:00 PM', zh: '9月19日（周六）15:00–17:00', es: 'Sáb, 19 sep · 15:00–17:00', de: 'Sa., 19. Sep. · 15:00–17:00', fr: 'Sam. 19 sept. · 15:00–17:00', it: 'Sab 19 set · 15:00–17:00' },
    place: { ja: '長野県・小谷村', en: 'Otari, Nagano', zh: '长野县・小谷村', es: 'Otari, Nagano', de: 'Otari, Nagano', fr: 'Otari, Nagano', it: 'Otari, Nagano' },
    capacity: { ja: '定員 16名', en: '16 people', zh: '16人', es: '16 personas', de: '16 Personen', fr: '16 personnes', it: '16 persone' },
    fee: { ja: '参加費 500円', en: '¥500', zh: '500日元', es: '¥500', de: '¥500', fr: '500 ¥', it: '¥500' },
    host: { ja: '小谷の地域メンバー', en: 'Otari community members', zh: '小谷社区成员', es: 'Miembros de la comunidad de Otari', de: 'Mitglieder der Gemeinde Otari', fr: 'Membres de la communauté d’Otari', it: 'Membri della comunità di Otari' },
    hostArea: { ja: '地域の人・近隣の人・旅行者', en: 'Locals, nearby people and travelers', zh: '当地居民、周边居民与旅人', es: 'Gente local, cercana y viajeros', de: 'Menschen vor Ort, aus der Umgebung und Reisende', fr: 'Habitants, personnes des environs et voyageurs', it: 'Persone locali, dei dintorni e viaggiatori' },
    description: { ja: '田んぼの畦道を歩きながら、雪国の暮らし、山菜、田畑のことを地域の人に教わります。', en: 'Walk the rice-field paths while local people share how life, farming, and wild plants change with the snowy seasons.', zh: '沿着田埂散步，由当地人介绍雪国生活、山菜与农田。', es: 'Camina entre arrozales mientras la gente local cuenta cómo cambian la vida, el campo y las plantas silvestres con la nieve.', de: 'Auf Feldwegen erzählen Einheimische, wie Schnee, Landwirtschaft und Wildpflanzen den Alltag prägen.', fr: 'En marchant entre les rizières, les habitants racontent la vie sous la neige, l’agriculture et les plantes sauvages.', it: 'Camminando tra le risaie, gli abitanti raccontano la vita nella neve, i campi e le piante selvatiche.' },
    target: { ja: '地域を知りたい人なら誰でも', en: 'Anyone who wants to know the area', zh: '任何想了解当地的人', es: 'Cualquiera que quiera conocer la zona', de: 'Alle, die die Region kennenlernen möchten', fr: 'Toute personne souhaitant découvrir la région', it: 'Chiunque voglia conoscere il territorio' },
    badge: { ja: 'みんなで歩く', en: 'Walk together', zh: '一起散步', es: 'Paseo en grupo', de: 'Gemeinsam unterwegs', fr: 'Balade ensemble', it: 'Passeggiata insieme' },
    kind: 'mixed',
  },
  e2: {
    title: { ja: '朝市で朝ごはん。能登の食卓を知る', en: 'Breakfast at the Morning Market: Taste Everyday Noto', zh: '在早市吃早餐，认识能登的日常餐桌', es: 'Desayuno en el mercado: descubre la mesa cotidiana de Noto', de: 'Frühstück auf dem Morgenmarkt: Noto im Alltag', fr: 'Petit-déjeuner au marché : découvrir la table quotidienne de Noto', it: 'Colazione al mercato: scopri la tavola quotidiana di Noto' },
    date: { ja: '9月20日(日) 8:00〜10:00', en: 'Sun, Sep 20 · 8:00–10:00 AM', zh: '9月20日（周日）8:00–10:00', es: 'Dom, 20 sep · 8:00–10:00', de: 'So., 20. Sep. · 8:00–10:00', fr: 'Dim. 20 sept. · 8:00–10:00', it: 'Dom 20 set · 8:00–10:00' },
    place: { ja: '石川県・能登町 朝市周辺', en: 'Morning market area, Noto, Ishikawa', zh: '石川县・能登町早市周边', es: 'Zona del mercado matinal, Noto, Ishikawa', de: 'Morgenmarkt, Noto, Ishikawa', fr: 'Autour du marché du matin, Noto, Ishikawa', it: 'Zona del mercato mattutino, Noto, Ishikawa' },
    capacity: { ja: '定員 12名', en: '12 people', zh: '12人', es: '12 personas', de: '12 Personen', fr: '12 personnes', it: '12 persone' },
    fee: { ja: '参加費 1,200円', en: '¥1,200', zh: '1,200日元', es: '¥1.200', de: '¥1.200', fr: '1 200 ¥', it: '¥1.200' },
    host: { ja: '能登の住民・飲食店メンバー', en: 'Noto residents & local food businesses', zh: '能登居民与当地餐饮成员', es: 'Residentes de Noto y comercios locales', de: 'Bewohner von Noto & lokale Gastronomie', fr: 'Habitants de Noto et commerces locaux', it: 'Residenti di Noto e attività locali' },
    hostArea: { ja: '旅行者も参加しやすい少人数制', en: 'Small group, easy for travelers to join', zh: '小团体，旅人也容易参加', es: 'Grupo pequeño, fácil para viajeros', de: 'Kleine Gruppe, gut für Reisende', fr: 'Petit groupe, facile à rejoindre pour les voyageurs', it: 'Piccolo gruppo, facile da raggiungere per i viaggiatori' },
    description: { ja: '地元の人と一緒に朝市を歩き、旬の魚や発酵食を買って、その場で小さな朝ごはんを囲みます。', en: 'Explore the market with locals, pick seasonal fish and fermented foods, then share a simple breakfast together.', zh: '和当地人逛早市，挑选时令鱼类与发酵食品，一起吃一顿简单早餐。', es: 'Recorre el mercado con gente local, elige pescado de temporada y alimentos fermentados y comparte un desayuno sencillo.', de: 'Mit Einheimischen über den Markt gehen, saisonalen Fisch und Fermentiertes auswählen und gemeinsam frühstücken.', fr: 'Parcourez le marché avec des habitants, choisissez poissons de saison et aliments fermentés, puis partagez un petit-déjeuner.', it: 'Visita il mercato con gli abitanti, scegli pesce di stagione e cibi fermentati e condividi una semplice colazione.' },
    target: { ja: '地域の人・外国人旅行者・国内旅行者', en: 'Locals, international and domestic travelers', zh: '当地居民、外国旅人、国内旅人', es: 'Gente local y viajeros internacionales o nacionales', de: 'Einheimische sowie internationale und japanische Reisende', fr: 'Habitants et voyageurs internationaux ou japonais', it: 'Persone locali e viaggiatori internazionali o giapponesi' },
    badge: { ja: '食でつながる', en: 'Connect through food', zh: '用美食连接', es: 'Conectar con la comida', de: 'Verbindung durch Essen', fr: 'Créer du lien par la cuisine', it: 'Connettersi attraverso il cibo' },
    kind: 'mixed',
  },
  e3: {
    title: { ja: '美山の夜、囲炉裏で暮らしトーク', en: 'An Evening in Miyama: Fireside Local-Life Talk', zh: '美山之夜：围炉聊当地生活', es: 'Una noche en Miyama: charla junto al fuego', de: 'Ein Abend in Miyama: Gespräch am Feuer', fr: 'Une soirée à Miyama : discussion autour du feu', it: 'Una sera a Miyama: chiacchiere accanto al focolare' },
    date: { ja: '9月26日(土) 18:00〜19:30', en: 'Sat, Sep 26 · 6:00–7:30 PM', zh: '9月26日（周六）18:00–19:30', es: 'Sáb, 26 sep · 18:00–19:30', de: 'Sa., 26. Sep. · 18:00–19:30', fr: 'Sam. 26 sept. · 18:00–19:30', it: 'Sab 26 set · 18:00–19:30' },
    place: { ja: '京都府・美山町地域交流館', en: 'Miyama Community Hall, Kyoto', zh: '京都府・美山町社区交流馆', es: 'Centro comunitario de Miyama, Kioto', de: 'Gemeinschaftshaus Miyama, Kyoto', fr: 'Maison communautaire de Miyama, Kyoto', it: 'Centro comunitario di Miyama, Kyoto' },
    capacity: { ja: '定員 20名', en: '20 people', zh: '20人', es: '20 personas', de: '20 Personen', fr: '20 personnes', it: '20 persone' },
    fee: { ja: '参加費 無料', en: 'Free', zh: '免费', es: 'Gratis', de: 'Kostenlos', fr: 'Gratuit', it: 'Gratuito' },
    host: { ja: '美山の地域メンバー', en: 'Miyama community members', zh: '美山社区成员', es: 'Miembros de la comunidad de Miyama', de: 'Mitglieder der Gemeinde Miyama', fr: 'Membres de la communauté de Miyama', it: 'Membri della comunità di Miyama' },
    hostArea: { ja: '世代を問わず参加', en: 'Open to all generations', zh: '不限年龄参与', es: 'Abierto a todas las generaciones', de: 'Offen für alle Generationen', fr: 'Ouvert à toutes les générations', it: 'Aperto a tutte le generazioni' },
    description: { ja: '季節の行事、ご近所づきあい、お風呂の入り方まで。地域の日常をテーマに、気軽に質問し合います。', en: 'Ask anything about seasonal customs, neighborly life, bathing culture, and other small parts of everyday life.', zh: '从季节活动、邻里交往到泡澡方式，都可以轻松提问交流。', es: 'Pregunta sobre costumbres estacionales, vida vecinal, baños y pequeños detalles del día a día.', de: 'Fragen zu Bräuchen, Nachbarschaft, Badekultur und kleinen Dingen des Alltags sind willkommen.', fr: 'Posez vos questions sur les coutumes, la vie de voisinage, les bains et les petits détails du quotidien.', it: 'Domande libere su tradizioni stagionali, vicinato, bagni e piccoli aspetti della vita quotidiana.' },
    target: { ja: '住民・近隣の学生・旅行者', en: 'Residents, nearby students and travelers', zh: '居民、附近学生与旅人', es: 'Residentes, estudiantes cercanos y viajeros', de: 'Bewohner, Studierende aus der Umgebung und Reisende', fr: 'Habitants, étudiants des environs et voyageurs', it: 'Residenti, studenti dei dintorni e viaggiatori' },
    badge: { ja: '暮らしを語る', en: 'Talk local life', zh: '聊当地生活', es: 'Hablar de la vida local', de: 'Über Alltag sprechen', fr: 'Parler de la vie locale', it: 'Parlare della vita locale' },
    kind: 'local',
  },
  e4: {
    title: { ja: 'Welcome to 美山！ローカルごはん交流ナイト', en: 'Welcome to Miyama! Local Dinner Exchange Night', zh: '欢迎来到美山！当地晚餐交流之夜', es: '¡Bienvenido a Miyama! Noche de cena e intercambio local', de: 'Willkommen in Miyama! Lokaler Dinner-Abend', fr: 'Bienvenue à Miyama ! Soirée dîner et rencontres locales', it: 'Benvenuti a Miyama! Serata cena e incontro locale' },
    date: { ja: '10月3日(土) 17:30〜20:00', en: 'Sat, Oct 3 · 5:30–8:00 PM', zh: '10月3日（周六）17:30–20:00', es: 'Sáb, 3 oct · 17:30–20:00', de: 'Sa., 3. Okt. · 17:30–20:00', fr: 'Sam. 3 oct. · 17:30–20:00', it: 'Sab 3 ott · 17:30–20:00' },
    place: { ja: '京都府・美山町地域交流館', en: 'Miyama Community Hall, Kyoto', zh: '京都府・美山町社区交流馆', es: 'Centro comunitario de Miyama, Kioto', de: 'Gemeinschaftshaus Miyama, Kyoto', fr: 'Maison communautaire de Miyama, Kyoto', it: 'Centro comunitario di Miyama, Kyoto' },
    capacity: { ja: '定員 18名', en: '18 people', zh: '18人', es: '18 personas', de: '18 Personen', fr: '18 personnes', it: '18 persone' },
    fee: { ja: '参加費 1,500円', en: '¥1,500', zh: '1,500日元', es: '¥1.500', de: '¥1.500', fr: '1 500 ¥', it: '¥1.500' },
    host: { ja: '美山の地域メンバー', en: 'Miyama community members', zh: '美山社区成员', es: 'Miembros de la comunidad de Miyama', de: 'Mitglieder der Gemeinde Miyama', fr: 'Membres de la communauté de Miyama', it: 'Membri della comunità di Miyama' },
    hostArea: { ja: '外国人旅行者・留学生向け', en: 'For international travelers & students', zh: '面向外国旅人和留学生', es: 'Para viajeros y estudiantes internacionales', de: 'Für internationale Reisende & Studierende', fr: 'Pour voyageurs et étudiants internationaux', it: 'Per viaggiatori e studenti internazionali' },
    description: { ja: '地域の人と夕食を囲みながら、注文、温泉、神社、ごみ分別など「日本で最初に知りたいこと」を気軽に聞ける交流会です。', en: 'Share dinner with local people and ask the practical questions you want answered first in Japan: ordering food, hot springs, shrines, recycling, and more.', zh: '与当地人一起吃晚餐，轻松询问点餐、温泉、神社、垃圾分类等刚到日本最想知道的事情。', es: 'Cena con gente local y pregunta lo que más necesitas saber al llegar a Japón: pedir comida, onsen, santuarios, reciclaje y más.', de: 'Beim Abendessen mit Einheimischen praktische Fragen zu Essen bestellen, Onsen, Schreinen, Mülltrennung und mehr stellen.', fr: 'Dînez avec des habitants et posez vos premières questions pratiques sur le Japon : commander, onsen, sanctuaires, tri des déchets, etc.', it: 'Cena con persone del posto e fai domande pratiche su ordinazioni, onsen, santuari, raccolta differenziata e altro.' },
    target: { ja: '外国人旅行者・留学生＋地域の人', en: 'International travelers/students + locals', zh: '外国旅人/留学生＋当地居民', es: 'Viajeros/estudiantes internacionales + locales', de: 'Internationale Reisende/Studierende + Einheimische', fr: 'Voyageurs/étudiants internationaux + habitants', it: 'Viaggiatori/studenti internazionali + persone locali' },
    badge: { ja: '外国人旅行者向け', en: 'For international visitors', zh: '面向外国旅人', es: 'Para visitantes internacionales', de: 'Für internationale Gäste', fr: 'Pour visiteurs internationaux', it: 'Per visitatori internazionali' },
    kind: 'visitor',
  },
  e5: {
    title: { ja: '古民家ステイ＆朝ごはんづくり', en: 'Traditional House Stay & Breakfast Together', zh: '古民家住宿＋一起做早餐', es: 'Noche en casa tradicional + desayuno juntos', de: 'Übernachtung im alten Haus & gemeinsames Frühstück', fr: 'Nuit en maison traditionnelle & petit-déjeuner ensemble', it: 'Notte in casa tradizionale & colazione insieme' },
    date: { ja: '10月10日(土) 16:00〜翌9:00', en: 'Sat, Oct 10 · 4:00 PM–9:00 AM next day', zh: '10月10日（周六）16:00–次日9:00', es: 'Sáb, 10 oct · 16:00–9:00 del día siguiente', de: 'Sa., 10. Okt. · 16:00–9:00 am Folgetag', fr: 'Sam. 10 oct. · 16:00–9:00 le lendemain', it: 'Sab 10 ott · 16:00–9:00 del giorno dopo' },
    place: { ja: '長野県・小谷村（提携宿）', en: 'Otari, Nagano (partner lodging)', zh: '长野县・小谷村（合作住宿设施）', es: 'Otari, Nagano (alojamiento asociado)', de: 'Otari, Nagano (Partner-Unterkunft)', fr: 'Otari, Nagano (hébergement partenaire)', it: 'Otari, Nagano (struttura partner)' },
    capacity: { ja: '定員 8名', en: '8 people', zh: '8人', es: '8 personas', de: '8 Personen', fr: '8 personnes', it: '8 persone' },
    fee: { ja: '参加費 8,500円', en: '¥8,500', zh: '8,500日元', es: '¥8.500', de: '¥8.500', fr: '8 500 ¥', it: '¥8.500' },
    host: { ja: '小谷の地域ホスト＋提携宿', en: 'Otari hosts + partner lodging', zh: '小谷当地接待者＋合作住宿设施', es: 'Anfitriones de Otari + alojamiento asociado', de: 'Gastgeber aus Otari + Partner-Unterkunft', fr: 'Hôtes d’Otari + hébergement partenaire', it: 'Host di Otari + struttura partner' },
    hostArea: { ja: '外国人旅行者歓迎', en: 'International visitors welcome', zh: '欢迎外国旅人', es: 'Viajeros internacionales bienvenidos', de: 'Internationale Gäste willkommen', fr: 'Voyageurs internationaux bienvenus', it: 'Viaggiatori internazionali benvenuti' },
    description: { ja: '夕方に地域を歩き、古民家で地域の人と夕食。翌朝は一緒に味噌汁やおにぎりをつくる、一晩かけた交流です。', en: 'Walk the village at dusk, share dinner with local hosts, then make miso soup and rice balls together the next morning.', zh: '傍晚在村里散步，与当地人共进晚餐，第二天早上一起做味噌汤和饭团。', es: 'Pasea por el pueblo al atardecer, cena con anfitriones locales y prepara sopa de miso y onigiri juntos a la mañana siguiente.', de: 'Am Abend durchs Dorf gehen, mit lokalen Gastgebern essen und am nächsten Morgen gemeinsam Misosuppe und Onigiri zubereiten.', fr: 'Promenez-vous dans le village au crépuscule, dînez avec des habitants puis préparez soupe miso et onigiri ensemble le lendemain matin.', it: 'Passeggia nel villaggio al tramonto, cena con gli host locali e prepara zuppa di miso e onigiri insieme la mattina seguente.' },
    target: { ja: '外国人旅行者＋地域ホスト', en: 'International travelers + local hosts', zh: '外国旅人＋当地接待者', es: 'Viajeros internacionales + anfitriones locales', de: 'Internationale Reisende + lokale Gastgeber', fr: 'Voyageurs internationaux + hôtes locaux', it: 'Viaggiatori internazionali + host locali' },
    badge: { ja: '宿泊交流', en: 'Stay & connect', zh: '住宿交流', es: 'Estancia e intercambio', de: 'Übernachten & begegnen', fr: 'Séjour & rencontres', it: 'Soggiorno & incontro' },
    note: { ja: '宿泊は、許可・届出済みの提携宿泊施設を利用する想定です。', en: 'The prototype assumes stays are provided through appropriately licensed or registered partner lodging.', zh: '本原型设定为使用已取得许可或完成备案的合作住宿设施。', es: 'El prototipo contempla alojamiento únicamente mediante establecimientos asociados con la autorización o registro correspondiente.', de: 'Im Prototyp erfolgt die Übernachtung über entsprechend genehmigte oder registrierte Partner-Unterkünfte.', fr: 'Le prototype prévoit un hébergement uniquement dans des établissements partenaires disposant des autorisations ou déclarations nécessaires.', it: 'Il prototipo prevede il pernottamento solo presso strutture partner con le autorizzazioni o registrazioni necessarie.' },
    kind: 'stay',
  },
}

export function EventsScreen() {
  const { lang } = useLanguage()

  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader
        title="イベント"
        titleEn="Events"
        subtitle="地域の人と旅行者が、実際に会って一緒に過ごす。興味に合う交流を選べます。"
        subtitleEn="Meet local people in person and choose the kind of exchange that fits your trip."
      />

      <div className="px-4 pb-3 pt-2">
        <div className="mb-3 rounded-2xl border border-primary/15 bg-primary/5 p-3.5">
          <p className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <Handshake className="h-4 w-4" aria-hidden />
            {localize(lang, { ja: '歩く・食べる・話す・泊まる。交流の形はいろいろ。', en: 'Walk, eat, talk, or stay — different ways to connect.', zh: '散步、吃饭、聊天、住宿——交流方式很多。', es: 'Caminar, comer, conversar o alojarse: distintas formas de conectar.', de: 'Spazieren, essen, reden oder übernachten – viele Arten der Begegnung.', fr: 'Marcher, manger, discuter ou séjourner : plusieurs façons de créer du lien.', it: 'Camminare, mangiare, parlare o soggiornare: tanti modi per connettersi.' })}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            {localize(lang, { ja: '地域の人向けだけでなく、外国人旅行者が入りやすい企画も用意しています。', en: 'Some events are community-led, while others are designed especially for international visitors.', zh: '既有社区主导的活动，也有专门方便外国旅人参加的活动。', es: 'Hay actividades de la comunidad y otras pensadas especialmente para visitantes internacionales.', de: 'Es gibt lokale Formate und Angebote speziell für internationale Gäste.', fr: 'Certains événements sont portés par la communauté, d’autres sont conçus spécialement pour les visiteurs internationaux.', it: 'Ci sono eventi della comunità e altri pensati apposta per i visitatori internazionali.' })}
          </p>
        </div>
        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow-sm transition-transform active:scale-[0.99]">
          <Plus className="h-4 w-4" aria-hidden />
          {localize(lang, { ja: 'イベントを開く（主催する）', en: 'Host an event', zh: '发起活动', es: 'Organizar un evento', de: 'Event veranstalten', fr: 'Organiser un événement', it: 'Organizza un evento' })}
        </button>
      </div>

      <div className="space-y-4 px-4">
        {allEvents.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  )
}

function EventCard({ event }: { event: EventItem }) {
  const { lang } = useLanguage()
  const c = copy[event.id]

  const icon = c.kind === 'stay' ? Home : c.kind === 'visitor' ? Globe2 : c.kind === 'local' ? BookOpen : Utensils
  const BadgeIcon = icon

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="relative h-40 w-full">
        <Image src={event.image || '/placeholder.svg'} alt={localize(lang, c.title)} fill className="object-cover" sizes="100vw" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur ${c.kind === 'visitor' || c.kind === 'stay' ? 'bg-shu/90 text-shu-foreground' : 'bg-card/92 text-primary'}`}>
            <BadgeIcon className="h-3 w-3" aria-hidden />
            {localize(lang, c.badge)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="font-serif text-lg font-bold leading-snug text-foreground">{localize(lang, c.title)}</h2>
        <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{localize(lang, c.description)}</p>

        <div className="mt-3 rounded-2xl bg-secondary p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-secondary-foreground">
            <Users className="h-3.5 w-3.5 text-primary" aria-hidden />
            {localize(lang, { ja: 'こんな人におすすめ', en: 'Good for', zh: '适合人群', es: 'Ideal para', de: 'Gut geeignet für', fr: 'Idéal pour', it: 'Ideale per' })}
          </p>
          <p className="mt-1 text-[12px] text-secondary-foreground/80">{localize(lang, c.target)}</p>
        </div>

        <dl className="mt-3 space-y-1.5 text-[13px] text-foreground/80">
          <Row icon={CalendarDays}>{localize(lang, c.date)}</Row>
          <Row icon={MapPin}>{localize(lang, c.place)}</Row>
          <Row icon={Users}>{localize(lang, c.capacity)}</Row>
          <Row icon={Wallet}>{localize(lang, c.fee)}</Row>
        </dl>

        {c.note && (
          <p className="mt-3 rounded-xl border border-border bg-background px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
            {localize(lang, c.note)}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">
              {localize(lang, { ja: '主催：', en: 'Host: ', zh: '主办：', es: 'Organiza: ', de: 'Gastgeber: ', fr: 'Organisé par : ', it: 'Organizzato da: ' })}{localize(lang, c.host)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{localize(lang, c.hostArea)}</p>
          </div>
          <button type="button" className="shrink-0 rounded-full bg-shu px-5 py-2 text-sm font-medium text-shu-foreground transition-transform active:scale-95">
            {localize(lang, { ja: '参加する', en: 'Join', zh: '参加', es: 'Participar', de: 'Teilnehmen', fr: 'Participer', it: 'Partecipa' })}
          </button>
        </div>
      </div>
    </article>
  )
}

function Row({ icon: Icon, children }: { icon: typeof CalendarDays; children: React.ReactNode }) {
  return <div className="flex items-center gap-2"><Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden /><dd>{children}</dd></div>
}
