import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import createPost from './createPost.js'

debugger

describe('createPost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))


    it('succeeds on existing user', () =>
        User.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
            .then(user => createPost(user.id, 'https://pixabay.com/get/gd0a0174a045979f595db417050c1d94e72ac40c7c4d9f90c0202d4927f1348b8ac8189fc03efe0dead9625184ed59357_1280.jpg', 'mi palacio')
                .then(() => Post.findOne())
                .then(post => {
                    expect(post).to.exist
                    expect(post.author.toString()).to.equal(user.id)
                    expect(post.image).to.equal('https://pixabay.com/get/gd0a0174a045979f595db417050c1d94e72ac40c7c4d9f90c0202d4927f1348b8ac8189fc03efe0dead9625184ed59357_1280.jpg')
                    expect(post.text).to.equal('mi palacio')
                    expect(post.date).to.be.instanceOf(Date)
                })
            )
    )

    it('fails on non-existing user', () =>
        expect(
            createPost('012345678901234567890123', 'https://pixabay.com/get/gd0a0174a045979f595db417050c1d94e72ac40c7c4d9f90c0202d4927f1348b8ac8189fc03efe0dead9625184ed59357_1280.jpg', 'mi palacio'))
            .to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    //Test for sync validation errors

    it('fails on non-string user-id', () =>
        expect(() => createPost(true, 'https://www.image.com', 'hello world')).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => createPost('0123', 'https://www.image.com', 'hello world')).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('fails on non-string image', () =>
        expect(() => createPost('012345678901234567890123', true, 'hello world')).to.throw(ValidationError, /^invalid image$/)
    )

    it('fails on non-string text', () =>
        expect(() => createPost('012345678901234567890123', 'https://www.image.com', true)).to.throw(ValidationError, /^invalid text$/)
    )

    //test for sync system errors which are not that usual to happen but still you never know when i can drop the db!!
    describe('fails on User.findById error', () => {
        let findById

        beforeEach(() => {
            findById = User.findById

            User.findById = () => Promise.reject(new Error('system error on User.findById'))
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

            Post.create = () => Promise.reject(new Error('system error on Post.create'))
        })

        it('fails on Post.create error', () =>
            expect(
                User.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
                    .then(user =>
                        createPost(user.id, 'https://www.image.com', 'hello world')
                    )
            ).to.be.rejectedWith(SystemError, /^system error on Post.create$/)
        )

        afterEach(() => Post.create = create)
    })

    after(() => db.disconnect())
})