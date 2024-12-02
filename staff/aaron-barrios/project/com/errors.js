const createCustomError = name =>
    class extends Error {
        constructor(message) {
            super(message)

            this.name = name
        }

        //ponemos static porque el metodo pertenece a la clase
        //y el get para convertir el metodo en getter y asi acceder a el
        static get name() { return name }
    }

const errors = {
    ValidationError: createCustomError('ValidationError'),
    NotFoundError: createCustomError('NotFoundError'),
    DuplicityError: createCustomError('DuplicityError'),
    CredentialsError: createCustomError('CredentialsError'),
    SystemError: createCustomError('SystemError'),
    AuthorizationError: createCustomError('AuthorizationError')
}

export default errors