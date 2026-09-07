'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, Languages, Send, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { conversations, type ChatMessage, type Conversation } from '@/lib/data'
import { travelerConversations } from '@/lib/social-data'
import { ScreenHeader } from './screen-header'
import { useLanguage } from './language-context'

const allConversations = [...conversations, ...travelerConversations]

const conversationEn: Record<string, { name: string; area: string; preview: string }> = {
  c1: { name: 'Makoto Yamaguchi', area: 'Otari, Nagano', preview: 'Looking forward to walking with you!' },
  c2: { name: 'Sayaka Tamura', area: 'Noto, Ishikawa', preview: 'The morning market starts at 7am!' },
  c3: { name: 'Hisako Kobayashi', area: 'Miyama, Kyoto', preview: 'Come back anytime.' },
  tc1: { name: 'Sofia Martinez', area: 'Spain · Traveling in Noto', preview: 'The sunset near the old fishing port was beautiful.' },
  tc2: { name: 'Lucas Bernard', area: 'France · Back in Otari', preview: 'I found the rice terrace trail again — still beautiful.' },
  tc3: { name: 'Mei Lin', area: 'Taiwan · Traveling in Yame', preview: 'The tea fields are amazing early in the morning!' },
}

export function MessagesScreen({ initialConversationId, onConsumeInitial }: { initialConversationId?: string | null; onConsumeInitial?: () => void }) {
  const [openId, setOpenId] = useState<string | null>(initialConversationId ?? null)
  const { lang, t } = useLanguage()
  const open = allConversations.find((c) => c.id === openId)

  if (open) {
    return <ChatView conversation={open} onBack={() => { setOpenId(null); onConsumeInitial?.() }} />
  }

  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader
        title="メッセージ"
        titleEn="Messages"
        subtitle="ガイドにも、旅人にも。フォローからDMへつながります。"
        subtitleEn="Message guides and fellow travelers. A follow can become a conversation."
      />

      <div className="mx-4 mt-2 rounded-2xl bg-primary/5 p-3">
        <p className="flex items-center gap-1.5 text-xs font-bold text-primary">
          <Users className="h-4 w-4" aria-hidden />
          {t('旅人どうしのDMも表示されます', 'Traveler-to-traveler DMs appear here too')}
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          {t('おすすめで見つけた人をフォローして、地域の景色や体験を直接聞けます。', 'Follow someone from Suggestions and ask directly about local views, routes, and experiences.')}
        </p>
      </div>

      <ul className="mt-2 divide-y divide-border/70">
        {allConversations.map((c) => {
          const en = conversationEn[c.id]
          const name = lang === 'en' ? en?.name ?? c.name : c.name
          const area = lang === 'en' ? en?.area ?? c.area : c.area
          const preview = lang === 'en' ? en?.preview ?? c.preview : c.preview
          const traveler = c.id.startsWith('tc')
          return (
            <li key={c.id}>
              <button type="button" onClick={() => setOpenId(c.id)} className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors active:bg-secondary/60">
                <Avatar src={c.photo} name={name} size={48} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-serif text-[15px] font-medium text-foreground">{name}</p>
                    {traveler && <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">{t('旅人', 'Traveler')}</span>}
                    <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{area}</p>
                  <p className="mt-0.5 truncate text-[13px] text-foreground/70">{preview}</p>
                </div>
                {c.unread > 0 && <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-shu px-1.5 text-[11px] font-medium text-shu-foreground">{c.unread}</span>}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ChatView({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) {
  const { lang, t } = useLanguage()
  const en = conversationEn[conversation.id]
  const name = lang === 'en' ? en?.name ?? conversation.name : conversation.name
  const area = lang === 'en' ? en?.area ?? conversation.area : conversation.area
  const traveler = conversation.id.startsWith('tc')

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-card/95 px-3 py-3 backdrop-blur">
        <button type="button" onClick={onBack} aria-label="back" className="flex h-9 w-9 items-center justify-center rounded-full text-foreground"><ChevronLeft className="h-5 w-5" aria-hidden /></button>
        <Avatar src={conversation.photo} name={name} size={40} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-serif text-[15px] font-medium text-foreground">{name}</p>
            {traveler && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">{t('旅人', 'Traveler')}</span>}
          </div>
          <p className="truncate text-xs text-muted-foreground">{area}</p>
        </div>
      </header>

      <div className="flex-1 space-y-3 px-4 py-4">{conversation.messages.map((m, i) => <Bubble key={i} message={m} />)}</div>

      <div className="sticky bottom-0 border-t border-border bg-card/95 px-3 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center rounded-full border border-border bg-background px-4 py-2.5"><input placeholder={t('メッセージを入力…', 'Type a message…')} className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" /></div>
          <button type="button" aria-label="send" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground"><Send className="h-4 w-4" aria-hidden /></button>
        </div>
      </div>
    </div>
  )
}

function Bubble({ message }: { message: ChatMessage }) {
  const [showOtherLanguage, setShowOtherLanguage] = useState(false)
  const { lang, t } = useLanguage()
  const mine = message.from === 'me'
  const originalLanguage = message.originalLanguage ?? 'ja'

  const primaryText =
    lang === 'en'
      ? originalLanguage === 'en'
        ? message.text
        : message.translation ?? message.text
      : originalLanguage === 'ja'
        ? message.text
        : message.translation ?? message.text

  const secondaryText =
    lang === 'en'
      ? originalLanguage === 'en'
        ? message.translation
        : message.text
      : originalLanguage === 'ja'
        ? message.translation
        : message.text

  return (
    <div className={cn('flex flex-col', mine ? 'items-end' : 'items-start')}>
      <div className={cn('max-w-[78%] rounded-3xl px-4 py-2.5 text-[14px] leading-relaxed', mine ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md border border-border bg-card text-foreground')}>
        {primaryText}
        {showOtherLanguage && secondaryText && (
          <p className={cn('mt-1.5 border-t pt-1.5 text-[13px]', mine ? 'border-primary-foreground/25 text-primary-foreground/85' : 'border-border text-muted-foreground')}>{secondaryText}</p>
        )}
      </div>
      <div className="mt-1 flex items-center gap-2">
        {secondaryText && (
          <button type="button" onClick={() => setShowOtherLanguage((v) => !v)} className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
            <Languages className="h-3 w-3" aria-hidden />
            {showOtherLanguage ? t('もう一方の言語を隠す', 'Hide other language') : t('もう一方の言語を見る', 'Show other language')}
          </button>
        )}
        <span className="text-[10px] text-muted-foreground">{message.time}</span>
      </div>
    </div>
  )
}

function Avatar({ src, name, size }: { src: string; name: string; size: number }) {
  const className = cn('shrink-0 rounded-full object-cover', size === 48 ? 'h-12 w-12' : 'h-10 w-10')

  if (src.startsWith('http')) {
    return <img src={src} alt={name} width={size} height={size} className={className} />
  }

  return <Image src={src || '/placeholder.svg'} alt={name} width={size} height={size} className={className} />
}
