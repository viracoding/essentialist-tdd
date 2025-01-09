import { PasswordValidator } from "./passwordValidator";

describe('password validator', () => {

  test('returns a result', () => {
    const validatorResult = PasswordValidator.validate('pass')
    expect(validatorResult).toBeDefined()
  })

  test('returns invalid password', () => {
    const validatorResult = PasswordValidator.validate('password')
    expect(validatorResult.result).toBeFalsy();
  })

  test('password length should be between 5 and 15 characters long', () => {
    const validatorResult = PasswordValidator.validate('paSSword123')
    expect(validatorResult.result).toBeTruthy()
    expect(validatorResult.errors).toHaveLength(0)
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
    const validatorResult = PasswordValidator.validate('Password1')
    expect(validatorResult.result).toBeTruthy()
    expect(validatorResult.errors).toHaveLength(0)
  })

  test('password with lowercase letters is invalid', () => {
    const validatorResult = PasswordValidator.validate('password123')
    expect(validatorResult.result).toBeFalsy()
  })
})