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
        if (startTime.split(':').length !== 2 || endTime.split(':').length !== 2) {
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