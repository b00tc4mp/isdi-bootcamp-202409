import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getPosts from './getPosts.js'

describe('getPosts', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([User.deleteMany(), Post.deleteMany()])
    })

    it('succeeds on getting the posts', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user => Post.create([
                { author: user.id, image: 'http://image1.com', text: 'First post' },
                { author: user.id, image: 'http://image2.com', text: 'Second post' }
            ])
                .then(() => getPosts(user.id)
                    .then(posts => {
                        expect(posts).to.exist
                        expect(posts[0].author.toString()).to.equal(user.id)
                        expect(posts[0].text).to.equal('First post')
                        expect(posts[1].author.toString()).to.equal(user.id)
                        expect(posts[1].text).to.equal('Second post')
                    })
                )
            )
    )

    it('fails on non-existing user', () => {
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user => Post.create([
                { author: '444444444444444444444444', image: 'http://image1.com', text: 'First post' },
                { author: '444444444444444444444444', image: 'http://image2.com', text: 'Second post' }
            ])
                .then(() =>
                    expect(
                        getPosts('012345678901234567890123')
                    ).to.be.rejectedWith(NotFoundError, 'User not found')
                )
            )
    })

    after(() => db.disconnect())
})