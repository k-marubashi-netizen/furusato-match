'use client'

import { Check, Heart, MapPin, Sprout, Users, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { currentUser } from '@/lib/data'
import { ScreenHeader } from './screen-header'

const stepNotes = ['地域の人に教わる', '地域の人と一緒に案内', '自分で案内してみる', '次の人へ文化を伝える']

export function MyPageScreen() {
  const u = currentUser
  const progress = Math.round((u.knowledgePoints / u.nextLevelPoints) * 100)

  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader title="マイページ" subtitle="あなたも、いつか誰かの「ふるさとガイド」に。" />

      <div className="px-4 pt-3">
        <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-serif text-xl font-bold text-primary">EW</div>
          <div className="min-w-0">
            <p className="font-serif text-lg font-bold text-foreground">{u.name}</p>
            <p className="text-xs text-muted-foreground">出身：{u.country}</p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-yamabuki/25 px-2.5 py-0.5 text-[11px] font-medium text-yamabuki-foreground">
              <Sprout className="h-3 w-3" aria-hidden />地域の知識度 Lv.{u.level}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-3xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground"><Sprout className="h-4 w-4 text-primary" aria-hidden />知識度の成長</span>
            <span className="text-xs text-muted-foreground">{u.knowledgePoints} / {u.nextLevelPoints} pt</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-primary/15">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">次のレベルまであと <span className="font-medium text-foreground">{u.nextLevelPoints - u.knowledgePoints}pt</span>。交流するほど育ちます。</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pt-4">
        <Stat icon={Users} value={`${u.exchangeCount}回`} label="交流した回数" />
        <Stat icon={MapPin} value={`${u.learnedAreas.length}地域`} label="学んだ地域" />
      </div>

      <div className="px-4 pt-4">
        <div className="mb-2 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium text-primary">LEARN → GUIDE → PASS IT ON</p>
            <h2 className="font-serif text-base font-bold text-foreground">ふるさとガイドへの4 STEP</h2>
          </div>
          <span className="text-[11px] text-muted-foreground">今：STEP 2</span>
        </div>
        <div className="rounded-3xl border border-border bg-card p-4">
          <div className="space-y-3">
            {u.steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold', step.done ? 'bg-primary text-primary-foreground' : 'border border-border bg-background text-muted-foreground')}>
                  {step.done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn('font-serif text-sm font-bold', step.done ? 'text-foreground' : 'text-muted-foreground')}>STEP {i + 1}｜{step.label}</p>
                  <p className="text-xs text-muted-foreground">{stepNotes[i]}</p>
                </div>
                {i < u.steps.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-border" aria-hidden />}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-primary/5 p-3">
            <p className="text-xs font-medium text-primary">外国から来た旅人も、地域を学べばガイド側へ。</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">「教わる人」で終わらず、何度も帰るうちに「次の人へ伝える人」になる循環をつくります。</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <h2 className="mb-2 font-serif text-sm font-bold text-foreground">“ふるさと”になった場所</h2>
        <div className="space-y-2">
          {u.learnedAreas.map((area) => (
            <div key={area} className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
              <Heart className="h-4 w-4 shrink-0 fill-shu text-shu" aria-hidden />
              <span className="text-sm font-medium text-foreground">{area}</span>
              <span className="ml-auto text-xs text-muted-foreground">おかえり、が待っている</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5">
        <button type="button" className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground">STEP 3へ｜ふるさとガイドに挑戦する</button>
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
