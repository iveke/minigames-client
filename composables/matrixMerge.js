export const matrixMerge = (first, second, offsetX, offsetY) => {

    const newMatrix = first.map(row => [...row]);

    for (let i = 0; i < second.length; i++) {
        for (let j = 0; j < second[0].length; j++) {
            if (second[i][j] !== 0) {
                if (offsetY + i < first.length && offsetX + j < first[0].length) {
                    newMatrix[offsetY + i][offsetX + j] = second[i][j];
                } else {
                    console.error("Index out of range", offsetY + i, offsetX + j)
                }
            }
        }
    }
    return newMatrix;
}