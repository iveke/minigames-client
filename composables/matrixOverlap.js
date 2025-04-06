/**
 * Check if two matrices overlap
 * @param matrixBase - matrix to check against
 * @param matrixAbove - matrix to check
 * @param offset - [x, y] - position of the matrixAbove
 * @param sides - [top, right, bottom, left] - toggle
 * @returns {boolean} - true if there is a collision
 */
export const MatrixOverlap = (matrixBase, matrixAbove, offset = [0, 0], sides = [true, true, true, true]) => {
    if (offset.length !== 2 || sides.length !== 4) {
        throw new Error('Offset must be an array of two numbers')
    }
    if (typeof offset[0] !== 'number' || typeof offset[1] !== 'number') {
        throw new Error('Offset must be an array of two numbers')
    }

    let isCollide = false

    for (let i = 0; i < matrixAbove.length; i++) {
        for (let j = 0; j < matrixAbove[0].length; j++) {
            if (matrixAbove[i][j] !== 0) {
                if (sides[0] && offset[1] + i < 0
                    || sides[2] && offset[1] + i >= matrixBase.length
                    || sides[1] && offset[0] + j >= matrixBase[0].length
                    || sides[3] && offset[0] + j < 0
                    || matrixBase[offset[1] + i][offset[0] + j] !== 0) {

                    isCollide = true
                }
            }
        }
    }
    return isCollide
}
