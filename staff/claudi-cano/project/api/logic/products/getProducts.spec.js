import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getProducts from './getProducts.js'

debugger

describe('getProducts', () => {
    before(() => db.connect(process.env.MONGO_UTL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Claudi Cano', email: 'claudi@cano.com', username: 'ClauStark', password: '123123123' })
        const product = new Product({ author: user.id, image: 'https://www.image.com', text: 'Hello world', date: new Date(2024, 10, 18) })
        const product2 = new Product({ author: user.id, image: 'https://www.image.com/2', text: 'Hello world 2', date: new Date(2024, 10, 19) })

        return Promise.all([user.save(), product.save(), product2.save()])
            .then(([user, product, product2]) =>
                getProducts(user.id)
                    .then(products => {
                        expect(products[0].id).to.equal(product2.id)
                        expect(products[0].author.id).to.equal(user.id)
                        expect(products[0].author.username).to.equal(user.username)
                        expect(products[0].image).to.equal(product2.image)
                        expect(products[0].text).to.equal(product2.text)
                        expect(products[0].date).to.deep.equal(product2.date)

                        expect(products[1].id).to.equal(product.id)
                        expect(products[1].author.id).to.equal(user.id)
                        expect(products[1].author.username).to.equal(user.username)
                        expect(products[1].image).to.equal(product.image)
                        expect(products[1].text).to.equal(product.text)
                        expect(products[1].date).to.deep.equal(product.date)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            getProducts('')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    after(() => db.disconnect())
})