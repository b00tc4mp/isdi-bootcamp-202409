import { errors } from 'com'

const { ValidationError, NotFoundError, CredentialsError, DuplicityError, OwnershipError, SystemError } = errors

export default (error, req, res, next) => {
  let status = 500

  switch (true) {
    case (error instanceof ValidationError):
      status = 406
      break
    case (error instanceof NotFoundError):
      status = 404
      break
    case (error instanceof CredentialsError):
      status = 401
      break
    case (error instanceof DuplicityError):
      status = 409
      break
    case (error instanceof OwnershipError):
      status = 403
      break
  }

  res.status(status).json({ error: status === 500 ? SystemError.name : error.constructor.name, message: error.message })

  console.error(error)
}