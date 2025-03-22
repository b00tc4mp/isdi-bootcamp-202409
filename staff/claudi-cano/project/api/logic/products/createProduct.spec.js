import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidatinError, SystemError } = errors

import createProduct from './createProduct.js'

debugger

describe('createProduct', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    it('succeeds for existing user', () =>
        User.create({ name: 'Claudi Cano', email: 'claudi@cano.com', username: 'ClauStark', password: '123123123' })
            .then(user =>
                createProduct(user.id, 'https://www.image.com', 'Hello world')
                    .then(() => Product.findOne())
                    .then(product => {
                        expect(product).to.exist
                        expect(product.author.toString()).to.equal(user.id)
                        expect(product.image).to.equal('https://www.image.com')
                        expect(product.text).to.equal('Hello world')
                        expect(product.date).to.be.instanceOf(Date)
                    })
            )
    )

    it('fails on non-existing user', () =>
        expect(
            createProduct('', 'https://www.image.com', 'Hello world') // añadir datos de mongoose
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    // it('fails on non-string user-id', () => {
    //     let expectedError

    //     try {
    //         createProduct(true, 'https://www.image.com', 'hello world')
    //     } catch (error) {
    //         expectedError = error
    //     } finally {
    //         expect(expectedError).to.be.instanceOf(ValidationError)
    //         expect(expectedError.message).to.equal('invalid userId')
    //     }
    // })

    it('fails on non-string user-id', () =>
        expect(() => createProduct(true, 'https://www.image.com', 'Hello world')).to.throw(ValidatinError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => createProduct('', 'https://www.image.com', 'Hello world')).to.throw(ValidatinError, /^invalid userId length$/)
    )

    it('fails on non-string image', () =>
        expect(() => createProduct('', true, 'hello world')).to.throw(ValidatinError, /^invalid image$/)
    )

    it('fails on non-string text', () =>
        expect(() => createProduct('', 'https://www.image.com', true)).to.throw(ValidatinError, /^invalid text$/)
    )

    describe('fails on User.findById error', () => {
        let findById

        beforeEach(() => {
            findById = User.findById

            User.findById = () => Promise.reject(new Error('system error on User.findById'))
        })

        it('fails on User.findById error', () =>
            expect(
                createProduct('', 'https://www.image.com', 'hello world')
            ).to.be.rejectedWith(SystemError, /^system error on User.findById$/)
        )

        afterEach(() => User.findById = findById)
    })

    describe('fails on Product.create', () => {
        let create

        beforeEach(() => {
            create = Product.create

            Product.create = () => Promise.reject(new Error('system error on Product.create'))
        })

        it('fails on Product.create error', () =>
            expect(
                User.create({ name: 'Claudi Cano', email: 'claudi@cano.com', username: 'ClauStark', password: '123123123' })
                    .then(user =>
                        createProduct(user.id, 'https://www.image.com', 'Hello world')
                    )
            ).to.be.rejectedWith(SystemError, /^system error on Post.create$/)
        )

        afterEach(() => Product.create = create)
    })

    after(() => db.disconnect())
})