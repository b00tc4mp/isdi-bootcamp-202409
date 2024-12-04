import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Ad } from 'dat'

import { errors } from 'com'
const { NotFoundError, OwnershipError } = errors
import deleteAd from './deleteAd.js'

describe('deleteAd', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

  it('succeeds for existing user', () => {
    const user = new User({ name: 'Spiderman', email: 'spider@man.com', password: bcrypt.hashSync('123123123', 10) })
    const ad = new Ad({ author: user.id, files: 'http://www.image.com', text: 'hello world' })

    return Promise.all([user.save(), ad.save()]).then(([user, ad]) => {
      deleteAd(user.id, ad.id)
        .then(() => Ad.findById(ad.id))
        .then((deletedAd) => {
          expect(deletedAd).to.be.null
        })
    })
  })

  it('fails on non-existing user', () =>
    expect(deleteAd('674f04a16b8fd82812110b8f', '674f04a16b8fd82812110b8f')).to.be.rejectedWith(
      NotFoundError,
      /^user not found$/
    ))

  it('fails on non-existing ad', () => {
    const user = new User({ name: 'Spiderman', email: 'spider@man.com', password: bcrypt.hashSync('123123123', 10) })

    return expect(
      Promise.all([user.save()]).then(([user]) => deleteAd(user.id, '012345678901234567890123'))
    ).to.be.rejectedWith(NotFoundError, /^ad not found$/)
  })

  after(() => db.disconnect())
})

//await db.connect(process.env.MONGO_URL_TEST)
// try {
//   await deleteAd('674ddc9c63c2125637d88dce', '674df96ea54000b5c6934c21')
//   console.log('Post deleted')
// } catch (error) {
//   console.error(error)
// } finally {
//   await db.disconnect()
// }
