const AVAILABLE_VALUES = ['TRUE', 'FALSE']

export class BooleanCalculator {

    private static isTrue(input: string): boolean {
        if (!AVAILABLE_VALUES.includes(input)) {
            throw Error
        }
        return input === "TRUE"
    }
    private static returnInverse(input: string) {
        return !this.isTrue(input)
    }
    private static and(left: boolean, right: boolean) {
        return left && right
    }
    private static or(left: boolean, right: boolean) {
        return left || right
    }

    public static evaluate(expression: string): boolean | undefined {
        const expressionParts = expression.split(" ")
        if (expressionParts.length === 3) {
            if (expressionParts[1] === "AND") {
                return this.and(this.isTrue(expressionParts[0]), this.isTrue(expressionParts[2]));
            }
            if (expressionParts[1] === "OR") {
                return this.or(this.isTrue(expressionParts[0]), this.isTrue(expressionParts[2]));
            }
        }
        if (expressionParts.length === 2 && expressionParts[0] === "NOT") {
            return this.returnInverse(expressionParts[1])
        }
        return this.isTrue(expression)
    }
}