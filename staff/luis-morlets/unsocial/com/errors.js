class ValidationError extends Error {
    constructor(message) {
        super(message)
    }
}

class SystemError extends Error {
    constructor(message) {
        super(message)
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message)
    }
}

class CredentialsError extends Error {
    constructor(message) {
        super(message)
    }
}

class OwnershipError extends Error {
    constructor(message) {
        super(message)
    }
}

class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }
}

const errors = {
    ValidationError,
    SystemError,
    NotFoundError,
    CredentialsError,
    OwnershipError,
    DuplicityError
}

export default errors