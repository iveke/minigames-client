import {describe, expect, test} from 'vitest'
import {arrSum} from './arrSum.js'

describe('arrSum', () => {
    test('Sum of empty array', () => {
        expect(arrSum([0, 0, 0, 0])).toBe(0)
    })
    test('Sum of one element array', () => {
        expect(arrSum([1])).toBe(1)
    })
    test('Sum of few element array', () => {
        expect(arrSum([1, 2, 3, 0, 5])).toBe(11)
    })
    test('Sum of string array', () => {
        expect(arrSum(['seven', '5', '10'])).toBe('0seven510')
    })
    test('Sum of boolean array', () => {
        expect(arrSum([true, false, true])).toBe(2)
    })
})

