class NotFoundError extends Error {
    constructor(message) {
        super(message)
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message)
    }
}

//const e = new NotFoundError('user not found')
const e = new ValidationError('name length not valid')

if (e instanceof NotFoundError)
    console.log('Something was not found.')
else if (e instanceof ValidationError)
    console.log('Sorry, validation is not passed.')
