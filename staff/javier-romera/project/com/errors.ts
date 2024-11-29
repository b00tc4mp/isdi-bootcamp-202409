class CustomError extends Error {
    constructor(message: string, public status?: number) {
        super(message)
        // console.dir(this.name) // FRANK AQUI ES LA VAINA ==> CLASS ANONIMAAAAAAAA
    }
}

type CustomErrorConstructor = new (message: string, status?: number) => CustomError

const createCustomError = (name: string): CustomErrorConstructor => {
    return class extends CustomError {
        constructor(message: string, status?: number) {
            super(message, status)

            this.name = name
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