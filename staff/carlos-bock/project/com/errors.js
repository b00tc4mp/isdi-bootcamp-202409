const customError = name =>
    class extends Error {
        constructor(message) {
            super(message)

            this.name = name
        }

        static get name() { return name }
    }

const errors = {
    ValidationError: customError('ValidationError'),
    NotFoundError: customError('NotFoundError'),
    DuplicityError: customError('DuplicityError'),
    CredentialsError: customError('CredentialsError'),
    SystemError: customError('SystemError'),
    OwnershipError: customError('OwnershipError'),
    AuthorizationError: customError('AuthorizationError')
}

export default errors

