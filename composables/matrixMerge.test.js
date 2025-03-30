import {describe, expect, test} from 'vitest'
import {matrixMerge} from "./matrixMerge.js";

describe('matrixMerge', () => {
    test('Without offset', () => {
        expect(matrixMerge(
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ], [
                [1, 1, 1],
                [1, 0, 0]
            ],
            0,
            0
        )).toStrictEqual([
                [1, 1, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        )
    })
    test('With offset', () => {
        expect(matrixMerge(
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ], [
                [1, 1, 1],
                [1, 0, 0]
            ],
            1,
            2
        )).toStrictEqual([
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 1, 1, 1],
                [0, 1, 0, 0],
            ]
        )
    })
    test('Offset out of range', () => {
        expect(matrixMerge(
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ], [
                [1, 1, 1],
                [1, 0, 0]
            ],
            1,
            3
        )).toStrictEqual([
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 1, 1, 1],
            ]
        )
    })
    test('With overlap', () => {
        expect(matrixMerge(
            [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1],
            ], [
                [2, 2],
                [2, 2]
            ],
            1,
            1
        )).toStrictEqual([
                [1, 0, 0, 0],
                [0, 2, 2, 0],
                [0, 2, 2, 0],
                [0, 0, 0, 1],
            ]
        )
    })
})