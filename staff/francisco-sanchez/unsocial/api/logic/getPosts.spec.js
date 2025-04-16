import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getPosts from './getPosts.js'

describe('getPosts', () => {
    // Conectamos a la base de datos antes de ejecutar los tests
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // Borramos la colección `User` y `Post` antes de cada test
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
        const post = new Post({ author: user.id, image: 'https://image.com', text: 'hola manola', date: new Date(2024, 10, 18) })
        const post2 = new Post({ author: user.id, image: 'https://image.com', text: 'hola manola', date: new Date(2024, 10, 19) })

        return Promise.all([user.save(), post.save(), post2.save()])
            .then(([user, post, post2]) =>
                getPosts(user.id)
                    .then(posts => {
                        expect(posts[0].id).to.equal(post2.id)
                        expect(posts[0].author.id).to.equal(user.id)
                        expect(posts[0].author.username).to.equal(user.username)
                        expect(posts[0].image).to.equal(post2.image)
                        expect(posts[0].text).to.equal(post2.text)
                        expect(posts[0].date).to.deep.equal(post2.date)

                        expect(posts[1].id).to.equal(post.id)
                        expect(posts[1].author.id).to.equal(user.id)
                        expect(posts[1].author.username).to.equal(user.username)
                        expect(posts[1].image).to.equal(post.image)
                        expect(posts[1].text).to.equal(post.text)
                        expect(posts[1].date).to.deep.equal(post.date)
                    })
            )
    })
    it('fails on non-existing user', () =>
        expect(
            getPosts('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    after(() => db.disconnect())
})