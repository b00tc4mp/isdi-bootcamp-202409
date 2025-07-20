import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product, Store } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors
import getStorePrices from './getStorePrices.js'

describe('getStorePrices', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany(), Store.deleteMany()]))

  it('succeeds on getting storePrice', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })

    const store1 = new Store({
      name: 'Store1',
      web: 'www.store1.com',
      locations: {
        address: 'Direccion 123',
        location: {
          type: 'Point',
          coordinates: [12.345, 1.2345]
        }
      }
    })

    const product = new Product({ name: 'name of product', image: 'https://www.image.com', description: 'description of the product', storePrices: [{ store: store1.id, price: 9 }] })

    return Promise.all([user.save(), store1.save(), product.save()])
      .then(([user, store1, product]) =>
        getStorePrices(user.id, product.id)
          .then(storePrices => {
            expect(storePrices).to.exist
            expect(storePrices).to.have.lengthOf(1)
            expect(storePrices[0].store.name).to.equal('Store1')
            expect(storePrices[0].store.web).to.equal(store1.web)
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      getStorePrices('012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails on non-existing product', () =>
    User.create({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
      .then(user =>
        expect(
          getStorePrices(user.id, '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^product not found$/)
      )
  )

  after(() => db.disconnect())
})
