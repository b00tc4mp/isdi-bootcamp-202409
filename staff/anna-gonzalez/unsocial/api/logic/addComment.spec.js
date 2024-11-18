import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import addComment from './addComment.js'

describe('addComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany(),
            Post.deleteMany(),
            Comment.deleteMany()])
    })

    it('succeeds on adding a comment', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user =>
                Post.create({ author: user.id, image: 'http://image.com', text: 'post text' })
                    .then(() => Post.findOne({ author: user.id })
                        .then(post =>
                            addComment(user.id, post.id, 'comment text')
                                .then(() => Comment.findOne({ author: user.id })
                                    .then(comment => {
                                        expect(comment).to.exist
                                        expect(comment.id.toString()).to.equal(user.id)
                                        expect(comment.text).to.equal('comment text')
                                        expect(comment.date).to.exist
                                    })
                                )
                        )
                    )
            )
    )

    it('fails on non-existing user', () => {
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user => Post.create({ author: user.id, image: 'http://image1.com', text: 'post' }))
                .then(post =>
                    addComment('012345678901234567890123', post.id, 'comment text')
                )
        ).to.be.rejectedWith(NotFoundError, 'User not found')
    })

    it('fails on non-existing post', () => {
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user =>
                    addComment(user.id, '012345678901234567890123', 'comment text')
                )
        ).to.be.rejectedWith(NotFoundError, 'Post not found')
    })

    after(() => db.disconnect())
})