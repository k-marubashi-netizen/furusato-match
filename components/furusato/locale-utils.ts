import type { AppLanguage } from './language-context'

export type LocalizedText = Partial<Record<AppLanguage, string>> & {
  ja: string
  en: string
}

export function localize(lang: AppLanguage, text: LocalizedText): string {
  return text[lang] ?? text.en
}

export const languageNames: Record<AppLanguage, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
}
