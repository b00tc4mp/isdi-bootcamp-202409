import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Ad } from 'dat/index.js'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import toggleFavoriteAd from './toggleFavoriteAd.js'

describe('toggleFavoriteAd', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

  it('add favorite on existing user and ad', async () => {
    const user = await User.create({
      name: 'Super Man',
      email: 'super@man.com',
      password: '123123123',
    })
    const ad = await Ad.create({
      author: user.id,
      files: ['http://www.image.com'],
      text: 'prueba toggle fav',
    })

    await toggleFavoriteAd(user._id.toString(), ad._id.toString())

    const updatedUser = await User.findById(user._id.toString()).lean()

    expect(updatedUser.favorites).to.have.lengthOf(1)
    expect(updatedUser.favorites[0].toString()).to.equal(ad._id.toString())
  })

  it('fails on non-existing ad', async () => {
    const user = await User.create({
      name: 'Super Man',
      email: 'super@man.com',
      password: '123123123',
    })

    await expect(toggleFavoriteAd(user._id.toString(), '012345678901234567890123')).to.be.rejectedWith(
      NotFoundError,
      /^ad not found$/
    )
  })

  it('fails on non-existing user', async () => {
    await expect(toggleFavoriteAd('012345678901234567890123', '012345678901234567890123')).to.be.rejectedWith(
      NotFoundError,
      /^user not found$/
    )
  })

  after(() => db.disconnect())
})
