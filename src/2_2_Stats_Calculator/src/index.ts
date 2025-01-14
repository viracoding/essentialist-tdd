export class StatsCalculator {
    public static getMinimum(numbers: number[]): number {
        let minimum = numbers[0];
        numbers.forEach((num) => {
            if (num < minimum) {
                minimum = num
            }
        })
        return minimum
    }
}