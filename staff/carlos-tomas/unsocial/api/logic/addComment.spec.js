import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import addComment from './addComment.js'


describe('Addcomments', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() =>

        User.deleteMany(),
        Post.deleteMany(),
        Comment.deleteMany()

    )

    it('succedes on new post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Grib_skov.jpg', text: 'Bonito bosque' })
                    .then(post => {
                        addComment(user.id, post.id, 'Hola mundo')
                            .then(comment => {
                                expect(user.id).to.exist
                                expect(user.id).to.be.a.string
                                expect(user.id).to.have.lengthOf(24)
                                expect(post.id).to.exist
                                expect(post.id).to.be.a.string
                                expect(post.id).to.have.lengthOf(24)
                                expect(comment.text).to.be.a.string
                            })
                    })
            ))

    it('fails on non-existing id post', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user =>
                    addComment(user.id, '012345678901234567890123', 'Bonito bosque')
                )
        ).to.be.rejectedWith(NotFoundError, 'post not found')

    )

    it('fails on non-existing id user', () =>
        expect(
            Post.create({ author: '012345678901234567890127', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Grib_skov.jpg', text: 'Bonito bosque' })
                .then(post =>
                    addComment('012345678901234567890123', post.id, 'Bonito bosque')
                )
        ).to.be.rejectedWith(NotFoundError, 'user not found')

    )

    after(() => db.disconnect())
})