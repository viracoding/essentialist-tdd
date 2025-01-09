type ValidatorError = {
    type: string;
    message: string;
}

type ValidatorResult = {
    result: boolean;
    errors: ValidatorError[];
}

export class PasswordValidator {
    static validate(input: string): ValidatorResult {
        return {
            result: false,
            errors: []
        }
    }
}