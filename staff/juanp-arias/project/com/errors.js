const createCustomError = name =>
    class extends Error {
        constructor(message) {
            super(message)

            this.name = name
        }
        static get name() { return name }
    }

const errors = {
    ValidationError: createCustomError('ValidationError'),
    NotFoundError: createCustomError('NotFoundError'),
    DuplicityError: createCustomError('DuplicityError'),
    CredentialsError: createCustomError('CredentialsError'),
    SystemError: createCustomError('SystemError'),
    OwnershipError: createCustomError('OWnershipError'),
    AuthorizationError: createCustomError('AuthorizationError')
}
export default errors