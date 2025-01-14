import {StatsCalculator} from "./index";

describe('stats calculator', () => {
    it('returns -8 as the minimum value of following sequence of integer numbers [2, 4, 21, -8, 53, 40]', () => {
        const result = StatsCalculator.getMinimum([2, 4, 21, -8, 53, 40])
        expect(result).toBe(-8)
    })
})