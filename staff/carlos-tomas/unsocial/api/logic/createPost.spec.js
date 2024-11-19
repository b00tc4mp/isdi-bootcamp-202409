import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import createPost from './createPost.js'


describe('Addcomments', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() =>

        User.deleteMany(),
        Post.deleteMany()

    )

    it('succedes on new post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                createPost(user.id, 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Grib_skov.jpg', 'Bonito bosque')
                    .then(post => {
                        expect(post).to.exist
                        expect(post.author).to.be.a.string
                        expect(post.author).to.have.lengthOf(24)
                        expect(post.image).to.be.a.string
                        expect(post.text).to.be.a.string
                    })
            ))

    it('fails on non-existing user', () =>
        expect(
            createPost('012345678901234567890127', 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Grib_skov.jpg', 'Bonito bosque')
        ).to.be.rejectedWith(NotFoundError, 'user not found')

    )

    after(() => db.disconnect())
})