import { BooleanCalculator } from "./index";

describe('boolean calculator', () => {
    describe('evaluates single values', () => {
        it('TRUE', () => {
            expect(BooleanCalculator.evaluate("TRUE")).toBeTruthy()
        })
        it('FALSE', () => {
            expect(BooleanCalculator.evaluate("FALSE")).toBeFalsy()
        })
    })
})
