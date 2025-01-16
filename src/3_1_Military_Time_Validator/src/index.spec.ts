/*
Examples:
- "01:12 - 14:32" (yes)
- "22:00 - 23:12" (yes)
- "25:00 - 12:23" (no)

- Check if the input is a range, by parsing the string and checking for "-"
- The variable should contain two elements, parse them both by ":"
    - check if the hours are between 00-23
    - check if the minutes are between 00-59
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
        [ '0112  14:32', false ],
        [ '01:12 - 1432', false ],
        [ '0112 - 1432', false ],
        [ '', false ],
        [ 'AA:AA - BB:BB', false ],
    ])(`knows that "%s" should be: %s`, ( time , validity) => {
        const result = validateMilitaryTime(time)
        expect(result.valid).toBe(validity)
    })

    it.each([
        [ '01:12 - 14:32', true ],
        [ '24:12 - 25:32', false ],
        [ '00:12 - 24:32', false ],
        [ '00:62 - 24:32', false ]
    ])('validates that %s is in between 00-23 results %s', (time, validity) => {
        const result = validateMilitaryTime(time)
        expect(result.valid).toBe(validity)
    })

    it.each([
        '23:12 - 21:32',
        '01:44 - 01:32'
    ])('knows that %s has chronological inconsistency', (time) => {
        const result = validateMilitaryTime(time)
        expect(result.valid).toBe(false)
    })
})
