export type StatsResult = {
    minimum: number;
    maximum: number;
    elementsCount: number;
    average: number;
}

export function calculateStats(numbers: number[]): StatsResult {
    let minimum = numbers[0];
    let maximum = numbers[0];
    let elementsCount = 0;
    let sum = 0;
    numbers.forEach((num) => {
        if (num < minimum) {
            minimum = num
        }
        if (num > maximum) {
            maximum = num
        }
        elementsCount++;
        sum += num;
    })

    return {
        minimum,
        maximum,
        elementsCount,
        average: Number((sum / elementsCount).toFixed(2))
    }
}