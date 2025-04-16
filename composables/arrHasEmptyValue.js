export const arrHasEmptyValue = (array) => {
    let hasEmptyCell = false;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 0
            || array[i] === false
            || array[i] === ''
            || array[i] === null
            || array[i] === undefined
        ) {
            hasEmptyCell = true;
            break;
        }

    }
    return hasEmptyCell;
}