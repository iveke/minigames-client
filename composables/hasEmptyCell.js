export const hasEmptyCell = (array) => {
    let hasEmptyCell = false;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 0) {
            hasEmptyCell = true;
            break;
        }

    }
    return hasEmptyCell;
}