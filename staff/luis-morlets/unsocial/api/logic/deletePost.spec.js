import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError, OwnershipError } = errors

import deletePost from './deletePost.js'

debugger

describe('deletePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user', () => {
        const user = new User({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                deletePost(user.id, post.id)
                    .then(() => Post.findOne({ _id: post.id }))
                    .then(post => {
                        expect(post).to.be.null
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            deletePost('012345678901234567890123', '012345678901234567890123'))
            .to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => deletePost(true, '012345678901234567890123')).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => deletePost('0123', '012345678901234567890123')).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
                .then(user =>
                    deletePost(user.id, '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    it('fails on non-own post', () => {
        const user = new User({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
        const user2 = new User({ name: 'Pero Lito 2', email: 'pero2@lito.com', username: 'perolito2', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

        return expect(
            Promise.all([user.save(), user2.save(), post.save()])
                .then(([user, user2, post]) =>
                    deletePost(user2.id, post.id)
                )
        ).to.be.rejectedWith(OwnershipError, /^User is not author of this post$/)
    })

    //TODO system error test

    after(() => db.disconnect())
})