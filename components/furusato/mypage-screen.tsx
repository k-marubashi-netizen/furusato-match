'use client'

import { Check, Heart, MapPin, Sprout, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { currentUser } from '@/lib/data'
import { ScreenHeader } from './screen-header'

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
              <Sprout className="h-3 w-3" aria-hidden />
              地域の知識度 Lv.{u.level}
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
        <h2 className="mb-2 font-serif text-sm font-bold text-foreground">ふるさとガイドへの道</h2>
        <div className="rounded-3xl border border-border bg-card p-4">
          <ol className="flex items-center justify-between">
            {u.steps.map((step, i) => (
              <li key={step.label} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  <span className={cn('h-0.5 flex-1', i === 0 ? 'bg-transparent' : u.steps[i - 1].done ? 'bg-primary' : 'bg-border')} />
                  <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium', step.done ? 'bg-primary text-primary-foreground' : 'border border-border bg-background text-muted-foreground')}>{step.done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}</span>
                  <span className={cn('h-0.5 flex-1', i === u.steps.length - 1 ? 'bg-transparent' : step.done ? 'bg-primary' : 'bg-border')} />
                </div>
                <span className={cn('mt-1.5 text-center text-[11px] font-medium', step.done ? 'text-foreground' : 'text-muted-foreground')}>{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="px-4 pt-4">
        <h2 className="mb-2 font-serif text-sm font-bold text-foreground">"ふるさと"になった場所</h2>
        <div className="space-y-2">
          {u.learnedAreas.map((area) => (
            <div key={area} className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
              <Heart className="h-4 w-4 shrink-0 fill-shu text-shu" aria-hidden />
              <span className="text-sm font-medium text-foreground">{area}</span>
              <span className="ml-auto text-xs text-muted-foreground">ただいま、と言える</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5">
        <button type="button" className="w-full rounded-full border border-primary bg-card py-3 text-sm font-medium text-primary transition-colors active:bg-accent">ふるさとガイドに登録する</button>
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
