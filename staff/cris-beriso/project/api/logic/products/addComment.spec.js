import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import addComment from './addComment.js'

describe('addComment', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

  it('succeeds for existing user', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
    const product = new Product({ name: 'NameProduct1', image: 'https://www.image.com', description: 'Description of product 1' })

    return Promise.all([user.save(), product.save()])
      .then(([user, product]) =>
        addComment(user.id, product.id, 'hello comment')
          .then(() => Product.findOne())
          .then(product => {
            expect(product).to.exist
            expect(product.comments).to.have.lengthOf(1)

            const [comment] = product.comments
            expect(comment.author.toString()).to.equal(user.id)
            expect(comment.text).to.equal('hello comment')
            expect(comment.date).to.be.instanceOf(Date)
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      addComment('012345678901234567890123', '012345678901234567890123', 'hello world')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails on non-existing product', () =>
    expect(
      User.create({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
        .then(user =>
          addComment(user.id, '012345678901234567890123', 'hello world')
        )
    ).to.be.rejectedWith(NotFoundError, /^product not found$/)
  )

  after(() => db.disconnect())
})
