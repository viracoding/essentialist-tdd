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
            expect(() => BooleanCalculator.evaluate(input)).toThrowError()
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
            expect(() =>  BooleanCalculator.evaluate(input)).toThrowError()
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
    describe('can evaluate two values with OR operator', () => {
        it('knows that if one of the variables is TRUE, to evaluate as true', () => {
            expect(BooleanCalculator.evaluate('TRUE OR FALSE')).toBeTruthy()
        })
        it('knows that if both of the variables are FALSE, to evaluate as false', () => {
            expect(BooleanCalculator.evaluate('FALSE OR FALSE')).toBeFalsy()
        })
    })
    describe('can evaluate more then two values', () => {
        it.each([
            ['TRUE OR FALSE OR TRUE', true],
            ['TRUE OR FALSE AND TRUE', true],
            ['TRUE AND TRUE AND TRUE', true],
            ['TRUE OR TRUE OR TRUE AND FALSE', true],
            ['TRUE AND TRUE AND TRUE', true],
            ['TRUE OR FALSE AND NOT FALSE', true],
        ])('"%s" is %s' , (expression: string, result: boolean) => {
            expect(BooleanCalculator.evaluate(expression)).toBe(result)
        })
    })
    describe('can evaluate expressions in paranthesis', () => {
        it.each([
            ["(TRUE OR TRUE OR TRUE) AND FALSE", false],
            ["NOT (TRUE AND TRUE)", false]
        ])('"%s" is %s' , (expression: string, result: boolean) => {
            expect(BooleanCalculator.evaluate(expression)).toBe(result)
        })
    })
})
