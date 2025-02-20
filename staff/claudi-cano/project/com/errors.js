const createCustomError = name =>
    class extends Error {
        constructor(message) {
            super(message)

            this.name = name // for browsers compat, ojo que con safari falla
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