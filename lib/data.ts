export type Origin = 'local' | 'settler'

export type Guide = {
  id: string
  name: string
  kana: string
  area: string
  photo: string
  intro: string
  level: number
  languages: string[]
  themes: string[]
  rating: number
  reviewCount: number
  origin: Origin
  offers: string[]
  reviews: { name: string; country: string; rating: number; comment: string }[]
}

export const guides: Guide[] = [
  {
    id: 'g1',
    name: '山口 誠',
    kana: 'やまぐち まこと',
    area: '長野県・小谷村',
    photo: '/guides/guide-1.png',
    intro: 'この谷で生まれ育って60年。里山の暮らしと山の恵み、ぜんぶ案内します。',
    level: 5,
    languages: ['日本語', '翻訳機OK'],
    themes: ['自然', '暮らし', '祭り'],
    rating: 4.9,
    reviewCount: 128,
    origin: 'local',
    offers: ['里山の歩き方', '郷土料理づくり', '雪国の暮らし', '地域のマナー'],
    reviews: [
      { name: 'Emma', country: 'イギリス', rating: 5, comment: 'Makoto-san felt like family. I really said "tadaima" here.' },
      { name: 'Lucas', country: 'フランス', rating: 5, comment: '山の知識が本当にすごい。教わることばかりでした。' },
      { name: 'Mei', country: '台湾', rating: 4, comment: 'とても温かい方。また小谷村に帰りたいです。' },
    ],
  },
  {
    id: 'g2',
    name: '田村 さやか',
    kana: 'たむら さやか',
    area: '石川県・能登町',
    photo: '/guides/guide-2.png',
    intro: '東京から移住して7年。よそ者だった私だからこそ伝えられる能登があります。',
    level: 4,
    languages: ['日本語', 'English'],
    themes: ['食', '自然', '暮らし'],
    rating: 4.8,
    reviewCount: 94,
    origin: 'settler',
    offers: ['朝市めぐり', '海辺の暮らし', '発酵食づくり', '文化のはなし'],
    reviews: [
      { name: 'Sofia', country: 'スペイン', rating: 5, comment: 'Sayaka understands both sides. Perfect guide for first-timers.' },
      { name: 'Daniel', country: 'ドイツ', rating: 5, comment: '発酵食のお話が忘れられません。ありがとう。' },
    ],
  },
  {
    id: 'g3',
    name: '中村 陽介',
    kana: 'なかむら ようすけ',
    area: '福岡県・八女市',
    photo: '/guides/guide-3.png',
    intro: '実家は八女茶の農家。食と市場のことなら任せてください！',
    level: 3,
    languages: ['日本語', 'English', '翻訳機OK'],
    themes: ['食', '歴史'],
    rating: 4.7,
    reviewCount: 61,
    origin: 'local',
    offers: ['お茶畑の見学', '市場のあるき方', '郷土の味めぐり'],
    reviews: [
      { name: 'Olivia', country: 'アメリカ', rating: 5, comment: 'The tea tasting was unforgettable. Yosuke is so warm!' },
      { name: 'Chen', country: '中国', rating: 4, comment: '八女茶が大好きになりました。' },
    ],
  },
  {
    id: 'g4',
    name: '小林 久子',
    kana: 'こばやし ひさこ',
    area: '京都府・美山町',
    photo: '/guides/guide-4.png',
    intro: 'かやぶきの里で暮らしています。日本の四季と祭り、暮らしの知恵を分かち合いたい。',
    level: 5,
    languages: ['日本語', '翻訳機OK'],
    themes: ['歴史', '祭り', '暮らし'],
    rating: 5.0,
    reviewCount: 143,
    origin: 'local',
    offers: ['かやぶき集落めぐり', '季節の行事', '和のマナー', '暮らしの知恵'],
    reviews: [
      { name: 'James', country: 'カナダ', rating: 5, comment: 'Hisako-san taught me the meaning of "furusato". Truly special.' },
      { name: 'Anna', country: 'イタリア', rating: 5, comment: '美山での時間は一生の宝物です。ただいま、と言えました。' },
    ],
  },
]

export type EventItem = {
  id: string
  title: string
  image: string
  date: string
  place: string
  capacity: string
  fee: string
  host: string
  hostArea: string
}

export const events: EventItem[] = [
  {
    id: 'e1',
    title: '小谷・里山の知恵交換会',
    image: '/events/event-1.png',
    date: '9月20日(土) 15:00〜17:00',
    place: '長野県・小谷村公民館',
    capacity: '定員 20名',
    fee: '参加費 無料',
    host: '小谷の住民・近隣大学生有志',
    hostArea: '地元・近隣の人が中心',
  },
  {
    id: 'e2',
    title: '能登・朝市と食文化の持ち寄り会',
    image: '/events/event-2.png',
    date: '9月21日(日) 10:00〜12:00',
    place: '石川県・能登町交流センター',
    capacity: '定員 24名',
    fee: '参加費 500円',
    host: '能登の住民・移住者チーム',
    hostArea: '地元・近隣の人が中心',
  },
  {
    id: 'e3',
    title: '美山・暮らしとマナーの語り合い',
    image: '/events/event-3.png',
    date: '9月27日(土) 18:00〜19:30',
    place: '京都府・美山町地域交流館',
    capacity: '定員 30名',
    fee: '参加費 無料',
    host: '美山の世代交流メンバー',
    hostArea: '住民・近隣学生・来訪者',
  },
]

export type ChatMessage = {
  from: 'me' | 'them'
  text: string
  translation?: string
  originalLanguage?: 'ja' | 'en'
  time: string
}

export type Conversation = {
  id: string
  guideId: string
  name: string
  area: string
  photo: string
  preview: string
  unread: number
  time: string
  messages: ChatMessage[]
}

export const conversations: Conversation[] = [
  {
    id: 'c1',
    guideId: 'g1',
    name: '山口 誠',
    area: '長野県・小谷村',
    photo: '/guides/guide-1.png',
    preview: 'Looking forward to walking with you!',
    unread: 2,
    time: '10:24',
    messages: [
      { from: 'them', text: 'こんにちは！小谷村へようこそ。いつ頃いらっしゃいますか？', translation: 'Hello! Welcome to Otari. When are you planning to come?', time: '10:02' },
      { from: 'me', text: 'Hello Makoto-san! I arrive next Saturday. So excited!', translation: 'マコトさんこんにちは！次の土曜に着きます。楽しみです！', originalLanguage: 'en', time: '10:15' },
      { from: 'them', text: 'それは良かった。畦道さんぽに一緒に行きましょう。', translation: "Wonderful. Let's go for the rice-path walk together.", time: '10:20' },
      { from: 'them', text: 'Looking forward to walking with you!', translation: '一緒に歩けるのを楽しみにしています！', originalLanguage: 'en', time: '10:24' },
    ],
  },
  {
    id: 'c2',
    guideId: 'g2',
    name: '田村 さやか',
    area: '石川県・能登町',
    photo: '/guides/guide-2.png',
    preview: '朝市は7時からですよ〜',
    unread: 0,
    time: '昨日',
    messages: [
      { from: 'me', text: 'Sayaka-san, what time does the morning market start?', translation: 'さやかさん、朝市は何時からですか？', originalLanguage: 'en', time: '昨日 18:40' },
      { from: 'them', text: '朝市は7時からですよ〜。早起きして行きましょう！', translation: 'The market starts at 7am. Let\'s wake up early and go!', time: '昨日 18:52' },
    ],
  },
  {
    id: 'c3',
    guideId: 'g4',
    name: '小林 久子',
    area: '京都府・美山町',
    photo: '/guides/guide-4.png',
    preview: 'またいつでも帰ってきてね。',
    unread: 0,
    time: '3日前',
    messages: [
      { from: 'them', text: '無事に着きましたか？またいつでも帰ってきてね。', translation: 'Did you get home safely? Come back anytime.', time: '3日前' },
      { from: 'me', text: 'Thank you Hisako-san. I already miss Miyama. Tadaima soon!', translation: 'ひさこさんありがとう。もう美山が恋しいです。またすぐ「ただいま」します！', originalLanguage: 'en', time: '3日前' },
    ],
  },
]

export const areaChips = ['全国', '北海道・東北', '関東', '中部', '関西', '中国・四国', '九州・沖縄']

export const themeChips = ['自然', '歴史', '食', '祭り', '暮らし', 'マナー']

export const currentUser = {
  name: 'Emma Wilson',
  country: 'イギリス',
  level: 2,
  exchangeCount: 6,
  knowledgePoints: 320,
  nextLevelPoints: 500,
  learnedAreas: ['長野県・小谷村', '京都府・美山町'],
  steps: [
    { label: '教わる', done: true },
    { label: '一緒に案内', done: true },
    { label: '独り立ち', done: false },
    { label: '次へ伝える', done: false },
  ],
}

export type RegionId =
  | 'hokkaido-tohoku'
  | 'kanto'
  | 'chubu'
  | 'kinki'
  | 'chugoku-shikoku'
  | 'kyushu-okinawa'

export type Region = {
  id: RegionId
  name: string
  short: string
  prefIds: string[]
}

export const regions: Region[] = [
  { id: 'hokkaido-tohoku', name: '北海道・東北', short: '北・東北', prefIds: ['hokkaido', 'aomori', 'iwate', 'miyagi', 'akita', 'yamagata', 'fukushima'] },
  { id: 'kanto', name: '関東', short: '関東', prefIds: ['ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'tokyo', 'kanagawa'] },
  { id: 'chubu', name: '中部', short: '中部', prefIds: ['niigata', 'toyama', 'ishikawa', 'fukui', 'yamanashi', 'nagano', 'gifu', 'shizuoka', 'aichi'] },
  { id: 'kinki', name: '近畿', short: '近畿', prefIds: ['mie', 'shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama'] },
  { id: 'chugoku-shikoku', name: '中国・四国', short: '中国四国', prefIds: ['tottori', 'shimane', 'okayama', 'hiroshima', 'yamaguchi', 'tokushima', 'kagawa', 'ehime', 'kochi'] },
  { id: 'kyushu-okinawa', name: '九州・沖縄', short: '九州沖縄', prefIds: ['fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima', 'okinawa'] },
]

export const prefNames: Record<string, string> = {
  hokkaido: '北海道', aomori: '青森県', iwate: '岩手県', miyagi: '宮城県', akita: '秋田県', yamagata: '山形県', fukushima: '福島県',
  ibaraki: '茨城県', tochigi: '栃木県', gunma: '群馬県', saitama: '埼玉県', chiba: '千葉県', tokyo: '東京都', kanagawa: '神奈川県',
  niigata: '新潟県', toyama: '富山県', ishikawa: '石川県', fukui: '福井県', yamanashi: '山梨県', nagano: '長野県', gifu: '岐阜県', shizuoka: '静岡県', aichi: '愛知県',
  mie: '三重県', shiga: '滋賀県', kyoto: '京都府', osaka: '大阪府', hyogo: '兵庫県', nara: '奈良県', wakayama: '和歌山県',
  tottori: '鳥取県', shimane: '島根県', okayama: '岡山県', hiroshima: '広島県', yamaguchi: '山口県', tokushima: '徳島県', kagawa: '香川県', ehime: '愛媛県', kochi: '高知県',
  fukuoka: '福岡県', saga: '佐賀県', nagasaki: '長崎県', kumamoto: '熊本県', oita: '大分県', miyazaki: '宮崎県', kagoshima: '鹿児島県', okinawa: '沖縄県',
}

const prefToRegion: Record<string, RegionId> = regions.reduce((acc, r) => {
  for (const p of r.prefIds) acc[p] = r.id
  return acc
}, {} as Record<string, RegionId>)

export function regionOfPref(prefId: string): RegionId | undefined {
  return prefToRegion[prefId]
}

export function regionById(id: RegionId): Region {
  return regions.find((r) => r.id === id)!
}

export function prefName(prefId: string): string {
  return prefNames[prefId] ?? prefId
}
