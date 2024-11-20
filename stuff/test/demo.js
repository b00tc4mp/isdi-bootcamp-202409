function describe(description, callback) {
    console.log(description)

    callback()
}

function it(description, callback) {
    console.log('TEST', description)

    try {
        callback()
    } catch (error) {
        console.error('KO', error.message)
    }
}

function expect(value) {
    return {
        get to() {
            return {
                equal(expectedValue) {
                    if (value === expectedValue)
                        console.log('OK')
                    else
                        throw new Error(`expect ${expectedValue} is to equal ${value}`)
                }
            }
        }
    }
}

// demo

describe('getPosts', () => {
    console.log('...')

    describe('when user whatever', () => {
        console.log('...')
    })

    it('succeeds on same number', () => {
        console.log('...')

        expect(1).to.equal(2)
    })
})