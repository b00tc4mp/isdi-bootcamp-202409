import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

const { expect } = chai

import db, { User, Post } from "dat"
import { errors } from 'com'

const { NotFoundError } = errors

import createPost from "./createPost.js"

describe('createPost', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([
    User.deleteMany(),
    Post.deleteMany()
  ]))

  it('succeeds on new post', () =>
    User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
      .then(user =>
        createPost(user.id, 'https://gratisography.com/wp-content/uploads/2023/09/gratisography-duck-doctor-free-stock-photo-1170x780.jpg', 'esto es PATOdalavida')
          .then(() => Post.findOne({ author: user.id })

            .then(post => {

              console.log("Post creado: ", post)
              expect(post).to.exist
              expect(post.author).to.be.a.string
              expect(post.author.toString()).to.have.lengthOf(24)
              expect(post.image).to.be.a.string
              expect(post.text).to.be.a.string
            })
          )
      )
  )


  it('fails on non-existing user', () =>
    expect(
      createPost('012345678901234567891234', 'https://gratisography.com/wp-content/uploads/2023/09/gratisography-duck-doctor-free-stock-photo-1170x780.jpg', 'patodalavida')
    ).to.be.rejectedWith(NotFoundError, 'user not found'))

  after(() => db.disconnect())
})