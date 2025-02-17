import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { Post, User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import likesInteraction from './likesInteraction.js'

describe('likesInteraction', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world', likes: [] })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                likesInteraction(user.id, post.id)
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post.likes).to.have.length(1)
                        expect(post.likes[0].toString()).to.equal(user.id)
                    })
            )
    })

    describe('likesInteraction', () => {
        before(() => db.connect(process.env.MONGO_URL_TEST))

        beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

        it('succeeds for existing user', () => {
            const user = new User({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
            const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world', likes: [user.id] })

            return Promise.all([user.save(), post.save()])
                .then(([user, post]) =>
                    likesInteraction(user.id, post.id)
                        .then(() => Post.findOne())
                        .then(post => {
                            expect(post.likes).to.have.length(0)
                        })
                )
        })
    })
    it('fails on non-existing user', () =>
        expect(
            likesInteraction('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
                .then(user =>
                    likesInteraction(user.id, '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )
    after(() => db.disconnect())
})
