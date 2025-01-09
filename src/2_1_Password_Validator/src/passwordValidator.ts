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
        let result = false;

        if (input.length >= 5 && input.length <= 15) {
           result = true;
        }

        if (!this.hasDigit(input)) {
            result = false;
        }

        if (!this.hasUppercase(input)) {
            result = false;
        }

        return {
            result,
            errors
        }
    }
}