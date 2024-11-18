//Error para identificar que es del sistema, normalmente se utiliza en el primer error de mongo...
class SystemError extends Error {
    constructor(message) {
        super(message)
    }
}


//Error cuando no se encuentra el post o user o comment que estás buscando
class NotFoundError extends Error {
    constructor(message) {
        super(message)
    }
}

//Error para verificar que el usuario no está repetido, se utiliza en register
class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }
}

//Error cuando estás ingresando mal los datos de ingreso 
class CredentialsError extends Error {
    constructor(message) {
        super(message)
    }
}

//Error cuando no es tu post o tu comment
class OwnershipError extends Error {
    constructor(message) {
        super(message)
    }
}

//Error de validate
class ValidationError extends Error {
    constructor(message) {
        super(message)
    }
}
class AuthorizationError extends Error {
    constructor(message) {
        super(message)
    }
}

const errors = {
    ValidationError,
    NotFoundError,
    DuplicityError,
    CredentialsError,
    SystemError,
    OwnershipError,
    AuthorizationError
}
export default errors