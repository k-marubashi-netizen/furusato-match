import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
})

const zenMaru = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-zen-maru',
})

export const metadata: Metadata = {
  title: 'ふるさとマッチ｜"ただいま"と言える場所をつくる',
  description:
    '訪日外国人と、地域に暮らす案内役「ふるさとガイド」をつなぐ交流マッチングアプリ。観光客を増やすのではなく、"ふるさと"を持つ人を増やす。',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2f6f6a',
  userScalable: false,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`bg-background ${notoSansJP.variable} ${zenMaru.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
