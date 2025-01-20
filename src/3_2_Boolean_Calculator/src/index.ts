const AVAILABLE_VALUES = ['TRUE', 'FALSE']

export class BooleanCalculator {

    private static isTrue(input: string): boolean {
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
                if (expression.split(" ")[1] === "TRUE") {
                    return false
                } else if (expression.split(" ")[1] === "FALSE") {
                    return true
                }
            }
        }
        if (!AVAILABLE_VALUES.includes(expression)) {
            return
        }
        return this.isTrue(expression)
    }
}