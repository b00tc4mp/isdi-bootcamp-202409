import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from "dat"
import { errors } from 'com'

const { NotFoundError } = errors
import toggleLikePost from "./toggleLikePost.js"


describe('toggleLikePost', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('succeeds for existing user', () => {
    const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
    const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

    return Promise.all([user.save(), post.save()])
      .then(([user, post]) =>
        toggleLikePost(user.id, post.id)
          .then(() => Post.findById(post.id))
          .then(post => {
            expect(post).to.exist
            expect(post.likes).to.have.lengthOf(1)
            expect(post.likes[0].toString()).to.equal(user.id)
          })
      )
  })

  it('fails for non-existing user', () =>
    expect(
      toggleLikePost('012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails for non-existing post', () =>
    expect(
      User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        .then(user =>
          toggleLikePost(user.id, '012345678901234567890123')
        )
    ).to.be.rejectedWith(NotFoundError, /^post not found$/)
  )

  after(() => db.disconnect())
})