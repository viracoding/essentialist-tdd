import { fizzbuzz } from "./index";

describe('fizzbuzz', () => {
    it('returns string', () => {
        expect(typeof fizzbuzz(2)).toBe('string')
    })

    it('should be able to return "Fizz" for multiples of three', () => {
        expect(fizzbuzz(3)).toBe('Fizz')
    })
})