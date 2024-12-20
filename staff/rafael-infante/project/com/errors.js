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
  DuplicityError: createCustomError('DuplicityError'),
  SystemError: createCustomError('SystemError'),
  CredentialsError: createCustomError('CredentialsError'),
  NotFoundError: createCustomError('NotFoundError'),
  OwnershipError: createCustomError('OwnershipError'),
  AuthorizationError: createCustomError('AuthorizationError')
}

export default errors