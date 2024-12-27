import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'apu'

const { NotFoundError } = errors

import addComment from './addComment.js'

describe('addComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Post.deleteMany(),
        ])
    )

    it('succeeds on adding a comment', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                addComment(user.id, post.id, 'comment text')
                    .then(() => Post.findById(post.id))
                    .then(post => {
                        expect(post).to.exist
                        expect(post.comments).to.have.lengthOf(1)

                        const [comment] = post.comments
                        expect(comment.author.toString()).to.equal(user.id)
                        expect(comment.text).to.equal('comment text')
                        expect(comment.date).to.be.instanceOf(Date)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            addComment('012345678901234567890123', '012345678901234567890123', 'comment text')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user =>
                    addComment(user.id, '012345678901234567890123', 'comment text')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    // TODO add validation error test cases
    // TODO add system error test cases

    after(() => db.disconnect())
})