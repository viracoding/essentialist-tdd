export class BooleanCalculator {
    public static evaluate(expression: string): boolean | undefined {
        if (expression === "TRUE") {
            return true
        } else if (expression === "FALSE") {
            return false
        } else {
            return
        }
    }
}