class CustomError extends Error {
    constructor(name: string, message: string, public status?: number) {
        super(message)

        this.name = name
    }
}

type CustomErrorConstructor = new (message: string, status?: number) => CustomError

const createCustomError = (name: string): CustomErrorConstructor => {
    return class extends CustomError {
        constructor(message: string, status?: number) {
            super(name, message, status)
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