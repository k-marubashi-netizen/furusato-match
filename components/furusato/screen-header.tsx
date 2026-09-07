import { Home } from 'lucide-react'

export function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="px-4 pb-1 pt-5">
      <div className="flex items-center gap-1.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Home className="h-3.5 w-3.5" aria-hidden />
        </span>
        <span className="font-serif text-sm font-medium text-primary">ふるさとマッチ</span>
        <span className="text-[11px] text-muted-foreground">— ただいま、を日本のあちこちに</span>
      </div>
      <h1 className="mt-2 font-serif text-2xl font-bold text-foreground">{title}</h1>
      {subtitle && <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground text-pretty">{subtitle}</p>}
    </header>
  )
}
