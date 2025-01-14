import { calculateStats } from "./index";

describe('stats calculator', () => {
    it('returns -8 as the minimum value of following sequence of integer numbers [2, 4, 21, -8, 53, 40]', () => {
        const result = calculateStats([2, 4, 21, -8, 53, 40])
        expect(result.minimum).toBe(-8)
    })

    it('returns 53 as the maximum value of the following sequence of integer numbers [2, 4, 21, -8, 53, 40]', () => {
        const result = calculateStats([2, 4, 21, -8, 53, 40])
        expect(result.maximum).toBe(53)
    })

    it('returns 6 as the elements count of the following sequence of integer numbers [2, 4, 21, -8, 53, 40]', () => {
        const result = calculateStats([2, 4, 21, -8, 53, 40])
        expect(result.elementsCount).toBe(6)
    })
})