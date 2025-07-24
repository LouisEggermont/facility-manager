import { useI18n } from 'vue-i18n'

export default () => {
  const { locale, setLocaleMessage } = useI18n()
  const SUPPORTED_LOCALES = {
    en: 'en',
    nl: 'nl',
    // zh: 'zh',
    // es: 'es',
  }
  const loadMessages = async (locale: string) => {
    if (locale in SUPPORTED_LOCALES) {
      const messages = await import(`../locales/${locale}.json`).then(
        m => m.default[locale],
      )

      return messages
    }

    throw new Error(`Unsupported locale: ${locale}`)
  }

  const setLocale = async (targetLocale: string) => {
    const messages = await loadMessages(targetLocale)

    setLocaleMessage(targetLocale, messages)
    locale.value = targetLocale
  }

  return {
    locale,
    setLocale,
    SUPPORTED_LOCALES,
  }
}
