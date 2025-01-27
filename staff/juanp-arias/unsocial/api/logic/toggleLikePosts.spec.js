import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import toggleLikePosts from './toggleLikePosts.js'

describe('toggleLikePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Post.deleteMany()
        ])
    )

    it('succeeds on like a post', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                toggleLikePosts(user.id, post.id)
                    .then(() =>
                        Post.findById(post.id)
                            .then(post => {
                                expect(post.likes).to.have.lengthOf(1)
                                expect(post.likes[0].toString()).to.equal(user.id)
                            })
                    )
            )
    })

    it('succeeds on unlike a post', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world', likes: [user.id] })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) => {
                toggleLikePosts(user.id, post.id)
                toggleLikePosts(user.id, post.id)
                    .then(() =>
                        Post.findById(post.id)
                            .then(post => {
                                expect(post.likes).to.have.lengthOf(0)
                            })
                    )
            })
    })

    it('fails on non-existing user', () =>
        expect(
            toggleLikePosts('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                expect(
                    toggleLikePosts(user.id, '012345678901234567890123')
                ).to.be.rejectedWith(NotFoundError, /^post not found$/)
            )
    )

    after(() => db.disconnect())
})