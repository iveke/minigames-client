export const useTranslateApiResponse = () => {
  const {t, te} = useI18n();

  function translate(response, endpoint) {
    const translationKey = `statusMessages.error.${endpoint}.${response.status}`
    const translation = te(translationKey) ? t(translationKey) : (() => {
      console.error('Missing key', translationKey)
      // return t('apiStatusText.default')
      return t('statusMessages.error.default')
    })()
    return translation
  }

  return {
    translate
  }
}