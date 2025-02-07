import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from "dat"
import { errors } from 'com'

const { NotFoundError } = errors
import addComment from "./addComment.js"

describe('addComment', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('suceeds for existing user', () => {
    const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
    const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

    return Promise.all([user.save(), post.save()])
      .then(([user, post]) =>
        addComment(post.id, 'hello comment', user.id)
          .then(() => Post.findOne())
          .then(post => {
            expect(post).to.exist
            expect(post.comments).to.have.lengthOf(1)

            const [comment] = post.comments
            expect(comment.author.toString()).to.equal(user.id)
            expect(comment.text).to.equal('hello comment')
            expect(comment.date).to.be.instanceOf(Date)
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      addComment('012345678901234567890123', 'hello world', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails on non-exixting post', () =>
    expect(
      User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        .then(user =>
          addComment('012345678901234567890123', 'hello world', user.id)
        )
    ).to.be.rejectedWith(NotFoundError, /^post not found$/)
  )

  after(() => db.disconnect())

})

// db.connect('mongodb://127.0.0.1:27017/unsocial-test')
//   .then(() => {
//     try {
//       return addComment('6736094edeb9264dd0dafa35', 'prueba3', '672e37081977fd9ccd6b5200')
//         .then(() => console.log('comment added'))
//         .catch(console.error)
//     } catch (error) {
//       console.error(error)
//     }
//   })
//   .catch(console.error)
//   .finally(() => db.disconnect())

