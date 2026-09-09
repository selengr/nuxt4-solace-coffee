import type { AppLocale, LocalizedText } from '~/types/cafe'

export function useLocaleText() {
  const { locale } = useI18n()

  const current = computed<AppLocale>(() =>
    locale.value === 'fa' ? 'fa' : 'en',
  )

  function tx(value: LocalizedText): string {
    if (typeof value === 'string') {
      return value
    }
    return value[current.value] || value.en
  }

  function txList(value: Record<AppLocale, string[]>): string[] {
    return value[current.value] || value.en
  }

  function formatDate(
    value?: string,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  ) {
    if (!value) {
      return ''
    }
    const tag = current.value === 'fa' ? 'fa-IR' : 'en-US'
    return new Date(value).toLocaleDateString(tag, options)
  }

  return {
    current,
    tx,
    txList,
    formatDate,
  }
}
