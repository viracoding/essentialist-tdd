import { PasswordValidator } from "./passwordValidator";

describe('password validator', () => {

  test('returns a result', () => {
    const validatorResult = PasswordValidator.validate('pass')
    expect(validatorResult).toBeDefined()
  })

  test('returns invalid password', () => {
    const validatorResult = PasswordValidator.validate('pass')
    expect(validatorResult.result).toBeFalsy();
  })

  test('password length should be between 5 and 15 characters long', () => {
    const validatorResult = PasswordValidator.validate('password')
    expect(validatorResult.result).toBeTruthy()
  })

  test('password with 3 characters should be invalid', () => {
    const validatorResult = PasswordValidator.validate('lol')
    expect(validatorResult.result).toBeFalsy()
  })
})