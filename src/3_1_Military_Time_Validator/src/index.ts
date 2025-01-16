enum ErrorType {
    InputIsNotARange = 'InputIsNotARange',
    InputHasNotStartOrEndTime = 'InputHasNotStartOrEndTime',
    HoursNotValid = 'HoursNotValid',
    MinutesNotValid = 'MinutesNotValid',
    ChronologicalInconsistency = 'ChronologicalInconsistency',
    ChronologicalInconsistencyInMinutes = 'ChronologicalInconsistencyInMinutes'
}

type ResultType = {
    valid: boolean;
    errors: ErrorType[];
}

export function validateMilitaryTime(time: string): ResultType {
    const errors: ErrorType[] = []

    if (time.split('-').length === 2) {
        const [ startTime, endTime ] = time.split('-')
        if (startTime.split(':').length === 2 && endTime.split(':').length === 2) {
            const [ startTimeHour, startTimeMinute ] = startTime.split(':');
            const [ endTimeHour, endTimeMinute ] = endTime.split(':')
            if (
                (parseInt(startTimeHour) < 0 || parseInt(startTimeHour) > 23 || parseInt(endTimeHour) < 0 || parseInt(endTimeHour) > 23) ||
                (parseInt(startTimeMinute) < 0 || parseInt(startTimeMinute) > 59 || parseInt(endTimeMinute) < 0 || parseInt(endTimeMinute) > 59)
            ) {
                errors.push(ErrorType.HoursNotValid)
            }
        } else {
            errors.push(ErrorType.InputHasNotStartOrEndTime)
        }
    } else {
        errors.push(ErrorType.InputIsNotARange)
    }

    return {
        valid: errors.length === 0,
        errors
    }
}