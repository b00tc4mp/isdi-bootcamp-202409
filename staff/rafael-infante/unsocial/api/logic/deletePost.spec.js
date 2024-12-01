import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai
import db, { User, Post } from "dat";
import { errors } from 'com'
const { NotFoundError, OwnershipError } = errors
import deletePost from "./deletePost.js";

describe('deleteComment', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('succeeds for existing user', () => {
    const user = new User({ name: 'Coco Loco', email: 'coco@liso.com', username: 'cocoloco', password: '123123123' })
    const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

    return Promise.all([user.save(), post.save()])
      .then(([user, post]) =>
        deletePost(user.id, post.id)
          .then(() => Post.findById(post.id))
          .then(deletedPost => {
            expect(deletedPost).to.be.null
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      deletePost('012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails on non-existing post', () => {
    const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })

    return expect(Promise.all([user.save()])
      .then(([user]) =>
        deletePost(user.id, '012345678901234567890123')
      )
    ).to.be.rejectedWith(NotFoundError, /^post not found$/)
  }
  )

  it('fails on not-own post', () => {
    const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
    const user2 = new User({ name: 'Coco Liso', email: 'coco@liso.com', username: 'cocoliso', password: '123123123' })
    const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

    return expect(Promise.all([user.save(), user2.save(), post.save()])
      .then(([user, user2, post]) =>
        deletePost(user2.id, post.id)
      )
    ).to.be.rejectedWith(OwnershipError, /^user is not author of post$/)
  }
  )

  after(() => db.disconnect())
})

