- Between 5 and 15 characters long
    - check if it is 5 or 15 or something in the middle
    - check the case of 4, check the case of 16
- Contains at least one digit
    - check a case with one digit
    - check a case with more then one digit
    - check a case without a digit
- Contains at least one upper case letter
    - check a case with one upper case letter
    - check a case with more then one upper case letter
    - check a case without an upper case letter
- Return an object containing a boolean result and an errors key that — when provided with an invalid password — contains an error message or type for all errors in occurrence. There can be multiple errors at a single time.
    - return object has two keys, result as boolean and errors as an array of object with the keys: type and message
    - check if result exists
    - check if errors exists
    - check if type of error exists
    - check if message of error exists
    ```
    {
        result: false,
        errors: [
            {
                type: 'LengthIsTooShort',
                message: 'Password should contain at least 5 characters.'
            }
        ]
    }
    ```