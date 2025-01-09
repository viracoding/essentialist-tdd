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
        const errors: ValidatorError[] = [];
        let result = false;

        if (input.length >= 5 && input.length <= 15) {
           result = true;
        }

        return {
            result,
            errors
        }
    }
}