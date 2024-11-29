import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError } = errors

import deletePost from './deletePost.js'



describe('deletePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany()) //callback para cada test (it)
    beforeEach(() => Post.deleteMany()) //callback para cada test (it)

    it('succeeds on new post', () =>
        User.create({ name: 'aaron', email: 'aaron@ar.com', username: 'aaron', password: '123' })
            .then(user => {
                Post.create({ author: user.id, text: 'me quiero morir', image: 'http://laImagen.com' })
            })
    )


    // it('fails on non-existing user', () =>
    //     expect(
    //         createPost('012345678901234567891234', 'holaaa', 'http://image.com')
    //     ).to.be.rejectedWith(NotFoundError, 'user not found')
    // )

    after(() => db.disconnect())
})


