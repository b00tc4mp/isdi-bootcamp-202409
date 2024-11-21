import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

import deletePost from './deletePost.js'

describe('deletePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Post.deleteMany()
        ])
    )

    it('succeeds on deleting a post', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                deletePost(user.id, post.id)
                    .then(() =>
                        Post.find()
                            .then(posts => {
                                expect(posts).to.have.lengthOf(0)
                            })
                    )
            )
    })

    it('fails on non-existing user', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

        return Promise.all([user.save(), post.save()])
            .then(([, post]) =>
                expect(
                    deletePost('012345678901234567890123', post.id)
                ).to.be.rejectedWith(NotFoundError, /^user not found$/)
            )
    })

    it('fails on non-existing post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                expect(
                    deletePost(user.id, '012345678901234567890123')
                ).to.be.rejectedWith(NotFoundError, 'post not found')
            )
    )

    it('fails on user not author of post', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const user2 = new User({ name: 'Coca Loca', email: 'coca@loca.com', username: 'cocaloca', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

        return Promise.all([user.save(), user2.save(), post.save()])
            .then(([_, user2, post]) =>
                expect(
                    deletePost(user2.id, post.id)
                ).to.be.rejectedWith(OwnershipError, 'user is not author of post')
            )
    })
    after(() => db.disconnect())
})