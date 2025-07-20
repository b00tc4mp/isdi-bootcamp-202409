import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import saveProduct from './saveProduct.js'

describe('saveProduct', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() =>
    Promise.all([
      User.deleteMany(),
      Product.deleteMany()
    ])
  )

  it('succeeds on saving a product', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris', wishlist: [] })
    const product = new Product({ name: 'Name of Product', image: 'https://www.image.com', description: 'description of product' })

    return Promise.all([user.save(), product.save()])
      .then(([user, product]) =>
        saveProduct(user.id, product.id)
          .then(() => User.findOne())
          .then(user => {
            expect(user.wishlist).to.have.lengthOf(1)
            expect(user.wishlist[0].toString()).to.equal(product.id)
          })
      )
  })

  it('succeeds on unsaving a product', () => {
    const product = new Product({ name: 'Name of Product', image: 'https://www.image.com', description: 'description of product' })
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris', wishlist: [product.id] })

    return Promise.all([user.save(), product.save()])
      .then(([user, product]) => {
        saveProduct(user.id, product.id)
          .then(() => {
            expect(user.wishlist).to.have.lengthOf(0)
          })
      })
  })

  it('fails on non-existing user', () =>
    expect(
      saveProduct('012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails on non-existing product', () =>
    expect(
      User.create({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
        .then(user =>
          saveProduct(user.id, '012345678901234567890123')
        )
    ).to.be.rejectedWith(NotFoundError, /^product not found$/)
  )

  after(() => db.disconnect())
})