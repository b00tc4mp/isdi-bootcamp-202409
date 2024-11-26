import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError, ValidationError, SystemError } = errors

import toggleSavePost from './toggleSavePost.js'

describe('toggleSavePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user liking a post', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'post text' })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                toggleSavePost(user.id, post.id)
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post.saves).to.have.lengthOf(1)
                        expect(post.saves[0].toString()).to.equal(user.id)
                    })
            )
    })

    it('succeeds for existing user disliking a post', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'post text', saves: [user.id] })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                toggleSavePost(user.id, post.id)
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post.saves).to.have.lengthOf(0)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            toggleSavePost('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user =>
                    toggleSavePost(user.id, '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    // TODO add validation error test cases
    // TODO add system error test cases

    after(() => db.disconnect())
})