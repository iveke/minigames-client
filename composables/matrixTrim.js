import {arrSum} from './arrSum.js'
import {matrixRotate} from './matrixRotate.js'

export const matrixTrim = (matrix) => {
    let data = {
        top: null,
        left: null,
        bottom: null,
        right: null,
        newMatrix: []
    }
    if (matrix?.length === 0) return data
    if (matrix[0]?.length === 0) return data

    const matrixCopy = matrix.map(row => [...row]);

    let tempMatrix = []
    for (let row = 0; row < matrixCopy.length; row++) {
        if (arrSum(matrixCopy[row]) !== 0) {
            if (data.top === null) {
                data.top = row
            }
            data.bottom = row

            tempMatrix.push(matrixCopy[row])
        }
    }

    tempMatrix = matrixRotate(tempMatrix)
    for (let row = 0; row < tempMatrix.length; row++) {
        if (arrSum(tempMatrix[row]) !== 0) {
            if (data.left === null) {
                data.left = row
            }
            data.right = row
            data.newMatrix.push(tempMatrix[row])
        }
    }
    data.newMatrix = matrixRotate(data.newMatrix, false)

    return data
}