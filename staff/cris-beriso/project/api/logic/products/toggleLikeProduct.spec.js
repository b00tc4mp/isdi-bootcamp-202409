import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import toggleLikeProduct from './toggleLikeProduct.js'

describe('toggleLikeProduct', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() =>
    Promise.all([
      User.deleteMany(),
      Product.deleteMany()
    ])
  )

  it('succeeds on liking a product', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
    const product = new Product({ name: 'Name of product', image: 'https://www.image.com', description: 'description of product', likes: [] })

    return Promise.all([user.save(), product.save()])
      .then(([user, product]) =>
        toggleLikeProduct(user.id, product.id)
          .then(() => Product.findOne())
          .then(product => {
            expect(product.likes).to.have.lengthOf(1)
            expect(product.likes[0].toString()).to.equal(user.id)
          })
      )
  })

  it('succeeds on unliking a product', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
    const product = new Product({ name: 'Name of product', image: 'https://www.image.com', description: 'description of product', likes: [user.id] })

    return Promise.all([user.save(), product.save()])
      .then(([user, product]) => {
        toggleLikeProduct(user.id, product.id)
          .then(() => {
            expect(product.likes).to.have.lengthOf(0)
          })
      })
  })

  it('fails on non-existing user', () =>
    expect(
      toggleLikeProduct('012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails on non-existing product', () =>

    expect(
      User.create({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
        .then(user =>
          toggleLikeProduct(user.id, '012345678901234567890123')
        )
    ).to.be.rejectedWith(NotFoundError, /^product not found$/)
  )

  after(() => db.disconnect())
})