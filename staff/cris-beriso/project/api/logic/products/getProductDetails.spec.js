import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getProductDetails from './getProductDetails.js'

describe('getProuctDetails', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany]))

  it('succeeds on getting de product', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
    const product1 = new Product({ name: 'name of product', image: 'https://www.image.com', description: 'description of the product' })

    return Promise.all([user.save(), product1.save()])
      .then(([user, product1]) =>
        getProductDetails(user.id, product1.id)
          .then(product => {
            expect(product).to.exist
            expect(product.id).to.equal(product1.id)
            expect(product.name).to.equal(product1.name)
            expect(product.description).to.equal(product1.description)
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      getProductDetails('012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails on non-existing product', () =>
    User.create({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
      .then(user =>
        expect(
          getProductDetails(user.id, '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^product not found$/)
      )
  )

  after(() => db.disconnect())
})