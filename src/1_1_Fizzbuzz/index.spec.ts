import { fizzbuzz } from "./index";

describe('fizzbuzz', () => {
    it('returns string', () => {
        expect(typeof fizzbuzz(2)).toBe('string')
    })
})