import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { Post, User } from 'dat'
import { errors } from 'com'

const { NotFoundError, SystemError, ValidationError } = errors

import createPost from './createPost.js'

describe('createPost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user', () =>
        User.create({ name: 'Juan Pablo', email: 'juan@pablo.com', username: 'juanpablo', password: '123456' })
            .then(user =>
                createPost(user.id, 'https://www.image.com', 'heythere')
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post).to.exist
                        expect(post.author.toString()).to.equal(user.id)
                        expect(post.image).to.equal('https://www.image.com')
                        expect(post.text).to.equal('heythere')
                        expect(post.date).to.be.instanceOf(Date)
                    })
            )
    )

    it('fails on non existing user', () =>
        expect(
            createPost('012345678901234567890123', 'https://www.image.com', 'heythere')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => createPost(true, 'https://www.image.com', 'heythere')).to.throw(ValidationError, /^invalid userId$/)
    )
    it('fails on non 24-chars-length user-id', () =>
        expect(() => createPost('01245', 'https://www.image.com', 'heythere')).to.throw(ValidationError, /^invalid userId length$/)
    )
    it('fails on non-string image', () =>
        expect(() => createPost('012345678901234567890123', true, 'heythere')).to.throw(ValidationError, /^invalid image$/)
    )
    it('fails on non-string text', () =>
        expect(() => createPost('012345678901234567890123', 'https://www.image.com', true)).to.throw(ValidationError, /^invalid text$/)
    )

    describe('fails on User.findById error', () => {
        let findById

        beforeEach(() => {
            findById = User.findById
            User.findById = () => Promise.reject(new SystemError('system error on User.findById'))
        })

        it('fails on User.findById error', () =>
            expect(
                createPost('012345678901234567890123', 'https://www.image.com', 'hello world')
            ).to.be.rejectedWith(SystemError, /^system error on User.findById$/)
        )

        afterEach(() => User.findById = findById)
    })

    describe('fails on Post.create error', () => {
        let create

        beforeEach(() => {
            create = Post.create
            Post.create = () => Promise.reject(new SystemError('system error on Post.create'))
        })

        it('fails on Post.create error', () =>
            expect(
                User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                    .then(user =>
                        createPost(user.id, 'https://www.image.com', 'hello world')
                    )
            ).to.be.rejectedWith(SystemError, /^system error on Post.create$/)
        )
        afterEach(() => Post.create = create)
    })
    after(() => db.disconnect())
})
