const {describe, test, expect} = require('@jest/globals')
const factorial = require('./factorial.js')
const checkPalindrom = require('./checkPalindrom.js')
const getUser = require('./getUser.js')

describe('factorial function', () => {
    test('factorial 1', () => {
        const res1 = factorial(1)
        expect(res1).toBe(1)
    })
    test('factorial 5', () => {
        const res5 = factorial(5)
        expect(res5).toBe(120)
    })
    test('factorial -10', () => {
        const res_10 = factorial(-10)
        expect(res_10).toBe(undefined)
    })
})

describe('palindrom function', () => {
    const tests = [
        {input: 'tom', expected: false},
        {input: 'level', expected: true},
        {input: '12321', expected: true},
        {input: '12344321', expected: true},
        {input: '123421', expected: false}
    ]
    test.each(tests)('palindrom', ({input, expected}) => {
        const res = checkPalindrom(input)
        expect(res).toBe(expected)
    })
})

jest.mock('./getFullName.js')
describe('getUser function', () => {
    test('getUser with date', () => {
        const nowTime = new Date()
        let result;
        try{
            result = getUser('tom', 'Smith', nowTime)
        } catch (e){
            result = e
        }
        expect(result.message).toBe('error 1')

        const expectedRes = {
            firstName: 'tom',
            lastName: 'Smith',
            fullName: 'fullname',
            company: 'GoIT',
            createdAt: nowTime
        }

        expect(user).toEqual(expectedRes)
    })
    test('getUser without date', () => {
        const user = getUser('Tom', 'Smith')
        expect(user.createdAt).not.toBeUndefined()
        expect(user.firstName).toBe('Tom')
        expect(user.lastName).toBe('Smith')
    })
    test('getUser null', () => {
        const user = getUser('','')
        expect(user).toBeNull()
    })
})

