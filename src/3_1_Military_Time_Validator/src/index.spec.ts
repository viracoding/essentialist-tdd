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
    it('knows that the time is a range', () => {
        const time = "01:12 - 14:32"
        const result = validateMilitaryTime(time)
        expect(result.valid).toBeTruthy()
    })

    it('knows that the input is not a range', () => {
        const time = "01:12 14:32"
        const result = validateMilitaryTime(time)
        expect(result.valid).toBeFalsy()
    })
})
