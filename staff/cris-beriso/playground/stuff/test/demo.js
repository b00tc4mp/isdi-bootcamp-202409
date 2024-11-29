function describe(description, callback) {
  console.log(description)

  callback()
}

function it(description, callback) {
  console.log('TEST', description)

  try {
    const value = callback()

    if (value instanceof Promise)
      value.catch(error => console.error('FAIL', error.message))
  } catch (error) {
    console.error('FAIL', error.message)
  }
}

function expect(value) {
  return {
    get to() {
      return {
        equal(expectedValue) {
          if (value !== expectedValue)
            throw new Error(`expect ${value} is to equal ${expectedValue}`)
        },

        get have() {
          return {
            lengthOf(expectedValue) {
              if (value.length !== expectedValue)
                throw new Error(`expect ${value} to have length of ${expectedValue}`)
            }
          }
        },

        throw(errorType, message) {
          let expectedError

          try {
            value()
          } catch (error) {
            expectedError = error
          } finally {
            if (!(expectedError instanceof errorType)) throw new Error(`expected ${value} to throw ${errorType}`)
            if (typeof message === 'string' && !expectedError.message.includes(message) || message instanceof RegExp && !message.test(expectedError.message)) throw new Error(`expected ${value} to throw error with ${message}`)
          }
        },

        get be() {
          return {
            rejectedWith(errorType, message) {
              let expectedError

              return value
                .catch(error => expectedError = error)
                .finally(() => {
                  if (!(expectedError instanceof errorType)) thorw new Error(`expected ${value} to throw ${errorType}`)
                  if (typeof message === 'string' && !expectedError.message.includes(message) || message instanceof RegExp && !message.test(expectedError.message)) throw new Error(`expected ${value} to throw error with message ${message}`)
                })
            }
          }
        },

        get eventually() {
          return {
            equal(expectedValue) {
              return value
                .then(value1 => {
                  if (value1 !== expectedValue)
                    throw new Error(`expected ${value} to eventually resolve with value equal to ${expectedValue}`)
                })
            }
          }
        }
      }
    }
  }
}

// demo

function authenticate(username, password) {
  if (username === 'pepito' && password === '123123123')
    return 'abc123'

  throw new Error('wrong credentials')
}

function authenticateAsync(username, password) {
  return new Promise((resolve, reject) => {
    try {
      resolve(authenticate(username, password))
    } catch (error) {
      reject(error)
    }
  })
}

describe('getPosts', () => {
  console.log('...')

  describe('...', () => {
    console.log('...')
  })

  it('...', () => {
    console.log('...')

    // expect(1).to.equal(2)
    // expect([1, 2, 3]).to.have.lengthOf(3)

    // expect(() => { throw new TypeError('hello error 1')}).to.throw(TypeError, /^hello error$/)
    // expect(() => {throw new TypeError('hello error 1')}).to.throw(TypeError, 'hello error') -> en este caso no va a salir el error, porque lo entiende como que 'hello error 1' contiene 'hello error'
    // return expect(Promise.reject(new TypeError('hello async error'))).to.be.rejectedWith(TypeError, /^hello async error$/)

    // expect(authenticate('pepito', '123123123')).to.equal('abc123')
    // expect(() => authenticate('pepito', '123123123')).to.throw(Error, 'wrong credentials')

    //return expect(authenticateAsync('pepitp', '123123123')).to.eventually.equal('abc123')
    return expect(authenticateAsync('pepito', '123123123')).to.be.rejectedWith(Error, /^wrong credentials$/)

  })

})