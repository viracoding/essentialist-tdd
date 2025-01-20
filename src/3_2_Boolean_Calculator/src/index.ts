export class BooleanCalculator {
    public static evaluate(expression: string): boolean | undefined {
        if (expression.split(" ").length === 3) {
            if (expression.split(" ")[1] === "AND") {
                return expression.split(" ")[0] === "TRUE" && expression.split(" ")[2] === "TRUE";
            }
            if (expression.split(" ")[1] === "OR") {
                return expression.split(" ")[0] === "TRUE" || expression.split(" ")[2] === "FALSE";
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
        if (expression === "TRUE") {
            return true
        } else if (expression === "FALSE") {
            return false
        } else {
            return
        }
    }
}