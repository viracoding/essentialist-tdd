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
    const validatorResult = PasswordValidator.validate('password123')
    expect(validatorResult.result).toBeTruthy()
  })

  test('password with 3 characters should be invalid', () => {
    const validatorResult = PasswordValidator.validate('lol')
    expect(validatorResult.result).toBeFalsy()
  })

  test('password with 16 characters should be invalid', () => {
    const validatorResult = PasswordValidator.validate('lol0123456789lol')
    expect(validatorResult.result).toBeFalsy()
  })

  test('password must contain a digit', () => {
    const validatorResult = PasswordValidator.validate('password1')
    expect(validatorResult.result).toBeTruthy()
  })
})