export default function (enumObj, value) {
    return Object.keys(enumObj).find((k) => enumObj[k] === value)
}