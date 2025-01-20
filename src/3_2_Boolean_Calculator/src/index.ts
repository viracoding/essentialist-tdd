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

    public static evaluate(expression: string): boolean | undefined {
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
        return this.isTrue(expressionParts[0])
    }
}