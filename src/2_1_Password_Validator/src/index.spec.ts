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
})