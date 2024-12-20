import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai
import bcrypt from 'bcryptjs'

import db, { User, Ad, Review } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getReviews from './getReviews.js'

describe('getReviews', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

  it('succeeds for existing user', async () => {
    const user = await User.create({
      name: 'Beren Jena',
      email: 'beren@jena.com',
      password: bcrypt.hashSync('123123123', 10),
      role: 'elder',
    })
    const user2 = await User.create({
      name: 'Manda Rina',
      email: 'manda@rina.com',
      password: bcrypt.hashSync('123123123', 10),
    })

    const review = await Review.create({
      author: user.id,
      comment: 'Manda me ha cuidado muy bien',
      calification: 4,
    })

    const review2 = await Review.create({
      author: user2.id,
      comment: 'Beren se ha portado muy bien',
      calification: 3,
    })

    const ad = await Ad.create({
      author: user.id,
      files: ['http://www.berenjena.com'],
      text: 'Necesito una persona que me cuide por la mañana',
      reviews: [review, review2],
    })

    const reviews = await getReviews(user.id, ad.id)

    expect(reviews).to.have.lengthOf(2)
    expect(reviews[0].id).to.equal(review.id)
    expect(reviews[0].author.id).to.equal(user._id.toString())
    expect(reviews[0].author.name).to.equal(user.name)
    expect(reviews[0].comment).to.equal('Manda me ha cuidado muy bien')

    expect(reviews[1].id).to.equal(review2.id)
    expect(reviews[1].author.id).to.equal(user2._id.toString())
    expect(reviews[1].author.name).to.equal(user2.name)
    expect(reviews[1].comment).to.equal('Beren se ha portado muy bien')
  })

  it('fails for non-existing user', async () => {
    await expect(getReviews('012345678901234567890123', '012345678901234567890123')).to.be.rejectedWith(
      NotFoundError,
      /^user not found$/
    )
  })

  after(() => db.disconnect())
})
