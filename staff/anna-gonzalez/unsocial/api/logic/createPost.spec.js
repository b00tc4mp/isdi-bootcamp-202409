import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import createPost from './createPost.js'

describe('createPost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([User.deleteMany(), Post.deleteMany()])
    })

    it('succeeds on creating a post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user =>
                createPost(user.id, 'http://image.com', 'post text')
                    .then(() => Post.findOne({ author: user.id })
                        .then(post => {
                            expect(post).to.exist
                            expect(post.id.toString()).to.have.lengthOf(24)
                            expect(post.author.toString()).to.equal(user.id)
                            expect(post.image).to.equal('http://image.com')
                            expect(post.text).to.equal('post text')
                            expect(post.date).to.exist
                            expect(post.likes).to.exist
                            expect(post.saves).to.exist
                            expect(post.comments).to.exist
                        })
                    )
            )
    )

    it('fails on non-existing user', () => {
        expect(
            createPost('012345678901234567890123', 'http://image.com', 'post text')
        ).to.be.rejectedWith(NotFoundError, 'User not found')
    })

    after(() => db.disconnect())
})