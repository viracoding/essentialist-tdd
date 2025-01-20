import { BooleanCalculator } from "./index";

describe('boolean calculator', () => {
    describe('can evaluate single values', () => {
        it('"TRUE" as true', () => {
            expect(BooleanCalculator.evaluate("TRUE")).toBeTruthy()
        })
        it('"FALSE" as false', () => {
            expect(BooleanCalculator.evaluate("FALSE")).toBeFalsy()
        })
        it.each([
            '', 'true', 'false', 'tru', 'fal', 'xyz'
        ])('"%s" is not a single value' , (input) => {
            expect(BooleanCalculator.evaluate(input)).toBeUndefined()
        })
    })
    describe('can evaluate the inverse of a single value', () => {
        it('"NOT TRUE" as false ', () => {
            expect(BooleanCalculator.evaluate("NOT TRUE")).toBeFalsy()
        })

        it('"NOT FALSE" as true ', () => {
            expect(BooleanCalculator.evaluate("NOT FALSE")).toBeTruthy()
        })

        it.each([
            '', 'NOT NOT', 'NOT fal', 'NOT tru', 'NOT xyz'
        ])('"%s" is not a valid single value inversion' , (input) => {
            expect(BooleanCalculator.evaluate(input)).toBeUndefined()
        })
    })
    describe('can evaluate two values with AND operator', () => {
        it('knows that if one of the variables is FALSE, to evaluate as false', () => {
            expect(BooleanCalculator.evaluate('TRUE AND FALSE')).toBeFalsy()
        })
        it('knows that if both of the variables are TRUE, to evaluate as true', () => {
            expect(BooleanCalculator.evaluate('TRUE AND TRUE')).toBeTruthy()
        })
    })
})
