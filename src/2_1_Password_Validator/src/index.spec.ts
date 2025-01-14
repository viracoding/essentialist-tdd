import { PasswordValidator } from "./passwordValidator";

describe('password validator', () => {

  test('returns a result', () => {
    const validatorResult = PasswordValidator.validate('password')
    expect(validatorResult).toBeDefined()
  })

  test('password length should be between 5 and 15 characters long', () => {
    const validatorResult = PasswordValidator.validate('paSSword123')
    expect(validatorResult.result).toBeTruthy()
    expect(validatorResult.errors).toHaveLength(0)
  })

  test('password must contain a digit', () => {
    const validatorResult = PasswordValidator.validate('Password0')
    expect(validatorResult.result).toBeTruthy()
    expect(validatorResult.errors).toHaveLength(0)
  })

  test('password must contain a uppercase letter', () => {
    const validatorResult = PasswordValidator.validate('Uppercase0')
    expect(validatorResult.result).toBeTruthy()
    expect(validatorResult.errors).toHaveLength(0)
  })

  test('returns invalid password with all possible errors', () => {
    const validatorResult = PasswordValidator.validate('pass')
    expect(validatorResult.result).toBeFalsy();
    expect(validatorResult.errors.length).toBeGreaterThanOrEqual(3)
  })

  test('password with 16 characters should be invalid', () => {
    const validatorResult = PasswordValidator.validate('thePhysical1234567')
    expect(validatorResult.result).toBeFalsy()
    expect(validatorResult.errors.length).toBeGreaterThanOrEqual(1)
    expect(validatorResult.errors[0].type).toBeDefined()
    expect(validatorResult.errors[0].message).toBeDefined()
  })

  test('returns false because of a lack of a digit', () => {
    const validatorResult = PasswordValidator.validate('maxwellTheBe')
    expect(validatorResult.result).toBeFalsy()
  })

  test('password with lowercase letters is invalid', () => {
    const validatorResult = PasswordValidator.validate('maxwell1_c')
    expect(validatorResult.result).toBeFalsy()
  })
})