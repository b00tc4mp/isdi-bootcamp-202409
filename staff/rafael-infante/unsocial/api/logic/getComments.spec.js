import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from "dat"
import { errors } from 'com'

const { NotFoundError } = errors

import getComments from "./getComments.js"

describe('getComments', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('succeeds for existing user', () => {
    const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
    const comment = new Comment({ author: user.id, text: 'this is cocoloco' })
    const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world', likes: [], comments: [comment] })

    return Promise.all([user.save(), post.save()])
      .then(([user, post]) =>
        getComments(user.id, post.id)
          .then(comments => {
            console.log(comment)
            expect(comments).to.have.lengthOf(1)
            expect(comments[0].author.id).to.equal(user.id)
            expect(comments[0].text).to.equal(comment.text)
            expect(comments[0].date).to.deep.equal(comment.date)
          })
      )
  })

  it('fails on non-existing user', () =>
    expect(
      getComments('012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  )

  it('fails on non-existing post', () =>
    User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
      .then(user =>
        expect(
          getComments(user.id, '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
      )
  )

  after(() => db.disconnect())
})

// db.connect('mongodb://localhost/unsocial-test')
//   .then(() => {
//     try {
//       return getComments('67352702c7fb739a4ddf586a', '6736094edeb9264dd0dafa35')
//         .then(console.log)
//         .catch(console.error)
//     } catch (error) {
//       console.error(error)
//     }
//   })
//   .catch(console.error)
//   .finally(() => db.disconnect())

