export const matrixMerge = (first, second, offsetX, offsetY, condition = () => true) => {

    const newMatrix = Array.from(first);

    for (let i = 0; i < second.length; i++) {
        for (let j = 0; j < second[0].length; j++) {
            if (condition) {
                if (offsetY + i < first.length && offsetX + j < first[0].length) {
                    newMatrix[offsetY + i][offsetX + j] = second[j][i];
                }
            }


        }
    }
    return newMatrix;
}