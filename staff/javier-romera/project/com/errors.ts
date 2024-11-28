class CustomError extends Error {
    constructor(message: string, name: string) {
        super(message)

        this.name = name
    }
}

type CustomErrorConstructor = new (message: string) => CustomError

const createCustomError = (name: string): CustomErrorConstructor => {
    return class extends CustomError {
        constructor(message: string) {
            super(message, name)
        }

        static get errName() { return name }
    }
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

export {
    errors,
    CustomError
}