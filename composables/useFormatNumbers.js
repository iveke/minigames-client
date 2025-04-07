export const useFormatNumbers = (number, decimals = 0, locale = 'ua-UA') => {
    return number.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}
console.log(useFormatNumbers(100000000))
