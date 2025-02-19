import { fizzbuzz } from "./index";

describe('fizzbuzz', () => {
    it('returns string', () => {
        expect(typeof fizzbuzz(2)).toBe('string')
    })

    test.each(
        [3, 9, 42]
    )
    ('should be able to return "Fizz" for multiples of three', (threeMultiplier) => {
        expect(fizzbuzz(threeMultiplier)).toBe('Fizz')
    });

    it('should be able to return "Buzz" for multiples of five', () => {
        expect(fizzbuzz(5)).toBe('Buzz')
    })

    it('should be able to return "FizzBuzz" for multiples of both three and five', () => {
        expect(fizzbuzz(15)).toBe('FizzBuzz')
    })

    it('should be able to return "FizzBuzz" for multiples of both three and five', () => {
        expect(fizzbuzz(45)).toBe('FizzBuzz')
    })

    it('should be able to return the number as string, for all other cases', () => {
        expect(fizzbuzz(43)).toBe('43')
    })

    // Error cases

    it('should be able to return an error for negative numbers (including zero)', () => {
        expect(() => fizzbuzz(-10)).toThrow()
    })

    it('should be able to return an error for numbers greater then 100', () => {
        expect(() => fizzbuzz(101)).toThrow()
    })
})