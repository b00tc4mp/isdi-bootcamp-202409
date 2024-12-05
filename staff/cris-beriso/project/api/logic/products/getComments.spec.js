import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getComments from './getComments.js'

describe('getComments', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

  it('succeeds on gettin the comments', () => {
    const user = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
    const comment1 = new Comment({ author: user.id, text: 'text of comment1' })
    const comment2 = new Comment({ author: user.id, text: 'text of comment2' })
    const product = new Product({ name: 'name of product', image: 'https://www.image.com', description: 'description of the product', comments: [comment1, comment2] })

    return Promise.all([user.save(), product.save()])
      .then(([user, product]) =>
        getComments(user.id, product.id)
          .then(comments => {
            expect(comments).to.exist
            expect(comments).to.have.lengthOf(2)

            expect(comments[0].id).to.equal(comment1.id)
            expect(comments[0].author.id).to.equal(user.id)
            expect(comments[0].author.username).to.equal(user.username)
            expect(comments[0].text).to.equal(comment1.text)
            expect(comments[0].date).to.be.instanceOf(Date)

            expect(comments[1].id).to.equal(comment2.id)
            expect(comments[1].author.id).to.equal(user.id)
            expect(comments[1].author.username).to.equal(user.username)
            expect(comments[1].text).to.equal(comment2.text)
            expect(comments[1].date).to.be.instanceOf(Date)
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      getComments('012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails on non-existing product', () =>
    User.create({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: 'criscris' })
      .then(user =>
        expect(
          getComments(user.id, '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^product not found$/)
      )
  )

  after(() => db.disconnect())
})