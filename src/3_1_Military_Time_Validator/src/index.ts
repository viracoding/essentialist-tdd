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
    error: ErrorType[];
}

export function validateMilitaryTime(time: string): ResultType {
    return {
        valid: true,
        error: []
    }
}