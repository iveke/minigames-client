export const rotateMatrix = (matrix) => {
    return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse());
}