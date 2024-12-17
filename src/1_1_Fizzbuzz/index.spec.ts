import { fizzbuzz } from "./index";

describe('fizzbuzz', () => {
    it('returns string', () => {
        expect(typeof fizzbuzz(2)).toBe('string')
    })

    it('should be able to return "Fizz" for multiples of three', () => {
        expect(fizzbuzz(3)).toBe('Fizz')
    })

    it('should be able to return "Buzz" for multiples of five', () => {
        expect(fizzbuzz(5)).toBe('Buzz')
    })

    it('should be able to return "FizzBuzz" for multiples of both three and five', () => {
        expect(fizzbuzz(15)).toBe('FizzBuzz')
    })
})