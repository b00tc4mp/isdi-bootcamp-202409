import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import bcrypt from 'bcryptjs'
import db, { User, Ad } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getAds from './getAds.js'

describe('getAds', () => {
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
      author: user.id,
      files: 'http://www.image.com',
      text: 'this is an Ad',
      date: new Date(2024, 10, 19),
    })
    const ad2 = new Ad({
      author: user2.id,
      files: 'http://www.image2.com',
      text: 'this is another Ad',
      date: new Date(2024, 10, 20),
    })

    return Promise.all([user.save(), user2.save(), ad.save(), ad2.save()]).then(([user, user2, ad, ad2]) =>
      getAds(user.id).then((ads) => {
        //console.log(user, user2, ads)

        expect(ads[0].id).to.equal(ad2.id)
        expect(ads[0].author.id).to.equal(user2.id)
        expect(ads[0].author.name).to.equal(user2.name)
        expect(ads[0].files).to.equal(ad2.files)
        expect(ads[0].text).to.equal(ad2.text)
        expect(ads[0].date).to.deep.equal(ad2.date)

        expect(ads[1].id).to.equal(ad.id)
        expect(ads[1].author.id).to.equal(user.id)
        expect(ads[1].author.name).to.equal(user.name)
        expect(ads[1].files).to.equal(ad.files)
        expect(ads[1].text).to.equal(ad.text)
        expect(ads[1].date).to.deep.equal(ad.date)
      })
    )
  })

  it('fails on non-existing user', () =>
    expect(getAds('012345678901234567890123')).to.be.rejectedWith(NotFoundError, /^user not found$/))

  after(() => db.disconnect())
})
