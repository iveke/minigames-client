export const useTranslateApiResponse = () => {
    const { t, te } = useI18n();

    function translate(response, endpoint) {
        const translationKey = `statusMessages.error.${endpoint}.${response.status}`
        const translation = te(translationKey) ? t(translationKey) : (() => {
            console.error('Missing key', translationKey)
            // return t('apiStatusText.default')
            return response.statusText
        })()
        console.log(translationKey)
        console.log(translation)
        return translation
    }
    return {
        translate
    }
}