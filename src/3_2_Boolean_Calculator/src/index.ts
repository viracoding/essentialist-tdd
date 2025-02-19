const AVAILABLE_VALUES = ['TRUE', 'FALSE']

export class BooleanCalculator {

    private static isTrue(input: string): boolean {
        if (!AVAILABLE_VALUES.includes(input)) {
            throw Error
        }
        return input === "TRUE"
    }
    private static returnInverse(input: string) {
        if (!AVAILABLE_VALUES.includes(input)) {
            throw Error
        }
        return input === "TRUE" ? "FALSE" : "TRUE"
    }
    private static and(left: boolean, right: boolean) {
        return left && right ? "TRUE" : "FALSE"
    }
    private static or(left: boolean, right: boolean) {
        return left || right ? "TRUE" : "FALSE"
    }
    private static evaluateSimpleExpression(expression: string) {
        const expressionParts = expression.split(" ")
        while (expressionParts.length > 1) {
            const indexOfNot = expressionParts.indexOf("NOT")
            if (indexOfNot !== -1) {
                expressionParts.splice(indexOfNot, 2,
                    this.returnInverse(expressionParts[indexOfNot + 1])
                )
                continue
            }
            const indexOfAnd = expressionParts.indexOf("AND")
            if (indexOfAnd !== -1) {
                expressionParts.splice(indexOfAnd - 1, 3,
                    this.and(this.isTrue(expressionParts[indexOfAnd - 1]), this.isTrue(expressionParts[indexOfAnd + 1]))
                )
                continue
            }
            const indexOfOr = expressionParts.indexOf("OR")
            if (indexOfOr !== -1) {
                expressionParts.splice(indexOfOr - 1, 3,
                    this.or(this.isTrue(expressionParts[indexOfOr - 1]), this.isTrue(expressionParts[indexOfOr + 1]))
                )
                continue
            }
        }
        return expressionParts[0]
    }

    public static evaluate(expression: string): boolean | undefined {
        const startParen = expression.indexOf('(')
        const endParen = expression.indexOf(')')
        if (startParen !== -1 && endParen !== -1) {
            const innerResult = this.evaluateSimpleExpression(
                expression.substring(startParen + 1, endParen)
            )
            // Replace parentheses expression with its result and evaluate the whole thing
            const newExpression =
                expression.substring(0, startParen) +
                innerResult +
                expression.substring(endParen + 1)
            return this.isTrue(this.evaluateSimpleExpression(newExpression))
        }

        return this.isTrue(this.evaluateSimpleExpression(expression))
    }
}