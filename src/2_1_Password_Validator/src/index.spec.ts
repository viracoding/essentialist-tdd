import { PasswordValidator } from "./passwordValidator";

describe('password validator', () => {

  test('returns a result', () => {
    const validatorResult = PasswordValidator.validate('pass')
    expect(validatorResult).toBeDefined()
  })
})