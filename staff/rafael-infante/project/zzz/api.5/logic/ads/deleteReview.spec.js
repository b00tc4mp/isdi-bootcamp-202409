import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Ad, Review } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError, ValidationError, SystemError } = errors

import deleteReview from './deleteReview.js'

describe('deleteReview', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

  it('succeeds for existing user', () => {
    const user = new User({
      name: 'Spiderman',
      email: 'spider@man.com',
      password: bcrypt.hashSync('123123123', 10),
    })
    const user2 = new User({
      name: 'Gatubela',
      email: 'gatu@bela.com',
      password: bcrypt.hashSync('123123123', 10),
    })
    const review = new Review({
      author: user.id,
      comment: 'I enjoyed it so much',
      calification: 5,
    })
    const review2 = new Review({
      author: user.id,
      comment: 'I enjoyed it so much 2',
      calification: 4,
    })
    const ad = new Ad({
      author: user2.id,
      files: ['http://www.gatubela.com'],
      text: 'hello world',
      reviews: [review, review2],
    })

    return Promise.all([user.save(), user2.save(), ad.save()]).then(([user, user2, ad]) =>
      deleteReview(user.id, ad.id, ad.reviews[0].id)
        .then(() => Ad.findOne())
        .then((ad) => {
          expect(ad).to.exist
          expect(ad.reviews).to.have.lengthOf(1)
        })
    )
  })

  it('fails on non-existing user', () =>
    expect(
      deleteReview('012345678901234567890123', '012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/))

  it('fails on non-existing ad', () =>
    expect(
      User.create({
        name: 'Spiderman',
        email: 'spider@man.com',
        password: bcrypt.hashSync('123123123', 10),
      }).then((user) => deleteReview(user.id, '012345678901234567890123', '012345678901234567890123'))
    ).to.be.rejectedWith(NotFoundError, /^ad not found$/))

  it('fails on non-existing review', () => {
    const user = new User({
      name: 'Spiderman',
      email: 'spider@man.com',
      password: bcrypt.hashSync('123123123', 10),
    })
    const ad = new Ad({
      author: user.id,
      files: ['http://www.gatubela.com'],
      text: 'hello world',
    })

    return expect(
      Promise.all([user.save(), ad.save()]).then(([user, ad]) =>
        deleteReview(user.id, ad.id, '012345678901234567890123')
      )
    ).to.be.rejectedWith(NotFoundError, /^review not found$/)
  })

  it('fails on not-owner of review', () => {
    const user = new User({
      name: 'Spiderman',
      email: 'spider@man.com',
      password: bcrypt.hashSync('123123123', 10),
    })
    const user2 = new User({
      name: 'Gatubela',
      email: 'gatu@bela.com',
      password: bcrypt.hashSync('123123123', 10),
    })
    const review = new Review({
      author: user.id,
      comment: 'I enjoyed it so much',
      calification: 5,
    })
    const ad = new Ad({
      author: user2.id,
      files: ['http://www.gatubela.com'],
      text: 'hello world',
      reviews: [review],
    })

    return expect(
      Promise.all([user.save(), user2.save(), ad.save()]).then(([user, user2, ad]) =>
        deleteReview(user2.id, ad.id, ad.reviews[0].id)
      )
    ).to.be.rejectedWith(OwnershipError, /^user is not author of review$/)
  })

  after(() => db.disconnect())
})
