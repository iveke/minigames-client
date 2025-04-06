export const matrixRotate = (matrix, clockwise=true) => {
    let rotatedMatrix;

    if (clockwise) {
        rotatedMatrix = matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())
    } else {
        rotatedMatrix = matrix[0].map((_, index) => matrix.map(row => row[index])).reverse()
    }

    return rotatedMatrix;
}