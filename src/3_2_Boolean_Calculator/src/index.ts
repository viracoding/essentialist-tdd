const AVAILABLE_VALUES = ['TRUE', 'FALSE']

export class BooleanCalculator {

    private static isTrue(input: string): boolean {
        if (!AVAILABLE_VALUES.includes(input)) {
            throw Error
        }
        return input === "TRUE"
    }

    public static evaluate(expression: string): boolean | undefined {
        if (expression.split(" ").length === 3) {
            if (expression.split(" ")[1] === "AND") {
                return expression.split(" ")[0] === "TRUE" && expression.split(" ")[2] === "TRUE";
            }
            if (expression.split(" ")[1] === "OR") {
                return expression.split(" ")[0] === "TRUE" || expression.split(" ")[2] === "TRUE";
            }
        }
        if (expression.split(" ").length === 2) {
            if (expression.split(" ")[0] === "NOT") {
                return !this.isTrue(expression.split(" ")[1])
            }
        }
        return this.isTrue(expression)
    }
}