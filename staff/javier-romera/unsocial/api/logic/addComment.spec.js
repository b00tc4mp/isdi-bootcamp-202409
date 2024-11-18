import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'apu'

const { NotFoundError } = errors

import addComment from './addComment.js'

describe('addComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany(),
            Post.deleteMany(),
            Comment.deleteMany()
        ])
    })

    it('succeeds on adding a comment', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user => Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                .then(post =>
                    addComment(user.id, post.id, 'comment text')
                        .then(() => Post.findById(post.id)
                            .then(post => {
                                const { comments } = post
                                expect(comments[0]).to.exist
                                expect(comments[0].author.toString()).to.equal(user.id)
                                expect(comments[0].text).to.equal('comment text')
                                expect(comments[0].date).to.exist
                                expect(comments[0].id).to.have.lengthOf(24)
                            }))
                )
            )
    )

    it('fails on non-existing user', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user => Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' }))
                .then(post =>
                    addComment('012345678901234567890123', post.id, 'comment text')
                )
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user =>
                    addComment(user.id, '012345678901234567890123', 'comment text')
                )
        ).to.be.rejectedWith(NotFoundError, 'post not found')
    )

    after(() => db.disconnect())
})