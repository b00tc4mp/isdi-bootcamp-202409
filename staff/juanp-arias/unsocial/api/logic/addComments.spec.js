import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import addComments from './addComments.js'

describe('addComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                addComments(user.id, post.id, 'hello comment')
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post).to.exist
                        expect(post.comments).to.have.lengthOf(1)

                        const [comment] = post.comments
                        expect(comment.author.toString()).to.equal(user.id)
                        expect(comment.text).to.equal('hello comment')
                        expect(comment.date).to.be.instanceOf(Date)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            addComments('012345678901234567890123', '012345678901234567890123', 'hello world')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user =>
                    addComments(user.id, '012345678901234567890123', 'hello world')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    // describe('fails on User.findById error', () => {
    //     let findById

    //     beforeEach(() => {
    //         findById = User.findById

    //         User.findById = () => Promise.reject(new Error('system error on User.findById'))
    //     })

    //     it('fails on User.findById error', () =>
    //         expect(
    //             addComments('012345678901234567890123', '012345678901234567890123', 'hello world')
    //         ).to.be.rejectedWith(SystemError, /^system error on User.findById$/)
    //     )

    //     afterEach(() => User.findById = findById)
    // })

    describe('fails on Post.findById error', () => {
        let findById

        beforeEach(() => {
            findById = Post.findById

            Post.findById = () => Promise.reject(new Error('system error on Post.findById'))
        })

        it('fails on Post.findById error', () =>
            expect(
                User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                    .then(user =>
                        addComments(user.id, '012345678901234567890123', 'heythere')
                    )
            ).to.be.rejectedWith(SystemError, /^system error on Post.findById$/)
        )

        afterEach(() => Post.findById = findById)
    })

    after(() => db.disconnect())
})