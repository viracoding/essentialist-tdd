/*
Examples:
- "01:12 - 14:32" (yes)
- "22:00 - 23:12" (yes)
- "25:00 - 12:23" (no)

- Check if the input is a range, by parsing the string and checking for "-"
- The variable should contain two elements, parse them both by ":"
    - check if the hours are between 00-24
    - check if the minutes are between 00-60
- And then I would compare the hour of first one should be smaller than the hour of the last one
- If the hours are equal, then compare the minutes, where the first one should be smaller

ResultType {
    valid: boolean,
    errors: ErrorType[]
}
*/

import {validateMilitaryTime} from "./index";

describe('military time validator', () => {
    it.each([
        [ '01:12 - 14:32', true ],
        [ '01:12  14:32', false ],
        [ '01:12 - 14:32 - 15:55', false ],
    ])(`knows that "%s" should be: %s`, ( time , validity) => {
        const result = validateMilitaryTime(time)
        expect(result.valid).toBe(validity)
    })

    it('knows that range has valid startTime and endTime', () => {
        const time = '01:12 - 14:32'
        const result = validateMilitaryTime(time)
        expect(result.valid).toBeTruthy();
    })

    it('knows that range has invalid startTime', () => {
        const time = '0112 - 14:32'
        const result = validateMilitaryTime(time)
        expect(result.valid).toBeFalsy();
    })

    it('knows that range has invalid endTime', () => {
        const time = '01:12 - 1432'
        const result = validateMilitaryTime(time)
        expect(result.valid).toBeFalsy();
    })
})
