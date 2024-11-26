import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import createPost from './createPost.js'

describe('createPost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', async () => {
        const user = await User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })

        await createPost(user.id, 'https://www.image.com', 'post text')

        const post = await Post.findOne()

        expect(post).to.exist
        expect(post.author.toString()).to.equal(user.id)
        expect(post.id.toString()).to.have.lengthOf(24)
        expect(post.image).to.equal('https://www.image.com')
        expect(post.text).to.equal('post text')
        expect(post.date).to.be.instanceOf(Date)
    })

    it('fails on non-existing user', () => {
        expect((async () => {
            await createPost('012345678901234567890123', 'https://www.image.com', 'post text')
        })()).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    /*
    it('fails on non-string user-id', () => { //synchronous testing example
        let expectedError

        try {
            createPost(true, 'https://www.image.com', 'post text')
        } catch (error) {
            expectedError = error
        } finally {
            expect(expectedError).to.be.instanceOf(ValidationError)
            expect(expectedError.message).to.equal('invalid userId')
        }
    })
        */

    it('fails on non-string user-id', () => { //synchronous testing example
        expect(() => createPost(true, 'https://www.image.com', 'post text').to.throw(ValidationError, /^invalid userId$/))
    })

    it('fails on non-24-chars-length user-id', () => { //synchronous testing example
        expect(() => createPost('0123', 'https://www.image.com', 'post text').to.throw(ValidationError, /^invalid userId length$/))
    })

    it('fails on non-string image', () => { //synchronous testing example
        expect(() => createPost('012345678901234567890123', true, 'post text').to.throw(ValidationError, /^invalid image$/))
    })

    it('fails on non-string text', () => { //synchronous testing example
        expect(() => createPost('012345678901234567890123', 'https://www.image.com', true).to.throw(ValidationError, /^invalid text$/))
    })

    describe('fails on User.findById error', () => {
        let findById

        beforeEach(() => {
            findById = User.findById
            User.findById = () => Promise.reject(new Error('system error on User.findById'))
        })

        it('fails on User.findById error', () => {
            expect(
                createPost('012345678901234567890123', 'https://www.image.com', 'post text')
            ).to.be.rejectedWith(SystemError, /^system error on User.findById$/)
        })

        afterEach(() => User.findById = findById)
    })

    describe('fails on Post.create error', () => {
        let create

        beforeEach(() => {
            create = Post.create
            Post.create = () => Promise.reject(new Error('system error on Post.create'))
        })

        it('fails on Post.create error', () => {
            expect(
                User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                    .then(user =>
                        createPost(user.id, 'https://www.image.com', 'post text')
                    )
            ).to.be.rejectedWith(SystemError, /^system error on Post.create$/)
        })

        afterEach(() => Post.create = create)
    })

    after(() => db.disconnect())
})