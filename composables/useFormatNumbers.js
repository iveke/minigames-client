export const useFormatNumbers = (number, decimals = 0, locale = 'uk-UA') => {
    return number.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}
