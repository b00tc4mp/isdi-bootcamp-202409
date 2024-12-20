import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError } = errors

import removeComment from './removeComment.js'

describe('removeComment', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

  it('succeeds for existing user', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
    const comment = new Comment({ author: user.id, text: 'hello comment' })
    const product = new Product({ name: 'NameProduct1', image: 'https://www.image.com', description: 'Description of product 1', comments: [comment] })

    return Promise.all([user.save(), product.save()])
      .then(([user, product]) =>
        removeComment(user.id, product.id, product.comments[0].id)
          .then(() => Product.findOneAndDelete())
          .then(product => {
            expect(product).to.exist
            expect(product.comments).to.have.lengthOf(0)
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      removeComment('012345678901234567890123', '012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails on non-existing product', () =>
    expect(
      User.create({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
        .then(user =>
          removeComment(user.id, '012345678901234567890123', '012345678901234567890123')
        )
    ).to.be.rejectedWith(NotFoundError, /^product not found$/)
  )

  it('fails on non-existing comment', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
    const product = new Product({ name: 'NameProduct1', image: 'https://www.image.com', description: 'Description of product 1' })

    return expect(
      Promise.all([user.save(), product.save()])
        .then(([user, product]) =>
          removeComment(user.id, product.id, '012345678901234567890123')
        )
    ).to.be.rejectedWith(NotFoundError, /^comment not found$/)
  })

  it('fails on non-own comment', () => {
    const user1 = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
    const user2 = new User({ name: 'Coco Liso2', email: 'coco@liso2.com', username: 'cocoliso2', password: 'criscris' })
    const comment = new Comment({ author: user1.id, text: 'hello comment' })
    const product = new Product({ name: 'NameProduct1', image: 'https://www.image.com', description: 'Description of product 1', comments: [comment] })

    return expect(
      Promise.all([user1.save(), user2.save(), product.save()])
        .then(([user1, user2, product]) =>
          removeComment(user2.id, product.id, product.comments[0].id)
        )
    ).to.be.rejectedWith(OwnershipError, /^user not author of comment$/)
  })
  after(() => db.disconnect())
})