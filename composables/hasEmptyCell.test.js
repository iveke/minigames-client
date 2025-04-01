import {describe, expect, test} from 'vitest'
import {hasEmptyCell} from "./hasEmptyCell.js";

describe('hasEmptyCell', () => {
    test('All empty', () => {
        expect(hasEmptyCell([0, 0, 0, 0])).toBe(true)
    })
    test('1 empty', () => {
        expect(hasEmptyCell([4, 0, 2, 1])).toBe(true)
    })
    test('No empty', () => {
        expect(hasEmptyCell([3, 5, 1, 12])).toBe(false)
    })
    test('No empty (dynamic type)', () => {
        expect(hasEmptyCell(['0', 4, 'dasdf', true])).toBe(false)
    })
})