import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError } = errors

import removeComment from './removeComment.js'

describe('removeComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()])
    })

    it('succeeds on removing a comment', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user => Post.create({ author: user.id, image: 'http://image.com', text: 'post text' })
                .then(() => Post.findOne({ author: user.id }))
                .then(post => Comment.create({ author: user.id, text: 'comment text' })
                    .then(() => Comment.findOne({ author: user.id }))
                    .then(comment =>
                        removeComment(user.id, post.id, comment.id)
                    )
                )
            )
    )

    it('fails on non-existing user', () => {
        Post.create({ author: '444444444444444444444444', image: 'http://image.com', text: 'post text' })
            .then(() => Post.findOne({ author: user.id }))
            .then(post => {
                Comment.create({ author: post.id, text: 'comment text' })
                    .then(() => Comment.findOne({ author: post.id }))
                    .then(comment => {
                        expect(
                            removeComment('012345678901234567890123', post.id, comment.id)
                        ).to.be.rejectedWith(NotFoundError, 'User not found')
                    })
            })
    })

    it('fails on non-existing post', () => {
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(post => {
                Comment.create({ author: user.id, text: 'comment text' })
                    .then(() => Comment.findOne({ author: post.id }))
                    .then(comment => {
                        expect(
                            removeComment(user.id, '012345678901234567890123', comment.id)
                        ).to.be.rejectedWith(NotFoundError, 'User not found')
                    })
            })
    })

    it('fails on non-existing comment', () => {
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user => {
                Post.create({ author: user.id, image: 'http://image.com', text: 'post text' })
                    .then(() => Post.findOne({ author: user.id }))
                    .then(post => {
                        expect(
                            removeComment(user.id, post.id, '012345678901234567890123')
                        ).to.be.rejectedWith(NotFoundError, 'Comment not found')
                    })
            })
    })

    it('fails on owner of the comment', () => {
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user => Post.create({ author: user.id, image: 'http://image.com', text: 'post text' })
                .then(() => Post.findOne({ author: user.id }))
                .then(post => {
                    Comment.create({ author: post.id, text: 'comment text' })
                        .then(() => Comment.findOne({ author: post.id }))
                        .then(comment => {
                            expect(
                                removeComment('012345678901234567890123', post.id, comment.id)
                            ).to.be.rejectedWith(OwnershipError, 'User is not author of comment')
                        })
                })
            )
    })

    after(() => db.disconnect())
})