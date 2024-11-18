import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getComments from './getComments.js'

describe('getComments', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()])
    })

    it('succeeds on getting the comments', () => {
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user => Post.create({ author: user.id, image: 'http://image1.com', text: 'post text' })
                .then(() => Post.findOne({ author: user.id })
                    .then(post => Comment.create[
                        ({ author: user.id, text: 'comment1 text' }),
                        ({ author: user.id, text: 'comment2 text' })
                    ]
                        .then(() => getComments(user.id, post.id)
                            .then(comments => {
                                expect(comments).to.exist
                                expect(comments[0].author.toString()).to.equal(user.id)
                                expect(comments[0].text).to.equal('comment1 text')
                                expect(comments[1].author.toString()).to.equal(user.id)
                                expect(comments[1].text).to.equal('comment2 text')
                            })
                        )
                    )
                )
            )
    })

    it('fails on non-existing user', () => {
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                    .then(post => {
                        const comment1 = new Comment({ author: user.id, text: 'comment1' })
                        post.comments.push(comment1)

                        return post.save()
                            .then(post =>
                                expect(
                                    getComments('012345678901234567890123', post.id)
                                ).to.be.rejectedWith(NotFoundError, 'user not found')
                            )
                    })
            )
    })

    it('fails on non-existing post', () => {
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' })
                .then(user => {
                    expect(getComments(user.id, '012345678901234567890123')).to.be.rejectedWith(NotFoundError, 'Post not found')
                })
            )
    })

    after(() => db.disconnect())
})