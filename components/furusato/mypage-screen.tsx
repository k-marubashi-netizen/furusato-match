'use client'

import { useState } from 'react'
import { ArrowRight, Check, Heart, MapPin, MessageCircle, Plus, Sprout, Users, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { currentUser } from '@/lib/data'
import { ScreenHeader } from './screen-header'
import { useLanguage } from './language-context'
import { localize, type LocalizedText } from './locale-utils'

const areaLabels: Record<string, LocalizedText> = {
  '長野県・小谷村': { ja: '長野県・小谷村', en: 'Otari, Nagano', zh: '长野县・小谷村', es: 'Otari, Nagano', de: 'Otari, Nagano', fr: 'Otari, Nagano', it: 'Otari, Nagano' },
  '京都府・美山町': { ja: '京都府・美山町', en: 'Miyama, Kyoto', zh: '京都府・美山町', es: 'Miyama, Kioto', de: 'Miyama, Kyoto', fr: 'Miyama, Kyoto', it: 'Miyama, Kyoto' },
}

const stepLabels: LocalizedText[] = [
  { ja: '教わる', en: 'Learn', zh: '学习', es: 'Aprender', de: 'Lernen', fr: 'Apprendre', it: 'Imparare' },
  { ja: '一緒に案内', en: 'Guide together', zh: '一起带路', es: 'Guiar juntos', de: 'Gemeinsam führen', fr: 'Guider ensemble', it: 'Guidare insieme' },
  { ja: '独り立ち', en: 'Guide independently', zh: '独立带路', es: 'Guiar por tu cuenta', de: 'Selbstständig führen', fr: 'Guider seul', it: 'Guidare in autonomia' },
  { ja: '次へ伝える', en: 'Pass it on', zh: '传给下一位', es: 'Transmitirlo', de: 'Weitergeben', fr: 'Transmettre', it: 'Trasmettere' },
]

const stepNotes: LocalizedText[] = [
  { ja: '地域の人に教わる', en: 'Learn from local people', zh: '向当地人学习', es: 'Aprende de la gente local', de: 'Von Menschen vor Ort lernen', fr: 'Apprendre auprès des habitants', it: 'Imparare dalle persone del posto' },
  { ja: '地域の人と一緒に案内', en: 'Guide together with someone local', zh: '和当地人一起带路', es: 'Guía junto a alguien de la zona', de: 'Gemeinsam mit jemandem vor Ort führen', fr: 'Guider avec une personne du lieu', it: 'Guidare insieme a una persona del posto' },
  { ja: '自分で案内してみる', en: 'Try guiding on your own', zh: '尝试独立带路', es: 'Prueba a guiar por tu cuenta', de: 'Selbstständig führen ausprobieren', fr: 'Essayer de guider seul', it: 'Provare a guidare in autonomia' },
  { ja: '次の人へ文化を伝える', en: 'Pass local culture to the next person', zh: '把当地文化传给下一位', es: 'Transmite la cultura local a la siguiente persona', de: 'Lokale Kultur an die Nächsten weitergeben', fr: 'Transmettre la culture locale à la personne suivante', it: 'Trasmettere la cultura locale alla persona successiva' },
]

export function MyPageScreen() {
  const { lang } = useLanguage()
  const u = currentUser
  const progress = Math.round((u.knowledgePoints / u.nextLevelPoints) * 100)
  const [furusatoAreas, setFurusatoAreas] = useState(u.learnedAreas)
  const [adding, setAdding] = useState(false)
  const [newArea, setNewArea] = useState('')

  function addFurusato() {
    const value = newArea.trim()
    if (!value || furusatoAreas.includes(value)) return
    setFurusatoAreas((current) => [...current, value])
    setNewArea('')
    setAdding(false)
  }

  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader
        title="マイページ"
        titleEn="My Page"
        subtitle="あなたも、いつか誰かの「ふるさとガイド」に。"
        subtitleEn="Learn the place, build relationships, and one day become someone else's Furusato Guide."
      />

      <div className="px-4 pt-3">
        <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/300?img=44"
              alt="Emma Wilson"
              className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-primary/10"
            />
            <div className="min-w-0">
              <p className="font-serif text-lg font-bold text-foreground">Emma Wilson</p>
              <p className="text-xs text-muted-foreground">
                {localize(lang, { ja: '出身：イギリス', en: 'From: United Kingdom', zh: '来自：英国', es: 'De: Reino Unido', de: 'Aus: Vereinigtes Königreich', fr: 'Origine : Royaume-Uni', it: 'Da: Regno Unito' })}
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-yamabuki/25 px-2.5 py-0.5 text-[11px] font-bold text-yamabuki-foreground">
                <Sprout className="h-3 w-3" aria-hidden />
                {localize(lang, { ja: '地域の知識度', en: 'Local knowledge', zh: '当地知识度', es: 'Conocimiento local', de: 'Lokalkenntnis', fr: 'Connaissance locale', it: 'Conoscenza locale' })} Lv.{u.level}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 divide-x divide-border border-t border-border/70 pt-3 text-center">
            <SocialStat value="86" label={localize(lang, { ja: 'フォロー中', en: 'Following', zh: '关注中', es: 'Siguiendo', de: 'Folge ich', fr: 'Abonnements', it: 'Seguiti' })} />
            <SocialStat value="124" label={localize(lang, { ja: 'フォロワー', en: 'Followers', zh: '粉丝', es: 'Seguidores', de: 'Follower', fr: 'Abonnés', it: 'Follower' })} />
            <SocialStat value="7" label={localize(lang, { ja: '旅人DM', en: 'Traveler DMs', zh: '旅人私信', es: 'DM de viajeros', de: 'Reisenden-DMs', fr: 'DM voyageurs', it: 'DM viaggiatori' })} icon />
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-3xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-bold text-foreground">
              <Sprout className="h-4 w-4 text-primary" aria-hidden />
              {localize(lang, { ja: '知識度の成長', en: 'Knowledge growth', zh: '知识成长', es: 'Progreso de conocimiento', de: 'Wissensfortschritt', fr: 'Progression des connaissances', it: 'Crescita delle conoscenze' })}
            </span>
            <span className="text-xs text-muted-foreground">{u.knowledgePoints} / {u.nextLevelPoints} pt</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-primary/15">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {localize(lang, {
              ja: `次のレベルまであと ${u.nextLevelPoints - u.knowledgePoints}pt。交流するほど育ちます。`,
              en: `${u.nextLevelPoints - u.knowledgePoints}pt to the next level. Every exchange helps you grow.`,
              zh: `距离下一级还有 ${u.nextLevelPoints - u.knowledgePoints}pt。交流越多，成长越多。`,
              es: `Faltan ${u.nextLevelPoints - u.knowledgePoints} pt para el siguiente nivel. Cada intercambio te hace crecer.`,
              de: `Noch ${u.nextLevelPoints - u.knowledgePoints} pt bis zum nächsten Level. Jede Begegnung hilft dir zu wachsen.`,
              fr: `Encore ${u.nextLevelPoints - u.knowledgePoints} pt avant le niveau suivant. Chaque échange vous fait progresser.`,
              it: `Mancano ${u.nextLevelPoints - u.knowledgePoints} pt al livello successivo. Ogni scambio ti fa crescere.`,
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pt-4">
        <Stat icon={Users} value={`${u.exchangeCount}`} label={localize(lang, { ja: '交流した回数', en: 'Exchanges', zh: '交流次数', es: 'Intercambios', de: 'Begegnungen', fr: 'Échanges', it: 'Scambi' })} />
        <Stat icon={MapPin} value={`${furusatoAreas.length}`} label={localize(lang, { ja: '登録したふるさと', en: 'Saved furusato', zh: '已保存的故乡', es: 'Furusato guardados', de: 'Gespeicherte Furusato', fr: 'Furusato enregistrés', it: 'Furusato salvati' })} />
      </div>

      <div className="px-4 pt-5">
        <div className="mb-2 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.13em] text-primary">
              {localize(lang, { ja: '学ぶ → 一緒に案内 → 独り立ち → 伝える', en: 'LEARN → GUIDE TOGETHER → GO SOLO → PASS IT ON', zh: '学习 → 一起带路 → 独立带路 → 传下去', es: 'APRENDER → GUIAR JUNTOS → IR SOLO → TRANSMITIR', de: 'LERNEN → GEMEINSAM FÜHREN → SELBST FÜHREN → WEITERGEBEN', fr: 'APPRENDRE → GUIDER ENSEMBLE → GUIDER SEUL → TRANSMETTRE', it: 'IMPARARE → GUIDARE INSIEME → DA SOLI → TRASMETTERE' })}
            </p>
            <h2 className="mt-1 font-serif text-lg font-bold text-foreground">
              {localize(lang, { ja: 'ふるさとガイドへの4 STEP', en: '4 steps to becoming a guide', zh: '成为故乡向导的4步', es: '4 pasos para ser guía', de: '4 Schritte zum Guide', fr: '4 étapes pour devenir guide', it: '4 passi per diventare guida' })}
            </h2>
          </div>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
            {localize(lang, { ja: '今：STEP 2', en: 'Now: STEP 2', zh: '当前：STEP 2', es: 'Ahora: STEP 2', de: 'Jetzt: STEP 2', fr: 'Actuel : STEP 2', it: 'Ora: STEP 2' })}
          </span>
        </div>

        <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="space-y-3">
            {u.steps.map((step, i) => (
              <div key={step.label} className={cn('flex items-center gap-3 rounded-2xl p-2.5', i === 1 ? 'bg-primary/5' : '')}>
                <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold', step.done ? 'bg-primary text-primary-foreground' : 'border border-border bg-background text-muted-foreground')}>
                  {step.done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn('font-serif text-sm font-bold', step.done || i === 1 ? 'text-foreground' : 'text-muted-foreground')}>STEP {i + 1}｜{localize(lang, stepLabels[i])}</p>
                  <p className="text-xs text-muted-foreground">{localize(lang, stepNotes[i])}</p>
                </div>
                {i < u.steps.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-border" aria-hidden />}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-primary/5 p-3.5">
            <p className="text-xs font-bold text-primary">
              {localize(lang, { ja: '外国から来た旅人も、地域を学べばガイド側へ。', en: 'International visitors can become guides too.', zh: '外国旅人了解当地后，也可以成为向导。', es: 'Los visitantes internacionales también pueden convertirse en guías.', de: 'Auch internationale Gäste können Guides werden.', fr: 'Les visiteurs internationaux peuvent aussi devenir guides.', it: 'Anche i visitatori internazionali possono diventare guide.' })}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              {localize(lang, { ja: '「教わる人」で終わらず、何度も帰るうちに「次の人へ伝える人」になる循環をつくります。', en: 'You do not stay only a learner. As you return, you can become the person who welcomes and guides the next visitor.', zh: '不只是“被教的人”。多次回来之后，也可以成为迎接并带领下一位旅人的人。', es: 'No te quedas solo como aprendiz. Al volver, puedes convertirte en quien recibe y guía a la siguiente persona.', de: 'Du bleibst nicht nur Lernender. Mit jeder Rückkehr kannst du die nächste Person willkommen heißen und führen.', fr: 'Vous ne restez pas seulement apprenant. En revenant, vous pouvez accueillir et guider la personne suivante.', it: 'Non resti solo un partecipante. Tornando più volte, puoi diventare chi accoglie e guida la persona successiva.' })}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-sm font-bold text-foreground">
              {localize(lang, { ja: '登録した“ふるさと”', en: 'Your saved furusato', zh: '已保存的“故乡”', es: 'Tus furusato guardados', de: 'Deine gespeicherten Furusato', fr: 'Vos furusato enregistrés', it: 'I tuoi furusato salvati' })}
            </h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {localize(lang, { ja: '自分が「また帰りたい」と思う地域を残しておけます。', en: 'Save places you personally want to return to.', zh: '保存那些你想再次回去的地方。', es: 'Guarda los lugares a los que quieres volver.', de: 'Speichere Orte, an die du persönlich zurückkehren möchtest.', fr: 'Enregistrez les lieux où vous souhaitez revenir.', it: 'Salva i luoghi in cui vuoi tornare.' })}
            </p>
          </div>
          <button type="button" onClick={() => setAdding((v) => !v)} className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary px-3 py-1.5 text-[11px] font-bold text-primary">
            {adding ? <X className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
            {adding ? localize(lang, { ja: '閉じる', en: 'Close', zh: '关闭', es: 'Cerrar', de: 'Schließen', fr: 'Fermer', it: 'Chiudi' }) : localize(lang, { ja: '追加', en: 'Add', zh: '添加', es: 'Añadir', de: 'Hinzufügen', fr: 'Ajouter', it: 'Aggiungi' })}
          </button>
        </div>

        {adding && (
          <div className="mb-3 flex gap-2 rounded-2xl border border-border bg-card p-2.5">
            <input
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addFurusato() }}
              placeholder={localize(lang, { ja: '例：石川県・能登町', en: 'e.g. Noto, Ishikawa', zh: '例如：石川县・能登町', es: 'p. ej. Noto, Ishikawa', de: 'z. B. Noto, Ishikawa', fr: 'ex. Noto, Ishikawa', it: 'es. Noto, Ishikawa' })}
              className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" onClick={addFurusato} className="rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">
              {localize(lang, { ja: '登録', en: 'Save', zh: '保存', es: 'Guardar', de: 'Speichern', fr: 'Enregistrer', it: 'Salva' })}
            </button>
          </div>
        )}

        <div className="space-y-2">
          {furusatoAreas.map((area) => (
            <div key={area} className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
              <Heart className="h-4 w-4 shrink-0 fill-shu text-shu" aria-hidden />
              <span className="text-sm font-medium text-foreground">{areaLabels[area] ? localize(lang, areaLabels[area]) : area}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5">
        <button type="button" className="w-full rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-sm">
          {localize(lang, { ja: 'STEP 3へ｜ふるさとガイドに挑戦する', en: 'STEP 3 | Try guiding on your own', zh: '进入STEP 3｜尝试独立带路', es: 'STEP 3 | Prueba a guiar por tu cuenta', de: 'STEP 3 | Selbstständig führen ausprobieren', fr: 'STEP 3 | Essayer de guider seul', it: 'STEP 3 | Prova a guidare in autonomia' })}
        </button>
      </div>
    </div>
  )
}

function SocialStat({ value, label, icon = false }: { value: string; label: string; icon?: boolean }) {
  return (
    <div className="px-2">
      <p className="flex items-center justify-center gap-1 font-serif text-base font-bold text-foreground">
        {icon && <MessageCircle className="h-3.5 w-3.5 text-primary" aria-hidden />}
        {value}
      </p>
      <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}

function Stat({ icon: Icon, value, label }: { icon: typeof Users; value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4">
      <Icon className="h-5 w-5 text-primary" aria-hidden />
      <p className="mt-2 font-serif text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
