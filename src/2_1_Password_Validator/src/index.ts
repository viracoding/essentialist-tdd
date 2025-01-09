import { PasswordValidator } from "./passwordValidator";

// arrange
const input = 'pass'

// act
let validatorResult = PasswordValidator.validate(input)

// assert
expect(validatorResult).toBeDefined()