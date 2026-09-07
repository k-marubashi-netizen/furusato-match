import type { Conversation } from './data'

export type FollowState = 'none' | 'following' | 'follows-you'

export type TravelerProfile = {
  id: string
  conversationId: string
  name: string
  countryJa: string
  countryEn: string
  statusJa: string
  statusEn: string
  bioJa: string
  bioEn: string
  photo: string
  interestsJa: string[]
  interestsEn: string[]
  followers: number
  following: number
  followState: FollowState
}

// Demo-only profile images from a public avatar service.
export const recommendedTravelers: TravelerProfile[] = [
  {
    id: 't1',
    conversationId: 'tc1',
    name: 'Sofia Martinez',
    countryJa: 'スペイン',
    countryEn: 'Spain',
    statusJa: '能登を旅行中',
    statusEn: 'Traveling in Noto',
    bioJa: '観光地より、地元の市場や海辺の暮らしが好き。次は朝市を歩きたい。',
    bioEn: 'I love local markets and seaside life more than famous sights. Next: the morning market.',
    photo: 'https://i.pravatar.cc/300?img=47',
    interestsJa: ['食', '海', '暮らし'],
    interestsEn: ['Food', 'Sea', 'Local life'],
    followers: 348,
    following: 211,
    followState: 'follows-you',
  },
  {
    id: 't2',
    conversationId: 'tc2',
    name: 'Lucas Bernard',
    countryJa: 'フランス',
    countryEn: 'France',
    statusJa: '小谷村へ2回目の旅',
    statusEn: 'Second trip to Otari',
    bioJa: '山と小さな集落が好き。前回教わった場所を、今度は旅仲間にも共有したい。',
    bioEn: 'I love mountains and small villages. I want to share the places locals showed me last time.',
    photo: 'https://i.pravatar.cc/300?img=12',
    interestsJa: ['自然', '写真', '里山'],
    interestsEn: ['Nature', 'Photography', 'Satoyama'],
    followers: 521,
    following: 304,
    followState: 'following',
  },
  {
    id: 't3',
    conversationId: 'tc3',
    name: 'Mei Lin',
    countryJa: '台湾',
    countryEn: 'Taiwan',
    statusJa: '八女のお茶文化を勉強中',
    statusEn: 'Learning about Yame tea culture',
    bioJa: 'お茶と工芸が好き。地元の人に教わったことを旅の記録にしています。',
    bioEn: 'Tea and crafts are my thing. I keep notes on what local people teach me during my trips.',
    photo: 'https://i.pravatar.cc/300?img=5',
    interestsJa: ['お茶', '工芸', '文化'],
    interestsEn: ['Tea', 'Crafts', 'Culture'],
    followers: 287,
    following: 190,
    followState: 'none',
  },
]

export const travelerConversations: Conversation[] = [
  {
    id: 'tc1',
    guideId: 'traveler-t1',
    name: 'Sofia Martinez',
    area: 'スペイン・能登を旅行中',
    photo: 'https://i.pravatar.cc/300?img=47',
    preview: 'The sunset near the old fishing port was beautiful.',
    unread: 1,
    time: '11:08',
    messages: [
      {
        from: 'them',
        text: 'The sunset near the old fishing port was beautiful. There is a quiet path behind the shrine too.',
        translation: '古い漁港の近くの夕日がすごく綺麗だったよ。神社の裏に静かな小道もあるよ。',
        originalLanguage: 'en',
        time: '10:54',
      },
      {
        from: 'me',
        text: 'That sounds perfect. Was it crowded around sunset?',
        translation: 'すごく良さそう。夕日の時間は混んでた？',
        originalLanguage: 'en',
        time: '11:02',
      },
      {
        from: 'them',
        text: 'Not really. A local woman told me around 5pm is the nicest time. I can send you the spot!',
        translation: 'そんなに混んでなかったよ。地元の方が17時ごろが一番いいって教えてくれた。場所送れるよ！',
        originalLanguage: 'en',
        time: '11:08',
      },
    ],
  },
  {
    id: 'tc2',
    guideId: 'traveler-t2',
    name: 'Lucas Bernard',
    area: 'フランス・小谷村へ再訪',
    photo: 'https://i.pravatar.cc/300?img=12',
    preview: 'I found the rice terrace trail again — still beautiful.',
    unread: 0,
    time: '昨日',
    messages: [
      {
        from: 'them',
        text: 'I found the rice terrace trail again — still beautiful. Makoto showed me this path last year.',
        translation: '棚田の道にまた来たよ。やっぱり綺麗。去年マコトさんに教えてもらった道なんだ。',
        originalLanguage: 'en',
        time: '昨日 17:18',
      },
      {
        from: 'me',
        text: 'I want to go there next week. Is the trail easy to walk?',
        translation: '来週行ってみたい！歩きやすい道？',
        originalLanguage: 'en',
        time: '昨日 17:30',
      },
    ],
  },
  {
    id: 'tc3',
    guideId: 'traveler-t3',
    name: 'Mei Lin',
    area: '台湾・八女を旅行中',
    photo: 'https://i.pravatar.cc/300?img=5',
    preview: 'The tea fields are amazing early in the morning!',
    unread: 0,
    time: '2日前',
    messages: [
      {
        from: 'them',
        text: 'The tea fields are amazing early in the morning! A farmer explained how the first leaves are picked.',
        translation: '朝早い茶畑が本当に綺麗！農家の方が新芽の摘み方も教えてくれたよ。',
        originalLanguage: 'en',
        time: '2日前',
      },
      {
        from: 'me',
        text: 'That is exactly what I want to learn. Which area did you visit?',
        translation: 'まさにそういうことを知りたい！どのあたりに行ったの？',
        originalLanguage: 'en',
        time: '2日前',
      },
    ],
  },
]
