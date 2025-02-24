class ValidationError extends Error {
    constructor(message: string, public code?: number) {
        super(message)

    }
}

class SystemError extends Error {
    constructor(message: string, public code?: number) {
        super(message)

    }
}

class NotFoundError extends Error {
    constructor(message: string, public code?: number) {
        super(message)

    }
}

class CredentialsError extends Error {
    constructor(message: string, public code?: number) {
        super(message)

    }
}

class OwnershipError extends Error {
    constructor(message: string, public code?: number) {
        super(message)

    }
}

class DuplicityError extends Error {
    constructor(message: string, public code?: number) {
        super(message)

    }
}

class AuthorizationError extends Error {
    constructor(message: string, public code?: number) {
        super(message)

    }
}

class HostError extends Error {
    constructor(message: string, public code?: number) {
        super(message)

    }
}


const errors = {
    ValidationError,
    SystemError,
    NotFoundError,
    CredentialsError,
    OwnershipError,
    DuplicityError,
    AuthorizationError,
    HostError,
}

export default errors