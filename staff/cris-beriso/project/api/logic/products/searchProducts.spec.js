import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import searchProducts from './searchProducts.js'

describe('searchProducts', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

  it('succeeds on finding by category', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
    const product1 = new Product({ name: 'NameProduct1', category: 'Rostro', image: 'https://www.image.com', description: 'Description of product 1' })


    return Promise.all([user.save(), product1.save()])
      .then(([user, product1]) =>
        searchProducts(user.id, 'Rostro')
          .then(product => {
            expect(product).to.have.lengthOf(1)
            expect(product[0].id).to.equal(product1.id)
            expect(product[0].name).to.equal(product1.name)
            expect(product[0].image).to.equal(product1.image)
            expect(product[0].description).to.equal(product1.description)
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      searchProducts('012345678901234567890123', 'Rostro')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  after(() => db.disconnect())
})