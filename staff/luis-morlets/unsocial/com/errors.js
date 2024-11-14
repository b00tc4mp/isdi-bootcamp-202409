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
    SystemError: createCustomError('SystemError'),
    NotFoundError: createCustomError('NotFoundError'),
    CredentialsError: createCustomError('CredentialsError'),
    OwnershipError: createCustomError('OwnershipError'),
    DuplicityError: createCustomError('DuplicityError')
}

export default errors