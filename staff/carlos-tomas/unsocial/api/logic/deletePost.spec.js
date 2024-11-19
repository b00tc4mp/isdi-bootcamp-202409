import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import deletePost from './deletePost.js'


describe('Addcomments', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() =>

        User.deleteMany(),
        Post.deleteMany()

    )

    it('succedes on new post', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create(user.id, 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Grib_skov.jpg', 'Bonito bosque')
                    .then(post => {
                        deletePost(user.id, post.id)

                    })
            ))

    it('fails on non-existing user', () =>
        expect(
            createPost('012345678901234567890127', 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Grib_skov.jpg', 'Bonito bosque')
        ).to.be.rejectedWith(NotFoundError, 'user not found')

    )

    after(() => db.disconnect())
})