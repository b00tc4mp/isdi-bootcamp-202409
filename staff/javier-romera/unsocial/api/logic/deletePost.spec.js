import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'apu'

const { NotFoundError, OwnershipError } = errors

import deletePost from './deletePost.js'

describe('deletePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany(),
            Post.deleteMany()
        ])
    })

    it('succeeds on deleting a post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                    .then(post =>
                        deletePost(user.id, post.id)
                            .then(() =>
                                Post.find()
                                    .then(posts => {
                                        expect(posts).to.have.lengthOf(0)
                                    })
                            )
                    )
            )
    )

    it('fails on non-existing user', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user => Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                .then(post =>
                    expect(
                        deletePost('012345678901234567890123', post.id)
                    ).to.be.rejectedWith(NotFoundError, 'user not found')
                )
            )
    )

    it('fails on non-existing post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                expect(
                    deletePost(user.id, '012345678901234567890123')
                ).to.be.rejectedWith(NotFoundError, 'post not found')
            )
    )

    it('fails on user not author of post', () =>
        User.create({ name: 'Coca Loca', email: 'coca@loca.com', username: 'cocaloca', password: '123123123' })
            .then(_user =>
                User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                    .then(user => Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text' })
                        .then(post =>
                            expect(
                                deletePost(_user.id, post.id)
                            ).to.be.rejectedWith(OwnershipError, 'user is not author of post')
                        )
                    )
            )
    )
})