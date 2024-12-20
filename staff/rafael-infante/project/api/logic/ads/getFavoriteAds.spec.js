import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import bcrypt from 'bcryptjs'
import db, { User, Ad } from 'dat'
import { errors } from 'com'
import getFavoriteAds from './getFavoriteAds.js'

const { NotFoundError } = errors

describe('getFavoriteAds', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

  it('succeeds for existing user', () => {
    const user = new User({
      name: 'Zoila Comae',
      email: 'zoila@comae.com',
      password: bcrypt.hashSync('123123123', 10),
      role: 'caregiver',
    })
    const user2 = new User({
      name: 'Elber Dugo',
      email: 'Elber@dugo.com',
      password: bcrypt.hashSync('123123123', 10),
      role: 'elder',
    })
    const ad = new Ad({
      author: user2.id,
      files: ['http://www.image.com'],
      text: 'this is an Ad',
    })
    user.favorites[0] = ad._id

    return Promise.all([user.save(), user2.save(), ad.save()]).then(([user, user2, ad]) =>
      getFavoriteAds(user.id).then((ads) => {
        expect(ads).to.have.lengthOf(1)
        expect(ads[0].id).to.equal(ad.id.toString())
        expect(ads[0].author.id).to.equal(user2.id.toString())
        expect(ads[0].text).to.equal(ad.text)
        expect(user.favorites[0].toString()).to.equal(ads[0].id)
      })
    )
  })

  it('fails on non-existing user', () =>
    expect(getFavoriteAds('012345678901234567890123')).to.be.rejectedWith(NotFoundError, /^user not found$/))

  after(() => db.disconnect())
})
