import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)

const { expect } = chai

import db, { User, Ad } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import createAd from './createAd.js'

describe('createAd', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

  it('succeeds for existing user', () =>
    User.create({
      name: 'Fede Rico',
      email: 'fede@rico.com',
      password: bcrypt.hashSync('123123123', 10),
    }).then((user) =>
      createAd(
        user.id,
        'https://gratisography.com/wp-content/uploads/2023/09/gratisography-duck-doctor-free-stock-photo-1170x780.jpg',
        'listo para dar mi servicio de cuidados!'
      ).then(() =>
        Ad.findOne().then((ad) => {
          expect(ad).to.exist
          expect(ad.author.toString()).to.equal(user.id)
          expect(ad.image).to.equal(
            'https://gratisography.com/wp-content/uploads/2023/09/gratisography-duck-doctor-free-stock-photo-1170x780.jpg'
          )
          expect(ad.text).to.equal('listo para dar mi servicio de cuidados!')
          expect(ad.date).to.be.instanceOf(Date)
        })
      )
    ))

  it('fails on non-existing user', () =>
    expect(
      createAd(
        '012345678901234567890123',
        'https://gratisography.com/wp-content/uploads/2023/09/gratisography-duck-doctor-free-stock-photo-1170x780.jpg',
        'testing create Ad'
      )
    ).to.be.rejectedWith(NotFoundError, /^user not found$/))

  it('fails on non-24-chars-length userId', () =>
    expect(() => createAd('01234', 'http://www.image.com', 'hello world')).to.throw(
      ValidationError,
      /^invalid userId length$/
    ))

  it('fails on non-string image', () =>
    expect(() => createAd('012345678901234567890123', undefined, 'hello world')).to.throw(
      ValidationError,
      /^invalid image$/
    ))

  it('fails on non-string text', () =>
    expect(() => createAd('012345678901234567890123', 'http://www.image.com', undefined)).to.throw(
      ValidationError,
      /^invalid text$/
    ))

  after(() => db.disconnect())
})
