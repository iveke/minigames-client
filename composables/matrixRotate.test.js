import {describe, expect, test} from 'vitest'
import {matrixRotate} from "./matrixRotate.js";

describe('rotateMatrix', () => {
    test('Square, clockwise', () => {
        expect(matrixRotate([
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
    test('Rectangle wide, clockwise', () => {
        expect(matrixRotate([
            [2, 2, 1, 1],
            [2, 2, 1, 1],
        ])).toStrictEqual([
                [2, 2],
                [2, 2],
                [1, 1],
                [1, 1],
            ])
    })
    test('Rectangle high, clockwise', () => {
        expect(matrixRotate([
            [2, 2],
            [2, 2],
            [1, 1],
            [1, 1],
        ])).toStrictEqual([
                [1, 1, 2, 2],
                [1, 1, 2, 2],
            ])
    })



    test('Square, counterclockwise', () => {
        expect(matrixRotate([
            [4, 4, 2, 2],
            [4, 4, 2, 2],
            [3, 3, 1, 1],
            [3, 3, 1, 1],
        ], false)).toStrictEqual([
            [2, 2, 1, 1],
            [2, 2, 1, 1],
            [4, 4, 3, 3],
            [4, 4, 3, 3],
        ])
    })
    test('Rectangle wide, counterclockwise', () => {
        expect(matrixRotate([
            [2, 2],
            [2, 2],
            [1, 1],
            [1, 1],
        ], false)).toStrictEqual([
            [2, 2, 1, 1],
            [2, 2, 1, 1],
        ])
    })
    test('Rectangle high, counterclockwise', () => {
        expect(matrixRotate([
            [1, 1, 2, 2],
            [1, 1, 2, 2],
        ], false)).toStrictEqual([
            [2, 2],
            [2, 2],
            [1, 1],
            [1, 1],
        ])
    })
})