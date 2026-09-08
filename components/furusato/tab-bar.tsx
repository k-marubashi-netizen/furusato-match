'use client'

import { Home, CalendarHeart, MessageCircle, User, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from './language-context'
import { localize } from './locale-utils'
import type { Tab } from './types'

export function TabBar({ active, onChange, onCreate }: { active: Tab; onChange: (tab: Tab) => void; onCreate: () => void }) {
  const { lang } = useLanguage()
  const items: { key: Tab; label: string; icon: typeof Home }[] = [
    { key: 'search', label: localize(lang, { ja: 'ホーム', en: 'Home', zh: '首页', es: 'Inicio', de: 'Start', fr: 'Accueil', it: 'Home' }), icon: Home },
    { key: 'events', label: localize(lang, { ja: 'イベント', en: 'Events', zh: '活动', es: 'Eventos', de: 'Events', fr: 'Événements', it: 'Eventi' }), icon: CalendarHeart },
    { key: 'messages', label: localize(lang, { ja: 'メッセージ', en: 'Messages', zh: '消息', es: 'Mensajes', de: 'Nachrichten', fr: 'Messages', it: 'Messaggi' }), icon: MessageCircle },
    { key: 'mypage', label: localize(lang, { ja: 'マイページ', en: 'My Page', zh: '我的主页', es: 'Mi perfil', de: 'Profil', fr: 'Profil', it: 'Profilo' }), icon: User },
  ]
  const left = items.slice(0, 2)
  const right = items.slice(2)

  return (
    <nav className="pointer-events-auto absolute inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 shadow-[0_-6px_24px_rgba(0,0,0,0.04)] backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-5 items-end px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        {left.map((item) => <TabButton key={item.key} item={item} active={active === item.key} onClick={() => onChange(item.key)} />)}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onCreate}
            aria-label={localize(lang, { ja: '投稿する', en: 'Create', zh: '发布', es: 'Crear', de: 'Erstellen', fr: 'Créer', it: 'Crea' })}
            className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-shu text-shu-foreground shadow-lg shadow-shu/30 ring-4 ring-card transition-transform active:scale-95"
          >
            <Plus className="h-7 w-7" aria-hidden />
          </button>
        </div>

        {right.map((item) => <TabButton key={item.key} item={item} active={active === item.key} onClick={() => onChange(item.key)} />)}
      </div>
    </nav>
  )
}

function TabButton({ item, active, onClick }: { item: { key: Tab; label: string; icon: typeof Home }; active: boolean; onClick: () => void }) {
  const Icon = item.icon
  return (
    <button type="button" onClick={onClick} className={cn('flex min-w-0 flex-col items-center gap-1 rounded-xl py-1 text-[10px] font-semibold transition-colors', active ? 'text-primary' : 'text-muted-foreground')} aria-current={active ? 'page' : undefined}>
      <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} aria-hidden />
      <span className="max-w-full truncate">{item.label}</span>
    </button>
  )
}
