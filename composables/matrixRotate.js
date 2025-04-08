export const matrixRotate = (matrix, clockwise = true) => {
    if (matrix?.length === 0) return matrix
    if (matrix[0]?.length === 0) return matrix
    let rotatedMatrix;

    if (clockwise) {
        rotatedMatrix = matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())
    } else {
        rotatedMatrix = matrix[0].map((_, index) => matrix.map(row => row[index])).reverse()
    }

    return rotatedMatrix;
}