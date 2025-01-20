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

    public static evaluate(expression: string): boolean | undefined {
        const expressionParts = expression.split(" ")
        if (expression.split(" ").length === 3) {
            if (expression.split(" ")[1] === "AND") {
                return expression.split(" ")[0] === "TRUE" && expression.split(" ")[2] === "TRUE";
            }
            if (expression.split(" ")[1] === "OR") {
                return expression.split(" ")[0] === "TRUE" || expression.split(" ")[2] === "TRUE";
            }
        }
        if (expressionParts.length === 2 && expressionParts[0] === "NOT") {
            return this.returnInverse(expressionParts[1])
        }
        return this.isTrue(expression)
    }
}