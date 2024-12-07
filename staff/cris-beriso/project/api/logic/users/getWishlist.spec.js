import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getWishlist from './getWishlist.js'

describe('getWishlist', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

  it('succeeds for existing user', () => {
    const product1 = new Product({ name: 'NameProduct1', image: 'https://www.image.com', description: 'Description of product 1' })
    const product2 = new Product({ name: 'NameProduct2', image: 'https://www.image.com/2', description: 'Description of product 2' })
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris', wishlist: [product1.id, product2.id] })

    return Promise.all([user.save(), product1.save(), product2.save()])
      .then(([user, product1, product2]) =>
        getWishlist(user.id)
          .then(wishlist => {
            expect(wishlist).to.exist
            expect(wishlist).to.have.lengthOf(2)

            expect(wishlist[0].name).to.equal(product1.name)
            expect(wishlist[0].image).to.equal(product1.image)
            expect(wishlist[0].description).to.equal(product1.description)

            expect(wishlist[1].name).to.equal(product2.name)
            expect(wishlist[1].image).to.equal(product2.image)
            expect(wishlist[1].description).to.equal(product2.description)
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      getWishlist('012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  // it('fails on non-existing product', () =>
  //   User.create({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris', wishlist: ['012345678901234567890123'] })
  //     .then(user =>
  //       expect(
  //         getWishlist(user.id)
  //       ).to.be.rejectedWith(NotFoundError, /^product not found$/)
  //     )
  // )

  after(() => db.disconnect())
})