import {describe, expect, test} from 'vitest'
import {useValidation} from './useValidation.js'


describe('email', () => {
    test('undefined', () => {
        expect(useValidation().Email().isValid).toBe(false)
    })
    test('empty', () => {
        expect(useValidation().Email('').isValid).toBe(false)
    })
    test('not include @', () => {
        expect(useValidation().Email('abcabc.com').isValid).toBe(false)
    })
    test('invalid domain 0', () => {
        expect(useValidation().Email('abc@').isValid).toBe(false)
    })
    test('invalid domain 1', () => {
        expect(useValidation().Email('abc@abc').isValid).toBe(false)
    })
    test('invalid domain 2', () => {
        expect(useValidation().Email('abc@abc.abc.abc').isValid).toBe(false)
    })
    test('invalid domain 3', () => {
        expect(useValidation().Email('abc@abc.').isValid).toBe(false)
    })
    test('invalid domain 4', () => {
        expect(useValidation().Email('abc@.').isValid).toBe(false)
    })
    test('invalid domain 5', () => {
        expect(useValidation().Email('abc@.abc').isValid).toBe(false)
    })


    test('valid', () => {
        expect(useValidation().Email('abc.abc.abc@abc.abc').isValid).toBe(true)
    })
    test('valid', () => {
        expect(useValidation().Email('abc@abc.abc').isValid).toBe(true)
    })

})


describe('password', () => {
    test('undefined', () => {
        expect(useValidation().Password().isValid).toBe(false)
    })
    test('empty', () => {
        expect(useValidation().Password('').isValid).toBe(false)
    })
    test('short', () => {
        expect(useValidation().Password('123').isValid).toBe(false);
    })
    test('long', () => {
        expect(useValidation().Password('123456789012345678901234123455').isValid).toBe(false)
    })
    test('valid left bound', () => {
        expect(useValidation().Password('123456').isValid).toBe(true)
    })
    test('valid right bound', () => {
        expect(useValidation().Password('123456789012345678901234').isValid).toBe(true)
    })
    test('valid', () => {
        expect(useValidation().Password('12345678').isValid).toBe(true)
    })
})

describe('username', () => {
    test('undefined', () => {
        expect(useValidation().Username().isValid).toBe(false)
    })
    test('empty', () => {
        expect(useValidation().Username('').isValid).toBe(false)
    })
    test('short', () => {
        expect(useValidation().Username('a').isValid).toBe(false);
    })
    test('long', () => {
        expect(useValidation().Username('abababababababababababab1231341234').isValid).toBe(false)
    })
    test('valid left bound', () => {
        expect(useValidation().Username('abc').isValid).toBe(true)
    })
    test('valid right bound', () => {
        expect(useValidation().Username('abababababababababababab').isValid).toBe(true)
    })
    test('valid', () => {
        expect(useValidation().Username('abcabcabcd').isValid).toBe(true)
    })
})

describe('confirmation code', () => {
    test('undefined', () => {
        expect(useValidation().ConfirmationCode().isValid).toBe(false)
    })
    test('empty', () => {
        expect(useValidation().ConfirmationCode('').isValid).toBe(false)
    })
    test('short', () => {
        expect(useValidation().ConfirmationCode(1234).isValid).toBe(false);
    })
    test('long', () => {
        expect(useValidation().ConfirmationCode(123456).isValid).toBe(false)
    })
    test('string', () => {
        expect(useValidation().ConfirmationCode('12345').isValid).toBe(true)
    })
    test('valid left bound', () => {
        expect(useValidation().ConfirmationCode(10000).isValid).toBe(true)
    })
    test('valid right bound', () => {
        expect(useValidation().ConfirmationCode(99999).isValid).toBe(true)
    })
    test('valid', () => {
        expect(useValidation().ConfirmationCode(12345).isValid).toBe(true)
    })
})

