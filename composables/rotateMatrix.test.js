import {describe, expect, test} from 'vitest'
import {rotateMatrix} from "./rotateMatrix.js";

describe('rotateMatrix', () => {
    test('Square', () => {
        expect(rotateMatrix([
            [2, 2, 1, 1],
            [2, 2, 1, 1],
            [4, 4, 3, 3],
            [4, 4, 3, 3],
        ])).toStrictEqual([
                [4, 4, 2, 2],
                [4, 4, 2, 2],
                [3, 3, 1, 1],
                [3, 3, 1, 1],
            ])
    })
    test('Rectangle wide', () => {
        expect(rotateMatrix([
            [2, 2, 1, 1],
            [2, 2, 1, 1],
        ])).toStrictEqual([
                [2, 2],
                [2, 2],
                [1, 1],
                [1, 1],
            ])
    })
    test('Rectangle high', () => {
        expect(rotateMatrix([
            [2, 2],
            [2, 2],
            [1, 1],
            [1, 1],
        ])).toStrictEqual([
                [1, 1, 2, 2],
                [1, 1, 2, 2],
            ])
    })
})