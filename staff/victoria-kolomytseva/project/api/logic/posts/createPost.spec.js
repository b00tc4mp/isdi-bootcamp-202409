import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import createPost from './createPost.js'


describe('createPost', () => { // Agrupa todas las pruebas relacionadas con createPost
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', () =>
        User.create({ name: 'Juan Pérez', email: 'juan.perez@example.com', password: '123123123' })
            .then(user =>
                createPost(user.id, 'https://www.image.com', 'lost', 'cat', 'female', 'We have lost our Pug', {
                    type: 'Point',
                    "coordinates": [
                        41.5064041,
                        2.3913883
                    ],
                    "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                    "province": "Barcelona"
                })
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post).to.exist
                        expect(post.author.toString()).to.equal(user.id)
                        expect(post.image).to.equal('https://www.image.com')
                        expect(post.text).to.equal('We have lost our Pug')
                        expect(post.date).to.be.instanceOf(Date)
                    })
            )
    )

    it('fails on non-existing user', () =>
        expect(
            createPost('012345678901234567890124', 'https://www.image.com', 'lost', 'cat', 'female', 'hello world', {
                type: 'Point',
                "coordinates": [
                    41.5064041,
                    2.3913883
                ],
                "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                "province": "Barcelona"
            })
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => createPost(true, 'https://www.image.com', 'hello world')).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => createPost('0123', 'https://www.image.com', 'hello world')).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('fails on non-string image', () =>
        expect(() => createPost('012345678901234567890123', true, 'lost', 'dog', 'male', 'hello world')).to.throw(ValidationError, /^invalid image$/)
    )

    it('fails on non-string text', () =>
        expect(() => createPost('012345678901234567890123', 'https://www.image.com', true, true, true, true, 'hello world')).to.throw(ValidationError, /^invalid text$/)
    )

    describe('fails on User.findById error', () => {
        let findById

        beforeEach(() => {
            findById = User.findById

            User.findById = () => Promise.reject(new Error('system error on User.findById'))
        })

        it('fails on User.findById error', () =>
            expect(
                createPost('012345678901234567890123', 'https://www.image.com', 'lost', 'cat', 'male', 'hello world', {
                    type: 'Point',
                    "coordinates": [
                        41.5064041,
                        2.3913883
                    ],
                    "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                    "province": "Barcelona"
                })
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
                User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                    .then(user =>
                        createPost(user.id, 'https://www.image.com', 'lost', 'dog', 'female', 'hello world', {
                            type: 'Point',
                            "coordinates": [
                                41.5064041,
                                2.3913883
                            ],
                            "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                            "province": "Barcelona"
                        })
                    )
            ).to.be.rejectedWith(SystemError, /^system error on Post.create$/)
        )

        afterEach(() => Post.create = create)
    })

    after(() => db.disconnect())
})
