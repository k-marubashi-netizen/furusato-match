import { Home } from 'lucide-react'
import { FurusatoApp } from '@/components/furusato/app'

export default function Page() {
  return (
    <main className="min-h-dvh bg-secondary/50">
      {/* Mobile: fullscreen app */}
      <div className="md:hidden">
        <div className="mx-auto h-dvh w-full max-w-md">
          <FurusatoApp />
        </div>
      </div>

      {/* Desktop: framed preview with context */}
      <div className="hidden min-h-dvh md:flex md:items-center md:justify-center md:gap-16 md:px-12 md:py-12">
        <div className="max-w-md">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Home className="h-4 w-4" aria-hidden />
            ふるさとマッチ
          </span>
          <h1 className="mt-5 text-balance font-serif text-4xl font-bold leading-tight text-foreground">
            観光客を増やすのではなく、
            <br />
            <span className="text-primary">"ふるさと"を持つ人</span>を増やす。
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            訪日外国人と、地域に暮らす案内役「ふるさとガイド」をつなぐ交流マッチングアプリ。
            案内する人にも、される人にも、日本のどこかに「ただいま」と言える場所を。
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            <Feature term="知識度ゲージ" desc="学ぶほど育つ" />
            <Feature term="翻訳つき対話" desc="言葉の壁をこえて" />
            <Feature term="交流イベント" desc="顔を合わせる" />
          </dl>
        </div>

        <div className="relative shrink-0">
          <div className="absolute -inset-4 rounded-[3rem] bg-primary/5" aria-hidden />
          <div className="relative h-[780px] w-[380px] overflow-hidden rounded-[2.75rem] border-8 border-foreground/85 bg-background shadow-2xl">
            <FurusatoApp />
          </div>
        </div>
      </div>
    </main>
  )
}

function Feature({ term, desc }: { term: string; desc: string }) {
  return (
    <div>
      <dt className="font-serif text-sm font-bold text-foreground">{term}</dt>
      <dd className="mt-0.5 text-xs text-muted-foreground">{desc}</dd>
    </div>
  )
}
