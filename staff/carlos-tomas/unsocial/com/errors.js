const createCustomError = name =>
    class extends Error {
        constructor(message) {
            super(message)

            this.name = name // for browsers compat (WARN safari seems to fail, it hangs)
        }

        static get name() { return name }
    }

const errors = {
    ValidationError: createCustomError('ValidationError'),
    NotFoundError: createCustomError('NotFoundError'),
    DuplicityError: createCustomError('DuplicityError'),
    CredentialsError: createCustomError('CredentialsError'),
    SystemError: createCustomError('SystemError'),
    OwnershipError: createCustomError('OwnershipError'),
    AuthorizationError: createCustomError('AuthorizationError')
}

export default errors