import {describe, expect, test} from 'vitest'
import {arrHasEmptyValue} from "./arrHasEmptyValue.js";

describe('hasEmptyCell', () => {
    test('Number, true', () => {
        expect(arrHasEmptyValue([4, 0, 2, 1])).toBe(true)
    })
    test('Number, false', () => {
        expect(arrHasEmptyValue([3, 5, 1, 12])).toBe(false)
    })


    test('Boolean, true', () => {
        expect(arrHasEmptyValue([false, true, false, true])).toBe(true)
    })
    test('Boolean, false', () => {
        expect(arrHasEmptyValue([true, true, true, true])).toBe(false)
    })


    test('String, true', () => {
        expect(arrHasEmptyValue(['null', 'true', '', '1234'])).toBe(true)
    })
    test('String, false', () => {
        expect(arrHasEmptyValue(['null', 'true', '0', '1234'])).toBe(false)
    })



    test('Dynamic, false', () => {
        expect(arrHasEmptyValue(['0', 4, 'dasdf', true])).toBe(false)
    })
    test('Dynamic, true all empty', () => {
        expect(arrHasEmptyValue([0, null, undefined, '', false])).toBe(true)
    })
    test('Dynamic, true Number', () => {
        expect(arrHasEmptyValue(['0', 4, '', true])).toBe(true)
    })
    test('Dynamic, true Boolean', () => {
        expect(arrHasEmptyValue(['0', false, 'ddddf', true])).toBe(true)
    })
    test('Dynamic, true String', () => {
        expect(arrHasEmptyValue(['0', 4, '', true])).toBe(true)
    })
    test('Dynamic, true null', () => {
        expect(arrHasEmptyValue(['0', 4, null, true])).toBe(true)
    })
    test('Dynamic, true undefined', () => {
        expect(arrHasEmptyValue(['0', undefined, 'ddddf', true])).toBe(true)
    })

})
