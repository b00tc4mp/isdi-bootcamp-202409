import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getPosts from './getPosts.js'


describe('getPosts', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'María Gomez', email: 'maria.gomez@example.com', password: '32165' })
        const post = new Post({
            author: user.id, image: 'https://www.image.com', whatHappened: 'lost', petType: 'cat', petGender: 'female', text: 'hello world', date: new Date(2024, 10, 18), location: {
                type: 'Point',
                "coordinates": [
                    41.5064041,
                    2.3913883
                ],
                "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                "province": "Barcelona"
            }
        })
        const post2 = new Post({
            author: user.id, image: 'https://www.image.com/2', whatHappened: 'lost', petType: 'dog', petGender: 'female', text: 'lost my dog', date: new Date(2024, 10, 19), location: {
                type: 'Point',
                "coordinates": [
                    41.5064041,
                    2.3913883
                ],
                "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                "province": "Barcelona"
            }
        })


        return Promise.all([user.save(), post.save(), post2.save()])//Guarda el usuario y las publicaciones en la base de datos
            .then(([user, post, post2]) =>
                getPosts(user.id)
                    .then(posts => {
                        expect(posts[0].id).to.equal(post2.id)
                        expect(posts[0].author.id).to.equal(user.id)
                        expect(posts[0].image).to.equal(post2.image)
                        expect(posts[0].text).to.equal(post2.text)
                        expect(posts[0].date).to.deep.equal(post2.date)

                        expect(posts[1].id).to.equal(post.id)
                        expect(posts[1].author.id).to.equal(user.id)
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

    // TODO add validation error test cases
    // TODO add system error test cases

    after(() => db.disconnect())
})
