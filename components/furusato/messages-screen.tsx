'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, Languages, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { conversations, type ChatMessage, type Conversation } from '@/lib/data'
import { ScreenHeader } from './screen-header'
import { LanguageToggle, useLanguage } from './language-context'

export function MessagesScreen({
  initialConversationId,
  onConsumeInitial,
}: {
  initialConversationId?: string | null
  onConsumeInitial?: () => void
}) {
  const { t } = useLanguage()
  const [openId, setOpenId] = useState<string | null>(initialConversationId ?? null)
  const open = conversations.find((c) => c.id === openId)

  if (open) {
    return (
      <ChatView
        conversation={open}
        onBack={() => {
          setOpenId(null)
          onConsumeInitial?.()
        }}
      />
    )
  }

  return (
    <div className="flex flex-col pb-6">
      <ScreenHeader
        title="メッセージ"
        titleEn="Messages"
        subtitle="言葉が違っても、気持ちは翻訳できる。"
        subtitleEn="Different languages, one conversation."
      />
      <div className="mx-4 mt-2 rounded-2xl bg-primary/5 px-3.5 py-3">
        <p className="flex items-center gap-1.5 text-xs font-bold text-primary"><Languages className="h-4 w-4" aria-hidden />{t('翻訳つき対話', 'Translation-assisted chat')}</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{t('JP / ENを切り替えると、翻訳があるメッセージは表示言語も切り替わります。', 'Switch JP / EN and translated messages change language automatically.')}</p>
      </div>
      <ul className="mt-2 divide-y divide-border/70">
        {conversations.map((c) => (
          <li key={c.id}>
            <button type="button" onClick={() => setOpenId(c.id)} className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors active:bg-secondary/60">
              <div className="relative h-12 w-12 shrink-0">
                <Image src={c.photo || '/placeholder.svg'} alt={c.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-serif text-[15px] font-bold text-foreground">{c.name}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{c.area}</p>
                <p className="mt-0.5 truncate text-[13px] text-foreground/70">{c.preview}</p>
              </div>
              {c.unread > 0 && <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-shu px-1.5 text-[11px] font-bold text-shu-foreground">{c.unread}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChatView({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) {
  const { t } = useLanguage()

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 px-3 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} aria-label={t('戻る', 'Back')} className="flex h-9 w-9 items-center justify-center rounded-full text-foreground">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <Image src={conversation.photo || '/placeholder.svg'} alt={conversation.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-[15px] font-bold text-foreground">{conversation.name}</p>
            <p className="truncate text-xs text-muted-foreground">{conversation.area}</p>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <div className="flex-1 space-y-3 px-4 py-4">
        {conversation.messages.map((m, i) => <Bubble key={i} message={m} />)}
      </div>

      <div className="sticky bottom-0 border-t border-border bg-card/95 px-3 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center rounded-full border border-border bg-background px-4 py-2.5">
            <input placeholder={t('メッセージを入力…', 'Type a message…')} className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <button type="button" aria-label={t('送信', 'Send')} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Send className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}

function Bubble({ message }: { message: ChatMessage }) {
  const { lang, t } = useLanguage()
  const [showOther, setShowOther] = useState(false)
  const mine = message.from === 'me'
  const translated = Boolean(message.translation)
  const mainText = lang === 'en' && message.translation ? message.translation : message.text
  const otherText = lang === 'en' ? message.text : message.translation

  return (
    <div className={cn('flex flex-col', mine ? 'items-end' : 'items-start')}>
      <div className={cn('max-w-[78%] rounded-3xl px-4 py-2.5 text-[14px] leading-relaxed', mine ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md border border-border bg-card text-foreground')}>
        {mainText}
        {showOther && translated && otherText && (
          <p className={cn('mt-1.5 border-t pt-1.5 text-[13px]', mine ? 'border-primary-foreground/25 text-primary-foreground/85' : 'border-border text-muted-foreground')}>{otherText}</p>
        )}
      </div>
      <div className="mt-1 flex items-center gap-2">
        {translated && (
          <button type="button" onClick={() => setShowOther((v) => !v)} className="inline-flex items-center gap-1 text-[11px] font-bold text-primary">
            <Languages className="h-3 w-3" aria-hidden />
            {showOther ? t('原文を隠す', 'Hide original') : t('もう一方の言語を見る', 'Show other language')}
          </button>
        )}
        <span className="text-[10px] text-muted-foreground">{message.time}</span>
      </div>
    </div>
  )
}
