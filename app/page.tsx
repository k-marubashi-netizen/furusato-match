import { Home, MapPin, Plane, Users } from 'lucide-react'
import { FurusatoApp } from '@/components/furusato/app'

export default function Page() {
  return (
    <main className="min-h-dvh bg-secondary/50">
      <div className="md:hidden">
        <div className="mx-auto h-dvh w-full max-w-md">
          <FurusatoApp />
        </div>
      </div>

      <div className="hidden min-h-dvh md:flex md:items-center md:justify-center md:gap-14 md:px-12 md:py-12">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
            <Home className="h-4 w-4" aria-hidden />
            ふるさとマッチ
          </span>

          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-foreground">
            観光客を増やすのではなく、
            <br />
            <span className="text-primary">“ふるさと”を持つ人を増やす。</span>
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
            日本を深く知りたい旅人と、地域を知る人をつなぐ交流マッチングアプリ。
            昔からの住民だけでなく、移住者、近隣に暮らす大学生や社会人も、地域を学びながら案内する側に参加できます。
          </p>

          <div className="mt-7 rounded-3xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-bold tracking-[0.16em] text-primary">3 CORE CONNECTIONS</p>
            <h2 className="mt-1 font-serif text-xl font-bold text-foreground">このアプリが生む、3つの大きな交流</h2>
            <div className="mt-4 space-y-3">
              <ConnectionRow icon={Plane} title="旅人 × 地域を知る人" desc="マナー・文化・暮らし・自然まで、対話しながら地域を深く知る。" />
              <ConnectionRow icon={Users} title="旅人 × 旅人" desc="同じ地域に惹かれた人同士で情報交換し、一緒に歩く仲間になる。" />
              <ConnectionRow icon={MapPin} title="地域の人 × 地域の人" desc="昔からの住民、移住者、近隣の学生や社会人が知識を持ち寄り、地域を学び合う。" />
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-4">
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

function ConnectionRow({ icon: Icon, title, desc }: { icon: typeof Users; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-secondary/70 p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div>
        <p className="font-serif text-sm font-bold text-foreground">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
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
