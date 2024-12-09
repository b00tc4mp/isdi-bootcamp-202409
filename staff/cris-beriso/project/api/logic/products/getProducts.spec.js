import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getProducts from './getProducts.js'

describe('getProducts', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

  it('succeeds for existing user', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
    const product1 = new Product({ name: 'NameProduct1', image: 'https://www.image.com', description: 'Description of product 1' })
    const product2 = new Product({ name: 'NameProduct2', image: 'https://www.image.com/2', description: 'Description of product 2' })

    return Promise.all([user.save(), product1.save(), product2.save()])
      .then(([user, product1, product2]) =>
        getProducts(user.id)
          .then(products => {
            expect(products).to.have.lengthOf(2)
            expect(products[0].id).to.equal(product1.id)
            expect(products[0].name).to.equal(product1.name)
            expect(products[0].image).to.equal(product1.image)
            expect(products[0].description).to.equal(product1.description)

            expect(products[1].id).to.equal(product2.id)
            expect(products[1].name).to.equal(product2.name)
            expect(products[1].image).to.equal(product2.image)
            expect(products[1].description).to.equal(product2.description)
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      getProducts('012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  after(() => db.disconnect())
})