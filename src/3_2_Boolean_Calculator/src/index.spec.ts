import { BooleanCalculator } from "./index";

describe('boolean calculator', () => {
    describe('can evaluate single values', () => {
        it('recognizes "TRUE"', () => {
            expect(BooleanCalculator.evaluate("TRUE")).toBeTruthy()
        })
        it('recognizes "FALSE"', () => {
            expect(BooleanCalculator.evaluate("FALSE")).toBeFalsy()
        })
        it.each([
            '', 'true', 'false', 'tru', 'fal', 'xyz'
        ])('doesn\'t recognize any other single value such as "%s"' , (input) => {
            expect(BooleanCalculator.evaluate(input)).toBeUndefined()
        })
    })
})
