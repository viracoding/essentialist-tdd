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
    })
})
