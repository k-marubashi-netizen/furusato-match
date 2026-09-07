'use client'

import { ArrowRight, Check, Heart, MapPin, Sprout, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { currentUser } from '@/lib/data'
import { ScreenHeader } from './screen-header'
import { useLanguage } from './language-context'

const stepNotesJa = ['地域の人に教わる', '地域の人と一緒に案内', '自分で案内してみる', '次の人へ文化を伝える']
const stepNotesEn = ['Learn from local people', 'Guide together with a local', 'Guide on your own', 'Pass local culture to the next person']
const stepLabelsEn = ['Learn', 'Guide together', 'Go solo', 'Pass it on']

export function MyPageScreen() {
  const { lang, t } = useLanguage()
  const u = currentUser
  const progress = Math.round((u.knowledgePoints / u.nextLevelPoints) * 100)

  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader
        title="マイページ"
        titleEn="My Page"
        subtitle="あなたも、いつか誰かの「ふるさとガイド」に。"
        subtitleEn="Learn the place, build relationships, and one day become someone else's Furusato Guide."
      />

      <div className="px-4 pt-3">
        <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-serif text-xl font-bold text-primary">EW</div>
          <div className="min-w-0">
            <p className="font-serif text-lg font-bold text-foreground">{u.name}</p>
            <p className="text-xs text-muted-foreground">{t('出身', 'From')}：{u.country}</p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-yamabuki/25 px-2.5 py-0.5 text-[11px] font-bold text-yamabuki-foreground">
              <Sprout className="h-3 w-3" aria-hidden />{t('地域の知識度', 'Local knowledge')} Lv.{u.level}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-3xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-bold text-foreground"><Sprout className="h-4 w-4 text-primary" aria-hidden />{t('知識度の成長', 'Knowledge growth')}</span>
            <span className="text-xs text-muted-foreground">{u.knowledgePoints} / {u.nextLevelPoints} pt</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-primary/15">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {t(`次のレベルまであと ${u.nextLevelPoints - u.knowledgePoints}pt。交流するほど育ちます。`, `${u.nextLevelPoints - u.knowledgePoints}pt to the next level. Every exchange helps you grow.`)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pt-4">
        <Stat icon={Users} value={`${u.exchangeCount}`} label={t('交流した回数', 'Exchanges')} />
        <Stat icon={MapPin} value={`${u.learnedAreas.length}`} label={t('学んだ地域', 'Places learned')} />
      </div>

      <div className="px-4 pt-5">
        <div className="mb-2 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-primary">LEARN → GUIDE → PASS IT ON</p>
            <h2 className="mt-1 font-serif text-lg font-bold text-foreground">{t('ふるさとガイドへの4 STEP', '4 steps to becoming a guide')}</h2>
          </div>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">{t('今：STEP 2', 'Now: STEP 2')}</span>
        </div>
        <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
          <div className="space-y-3">
            {u.steps.map((step, i) => (
              <div key={step.label} className={cn('flex items-center gap-3 rounded-2xl p-2.5', i === 1 ? 'bg-primary/5' : '')}>
                <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold', step.done ? 'bg-primary text-primary-foreground' : 'border border-border bg-background text-muted-foreground')}>
                  {step.done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn('font-serif text-sm font-bold', step.done || i === 1 ? 'text-foreground' : 'text-muted-foreground')}>STEP {i + 1}｜{lang === 'ja' ? step.label : stepLabelsEn[i]}</p>
                  <p className="text-xs text-muted-foreground">{lang === 'ja' ? stepNotesJa[i] : stepNotesEn[i]}</p>
                </div>
                {i < u.steps.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-border" aria-hidden />}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-primary/5 p-3.5">
            <p className="text-xs font-bold text-primary">{t('外国から来た旅人も、地域を学べばガイド側へ。', 'International visitors can become guides too.')}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{t('「教わる人」で終わらず、何度も帰るうちに「次の人へ伝える人」になる循環をつくります。', 'The journey does not end with learning. Repeat visitors can become the people who welcome and guide the next person.')}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5">
        <h2 className="mb-2 font-serif text-sm font-bold text-foreground">{t('“ふるさと”になった場所', 'Places that became your furusato')}</h2>
        <div className="space-y-2">
          {u.learnedAreas.map((area) => (
            <div key={area} className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
              <Heart className="h-4 w-4 shrink-0 fill-shu text-shu" aria-hidden />
              <span className="text-sm font-medium text-foreground">{area}</span>
              <span className="ml-auto text-[11px] text-muted-foreground">{t('おかえり、が待っている', 'People are waiting for you')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5">
        <button type="button" className="w-full rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-sm">{t('STEP 3へ｜ふるさとガイドに挑戦する', 'STEP 3 | Try guiding on your own')}</button>
      </div>
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
