import { calculateStats } from "./index";

describe('stats calculator', () => {
    const inputNumbers = [2, 4, 21, -8, 53, 40];
    describe(`for the following sequence of integer numbers [${inputNumbers}]`, () => {
        const result = calculateStats(inputNumbers)
        it('returns -8 as the minimum value', () => {
            expect(result.minimum).toBe(-8)
        })

        it('returns 53 as the maximum value', () => {
            expect(result.maximum).toBe(53)
        })

        it('returns 6 as the elements count', () => {
            expect(result.elementsCount).toBe(6)
        })
    })
})