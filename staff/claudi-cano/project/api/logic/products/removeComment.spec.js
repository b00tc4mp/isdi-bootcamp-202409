import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError, ValidationError, SystemError } = errors

import removeComment from './removeComment.js'

debugger

describe('removeComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Claudi Cano', email: 'claudi@cano.com', username: 'ClauStark', password: '123123123' })
        const comment = new Comment({ author: user.id, text: 'Hello comment' })
        const product = new Product({ author: user.id, image: 'https://www.image.com', text: 'Hello world', comments: [comment] })

        return Promise.all([user.save(), product.save()])
            .then(([user, product]) =>
                removeComment(user.id, product.id, product.comments[0].id)
                    .then(() => Product.findOne())
                    .then(product => {
                        expect(product).to.exist
                        expect(product.comments).to.have.lengthOf(0)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            removeComment('', '', '')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing product', () =>
        expect(
            User.create({ name: 'Claudi Cano', email: 'claudi@cano.com', username: 'ClauStark', password: '123123123' })
                .then(user =>
                    removeComment(user.id, '', '') // datos de mongoose
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    it('fails on non-existing comment', () => {
        const user = new User({ name: 'Claudi Cano', email: 'claudi@cano.com', username: 'ClauStark', password: '123123123' })
        const product = new Product({ author: user.id, image: 'https://www.image.com', text: 'Hello world' })

        return expect(
            Promise.all([user.save(), product.save()])
                .then(([user, product]) =>
                    removeComment(user.id, product.id, '') // datos del mongoose
                )
        ).to.be.rejectedWith(NotFoundError, /^comment not found$/)
    })

    it('fails on non-own comment', () => {
        const user = new User({ name: 'Claudi Cano', email: 'claudi@cano.com', username: 'ClauStark', password: '123123123' })
        const user2 = new User({ name: 'Claudi Cano 2', email: 'claudi@cano2.com', username: 'ClauStark2', password: '123123123' })
        const comment = new Comment({ author: user.id, text: 'Hello comment' })
        const product = new Product({ author: user.id, image: 'https://www.image.com', text: 'Hello world', comments: [comment] })

        return expect(
            Promise.all([user.save(), user2.save(), product.save()])
                .then(([user, user2, product]) =>
                    removeComment(user2.id, product.id, product.comments[0].id)
                )
        ).to.be.rejectedWith(OwnershipError, /^user not author of comment$/)
    })

    after(() => db.disconnect())
})