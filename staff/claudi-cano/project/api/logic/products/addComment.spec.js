import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import addComment from './addComment'

debugger

describe('addComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    it('succeds for existing user', () => {
        const user = new User({ name: 'Claudi Cano', email: 'claudi@cano.com', username: 'ClauStark', password: '123123123' })
        const product = new Product({ author: user.id, image: 'https://www.image.com', text: 'Hello world' })

        return Promise.all([user.save(), product.save()])
            .then(([user, product]) =>
                addComment(user.id, product.id, 'Hello comment')
                    .then(() => Product.findOne())
                    .then(product => {
                        expect(product).to.exist
                        expect(product.comments).to.have.lengthOf(1)

                        const [comment] = product.comments
                        expect(comment.author.toString()).to.equal(user.id)
                        expect(comment.text).to.equal('Hello comment')
                        expect(comment.date).to.be.instanceOf(Date)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            addComment('', '', 'Hello world') //añadir de mongoose
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing product', () =>
        expect(
            User.create({ name: 'Claudi Cano', email: 'claudi@cano.com', username: 'ClauStark', password: '123123123' })
                .then(user =>
                    addComment(user.id, '', 'Hello world') // añadir de mongoose
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    after(() => db.disconnect())
})