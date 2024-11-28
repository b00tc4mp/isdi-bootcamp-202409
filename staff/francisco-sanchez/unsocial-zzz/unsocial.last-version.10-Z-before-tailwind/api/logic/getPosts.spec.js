import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { ValidationError, NotFoundError } = errors

import getPosts from './getPosts.js'

describe('getPosts', () => {

    // Conectamos a la base de datos antes de ejecutar los tests
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // Borramos la colección `User` y `Post` antes de cada test
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))


    it('succeeds for existing user', () => {
        User.create({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
            .then(user =>
                getPosts(user.id, 'https://www.image.com', 'hello world')
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post).to.exist
                        expect(post.author.toString()).to.equal(user.id)
                        expect(post.image).to.equal('https://www.image.com')
                        expect(post.text).to.equal('hello world')
                        expect(post.date).to.be.instanceOf(Date)
                    })
            )
    })
})