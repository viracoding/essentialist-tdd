export function fizzbuzz(num: number): string {
    if (num <= 0) {
        throw new Error('Number must be between 1 and 100')
    }
    if (num % 3 === 0 && num % 5 === 0) {
        return "FizzBuzz"
    }
    if (num % 3 === 0) {
        return "Fizz"
    }
    if (num % 5 === 0) {
        return "Buzz"
    }
    return num.toString();
}