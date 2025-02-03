/*import 'dotenv/config'
import db from 'dat'
import createPost from './createPost.js'*/

import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { ValidationError, NotFoundError } = errors

import createPost from './createPost.js'


describe('createPost', () => {

    // Conectamos a la base de datos antes de ejecutar los tests
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // Borramos la colección `User` y `Post` antes de cada test
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))


    it('succeeds for existing user', () =>
        User.create({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
            .then(user => {
                //console.log('User created:', user)
                createPost(user.id, 'https://www.image.com', 'hello world')
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post).to.exist
                        expect(post.author.toString()).to.equal(user.id)
                        expect(post.image).to.equal('https://www.image.com')
                        expect(post.text).to.equal('hello world')
                        expect(post.date).to.be.instanceOf(Date)
                    })
            }

            )
    )

    it('fails on non-existing user', () =>
        expect(
            createPost('012345678901234567890123', 'https://image.com', 'hola manola')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => createPost(true, 'https://www.image.com', 'hello world')).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => createPost('0123', 'https://www.image.com', 'hello world')).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('fails on non-string image', () =>
        expect(() => createPost('012345678901234567890123', true, 'hello world')).to.throw(ValidationError, /^invalid image$/)
    )

    it('fails on non-string text', () =>
        expect(() => createPost('012345678901234567890123', 'https://www.image.com', true)).to.throw(ValidationError, /^invalid text$/)
    )



    after(() => db.disconnect())

})