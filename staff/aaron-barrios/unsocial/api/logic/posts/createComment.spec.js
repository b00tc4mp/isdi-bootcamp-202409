import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import createComment from './createComment.js'

//debugger

describe('createComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user', () => {
        User.create({ name: 'aaron', email: 'aaron@ar.com', username: 'aaron', password: '123' })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                createComment(user.id, post.id, 'hello comment')
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
            createComment('012345678901234567890123', '012345678901234567890123', 'hello world')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user =>
                    createComment(user.id, '012345678901234567890123', 'hello world')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )


    after(() => db.disconnect())
})


