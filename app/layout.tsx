import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ふるさとマッチ｜誰もが“ふるさと”にできるアプリ',
  description: '出会いから“ふるさと”が増えていく交流アプリ。居住地・国籍・話せる言語を問わず参加でき、地域を知り、希望する人はガイドとして案内できます。',
  icons: { icon: '/icon.svg' },
}
export const viewport: Viewport = {
  colorScheme: 'light dark', themeColor: '#3f7d5f',
  width: 'device-width', initialScale: 1, viewportFit: 'cover',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  )
}
