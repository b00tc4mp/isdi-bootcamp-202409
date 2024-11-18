import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'apu'

const { NotFoundError, OwnershipError } = errors

import removeComment from './removeComment.js'

describe('deletePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany(),
            Post.deleteMany()
        ])
    })

    it('succeeds on removing a comment', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                    .then(post => {
                        const comment1 = new Comment({ author: user.id, text: 'comment1' })
                        post.comments.push(comment1)

                        const comment2 = new Comment({ author: user.id, text: 'comment2' })
                        post.comments.push(comment2)

                        return post.save()
                            .then(post => {
                                removeComment(user.id, post.id, post.comments[0].id)
                                    .then(() => {
                                        expect(post.comments).to.have.lengthOf(1)
                                    })
                            })
                    })
            )
    )

    it('fails on non-existing user', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                    .then(post => {
                        const comment1 = new Comment({ author: user.id, text: 'comment1' })
                        post.comments.push(comment1)

                        const comment2 = new Comment({ author: user.id, text: 'comment2' })
                        post.comments.push(comment2)

                        return post.save()
                            .then(post =>
                                expect(
                                    removeComment('012345678901234567890123', post.id, post.comments[0].id)
                                ).to.be.rejectedWith(NotFoundError, 'user not found')
                            )
                    })
            )
    )

    it('fails on non-existing post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                    .then(post => {
                        const comment1 = new Comment({ author: user.id, text: 'comment1' })
                        post.comments.push(comment1)

                        const comment2 = new Comment({ author: user.id, text: 'comment2' })
                        post.comments.push(comment2)

                        return post.save()
                            .then(post =>
                                expect(
                                    removeComment(user.id, '012345678901234567890123', post.comments[0].id)
                                ).to.be.rejectedWith(NotFoundError, 'post not found')
                            )
                    })
            )
    )

    it('fails on user not author of comment', () =>
        User.create({ name: 'Coca Loca', email: 'coca@loca.com', username: 'cocaloca', password: '123123123' })
            .then(_user =>
                User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                    .then(user =>
                        Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                            .then(post => {
                                const comment1 = new Comment({ author: user.id, text: 'comment1' })
                                post.comments.push(comment1)

                                const comment2 = new Comment({ author: user.id, text: 'comment2' })
                                post.comments.push(comment2)

                                return post.save()
                                    .then(post =>
                                        expect(
                                            removeComment(_user.id, post.id, post.comments[0].id)
                                        ).to.be.rejectedWith(OwnershipError, 'user not author of comment')
                                    )
                            })
                    )
            )
    )

    after(() => db.disconnect())
})