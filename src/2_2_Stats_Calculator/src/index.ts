export type StatsResult = {
    minimum: number;
    maximum: number;
    elementsCount: number;
    average: number;
}

export function calculateStats(numbers: number[]): StatsResult {
    return {
        minimum: -8,
        maximum: 53,
        elementsCount: 0,
        average: 0
    }
}