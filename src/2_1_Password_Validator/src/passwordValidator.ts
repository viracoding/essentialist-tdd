type ValidatorError = {
    type: string;
    message: string;
}

type ValidatorResult = {
    result: boolean;
    errors: ValidatorError[];
}

export class PasswordValidator {
    private static hasDigit(input: string){
        return /\d/.test(input);
    }

    private static hasUppercase(input: string) {
        return /[A-Z]/.test(input);
    }

    static validate(input: string): ValidatorResult {
        const errors: ValidatorError[] = [];

        if (input.length < 5 || input.length > 15) {
           errors.push({
               type: 'PasswordLength',
               message: 'Password length must be between 5 and 15.'
           })
        }

        if (!this.hasDigit(input)) {
            errors.push({
                type: 'PasswordMustContainDigit',
                message: 'Password must contain at least one digit.'
            })
        }

        if (!this.hasUppercase(input)) {
            errors.push({
                type: 'PasswordMustContainUppercase',
                message: 'Password must contain at least one uppercase letter.'
            })
        }

        return {
            result: errors.length === 0,
            errors
        }
    }
}