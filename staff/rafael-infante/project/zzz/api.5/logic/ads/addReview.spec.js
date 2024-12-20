import 'dotenv/config'
import bcrypt from 'bcryptjs'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Ad } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import addReview from './addReview.js'

describe('addReview', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

  it('succeeds for existing user', () => {
    const user = new User({
      name: 'Don Ramon',
      email: 'don@ramon.com',
      password: bcrypt.hashSync('123123123', 10),
      role: 'elder',
    })
    const user2 = new User({
      name: 'Madre Teresa',
      email: 'madre@teresa.com',
      password: bcrypt.hashSync('123123123', 10),
      role: 'caregiver',
    })
    const ad = new Ad({
      author: user2._id,
      files: ['http://www.madreteresa.com'],
      text: 'soy madre teresa y cuido personas',
    })

    return Promise.all([user.save(), user2.save(), ad.save()]).then(([user, user2, ad]) =>
      addReview(user.id, ad.id, 'excelente cuidadora', 5)
        .then(() => Ad.findOne())
        .then((ad) => {
          expect(ad).to.exist
          expect(ad.reviews).to.have.lengthOf(1)

          const [review] = ad.reviews
          expect(review.author.toString()).to.equal(user.id)
          expect(review.comment).to.equal('excelente cuidadora')
          expect(review.date).to.be.instanceOf(Date)
          expect(review.calification).to.equal(5)
        })
    )
  })

  it('fails on non-existing user', () =>
    expect(addReview('012345678901234567890123', '012345678901234567890123', 'hello', 3)).to.be.rejectedWith(
      NotFoundError,
      /^user not found$/
    ))

  it('fails on non-existing ad', () =>
    expect(
      User.create({
        name: 'Don Ramon',
        email: 'don@ramon.com',
        password: bcrypt.hashSync('123123123', 10),
        role: 'elder',
      }).then((user) => addReview(user.id, '012345678901234567890123', 'hello', 4))
    ).to.be.rejectedWith(NotFoundError, /^ad not found$/))

  after(() => db.disconnect())
})

// db.connect(process.env.MONGO_URL_TEST)
//   .then(() => {
//     try {
//       return addReview(
//         '6751624f73d8041e9a318435',
//         '67508d8f146c0e8669020ca6',
//         'me ha gustado la experiencia, volveria a utilizar su servicio',
//         5
//       )
//         .then(console.log('review added'))
//         .catch(console.error)
//     } catch (error) {
//       console.error(error)
//     }
//   })
//   .catch(console.error)
//   .finally(() => db.disconnect())
