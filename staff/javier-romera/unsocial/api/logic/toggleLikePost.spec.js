import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'apu'

const { NotFoundError } = errors

import toggleLikePost from './toggleLikePost.js'

describe('toggleLikePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany(),
            Post.deleteMany()
        ])
    })

    it('succeeds on liking a post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                    .then(post =>
                        toggleLikePost(user.id, post.id)
                            .then(() =>
                                Post.findById(post.id)
                                    .then(post => {
                                        expect(post.likes).to.have.lengthOf(1)
                                        expect(post.likes[0].toString()).to.equal(user.id)
                                    })
                            )
                    )
            )
    )

    it('succeeds on unliking a post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                    .then(post =>
                        toggleLikePost(user.id, post.id) // like
                            .then(() =>
                                toggleLikePost(user.id, post.id) // unlike
                                    .then(() =>
                                        Post.findById(post.id)
                                            .then(post => {
                                                expect(post.likes).to.have.lengthOf(0)
                                            })
                                    )
                            )

                    )
            )
    )

    it('fails on non-existing user', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                    .then(post =>
                        expect(
                            toggleLikePost('012345678901234567890123', post.id)
                        ).to.be.rejectedWith(NotFoundError, 'user not found')
                    )
            )
    )

    it('fails on non-existing post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                    .then(post =>
                        expect(
                            toggleLikePost(user.id, '012345678901234567890123')
                        ).to.be.rejectedWith(NotFoundError, 'post not found')
                    )
            )
    )

    after(() => db.disconnect())
})