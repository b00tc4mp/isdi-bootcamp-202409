import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError } = errors

import deletePost from './deletePost.js'

describe('deletePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([User.deleteMany(), Post.deleteMany()])
    })

    it('succeeds on deleting a post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user => Post.create({ author: user.id, image: 'http://image.com', text: 'post text' })
                .then(() => Post.findOne({ author: user.id }))
                .then(post => {
                    deletePost(user.id, post.id)
                })
            )
    )

    it('fails on non-existing user', () => {
        Post.create({ author: '444444444444444444444444', image: 'http://image.com', text: 'post text' })
            .then(post => {
                expect(
                    deletePost('012345678901234567890123', post.id)
                ).to.be.rejectedWith(NotFoundError, 'User not found')
            })
    })

    it('fails on non-existing post', () => {
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user => {
                expect(
                    deletePost(user.id, '012345678901234567890123')
                ).to.be.rejectedWith(NotFoundError, 'Post not found')
            })
    })

    it('fails on owner of the post', () => {
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user => Post.create({ author: user.id, image: 'http://image.com', text: 'post text' })
                .then(() => Post.findOne({ author: user.id }))
                .then(post => {
                    expect(
                        deletePost('012345678901234567890123', post.id)
                    ).to.be.rejectedWith(OwnershipError, 'User is not author of post')
                })
            )
    })

    after(() => db.disconnect())
})