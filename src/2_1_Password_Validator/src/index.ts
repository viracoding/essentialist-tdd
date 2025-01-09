import { PasswordValidator } from "./passwordValidator";

// arrange
const input = 'pass'

// act
let validator = PasswordValidator.validate(input)

// assert
expect(validator.result).toBeTruthy()