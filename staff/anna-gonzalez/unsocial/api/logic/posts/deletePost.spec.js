import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError, ValidationError, SystemError } = errors

import deletePost from './deletePost.js'

describe('deletePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', async () => {
        const user = await new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = await new Post({ author: user.id, image: 'https://www.image.com', text: 'post text' })

        await Promise.all([user.save(), post.save()])

        await deletePost(user.id, post.id)

        const posts = await Post.find()

        expect(posts).to.have.lengthOf(0)
    })

    it('fails on non-existing user', () =>
        expect(
            deletePost('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user =>
                    deletePost(user.id, '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    it('fails on non-owned post', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const user2 = new User({ name: 'Coca Loca', email: 'coca@loca.com', username: 'cocaloca', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'post text' })

        return expect(
            Promise.all([user.save(), user2.save(), post.save()])
                .then(([user, user2, post]) =>
                    deletePost(user2.id, post.id)
                )
        ).to.be.rejectedWith(OwnershipError, /^user is not author of post$/)
    })

    // TODO add validation error test cases
    // TODO add system error test cases

    after(() => db.disconnect())
})