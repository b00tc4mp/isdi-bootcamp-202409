import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { ValidationError, NotFoundError } = errors

import addComment from './addComment.js'

describe('addComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
        const post = new Post({ author: user.id, image: 'https://image.com', text: 'hola manola' })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                addComment(user.id, post.id, 'hello comment')
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
            addComment('012345678901234567890123', '012345678901234567890123', 'hello world')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
                .then(user =>
                    addComment(user.id, '012345678901234567890123', 'hello world')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    after(() => db.disconnect())

})