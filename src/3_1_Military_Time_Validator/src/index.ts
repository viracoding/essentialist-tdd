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
    const [ startTimeHour, startTimeMinute ] = startTimeRange.map(Number);

    const endTimeRange = endTime?.split(':') || [];
    const [ endTimeHour, endTimeMinute ] = endTimeRange.map(Number);

    if (startTimeRange[0]?.trim().length != 2 || endTimeRange[0]?.trim().length != 2) {
        errors.push(ErrorType.HoursNotValid)
    }

    if (startTimeRange[1]?.trim().length != 2 || endTimeRange[1]?.trim().length != 2) {
        errors.push(ErrorType.MinutesNotValid)
    }

    if (timeRange.length !== 2) {
        errors.push(ErrorType.InputIsNotARange)
    }
    if (startTimeRange.length !== 2 || endTimeRange.length !== 2) {
        errors.push(ErrorType.InputHasNotStartOrEndTime)
    }

    if (isNaN(startTimeHour) || isNaN(endTimeHour) || startTimeHour < 0 || startTimeHour > 23 || endTimeHour < 0 || endTimeHour > 23) {
        errors.push(ErrorType.HoursNotValid)
    }
    if (isNaN(startTimeMinute) || isNaN(endTimeMinute) || startTimeMinute < 0 || startTimeMinute > 59 || endTimeMinute < 0 || endTimeMinute > 59) {
        errors.push(ErrorType.MinutesNotValid)
    }

    if (startTimeHour > endTimeHour) {
        errors.push(ErrorType.ChronologicalInconsistency)
    }
    if (startTimeHour === endTimeHour && startTimeMinute > endTimeMinute) {
        errors.push(ErrorType.ChronologicalInconsistencyInMinutes)
    }

    return {
        valid: errors.length === 0,
        errors
    }
}