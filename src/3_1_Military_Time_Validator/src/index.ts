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

    const timeRange = time.split('-');
    const [ startTime, endTime ] = timeRange;

    const startTimeRange = startTime?.split(':') || [];
    const [ startTimeHour, startTimeMinute ] = startTimeRange;

    const endTimeRange = endTime?.split(':') || [];
    const [ endTimeHour, endTimeMinute ] = endTimeRange;

    if (timeRange.length !== 2) {
        errors.push(ErrorType.InputIsNotARange)
    }
    if (startTimeRange.length !== 2 || endTimeRange.length !== 2) {
        errors.push(ErrorType.InputHasNotStartOrEndTime)
    }

    if (parseInt(startTimeHour) < 0 || parseInt(startTimeHour) > 23 || parseInt(endTimeHour) < 0 || parseInt(endTimeHour) > 23) {
        errors.push(ErrorType.HoursNotValid)
    }
    if (parseInt(startTimeMinute) < 0 || parseInt(startTimeMinute) > 59 || parseInt(endTimeMinute) < 0 || parseInt(endTimeMinute) > 59) {
        errors.push(ErrorType.MinutesNotValid)
    }

    return {
        valid: errors.length === 0,
        errors
    }
}