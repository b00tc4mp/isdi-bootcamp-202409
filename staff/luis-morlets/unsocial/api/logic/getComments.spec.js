import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getComments from './getComments.js'

debugger

describe('getComments', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('getComments', () => {
        const user = new User({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
        const comment = new Comment({ author: user.id, text: 'hello world 2' })
        const comment2 = new Comment({ author: user.id, text: 'hello world 2' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world', comments: [comment, comment2] })

        return Promise.all([user.save(), post.save(), comment.save(), comment2.save()])
            .then(([user, post, comment, comment2]) =>
                getComments(user.id, post.id)
                    .then(comments => {

                        expect(comments[0].id).to.equal(comment.id)
                        expect(comments[0].author.id).to.equal(user.id)
                        expect(comments[0].author.username).to.equal(user.username)
                        expect(comments[0].text).to.equal(comment.text)

                        expect(comments[1].id).to.equal(comment2.id)
                        expect(comments[1].author.id).to.equal(user.id)
                        expect(comments[1].author.username).to.equal(user.username)
                        expect(comments[1].text).to.equal(comment2.text)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            getComments('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
                .then(user => getComments(user.id, '012345678901234567890123'))
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )
    // TODO add system error test cases

    after(() => db.disconnect())
})
