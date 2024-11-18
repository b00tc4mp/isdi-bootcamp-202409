import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'apu'

const { NotFoundError } = errors

import getPosts from './getPosts.js'

describe('getPosts', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany(),
            Post.deleteMany()
        ])
    })

    it('succeds on getting the posts', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text1' })
                    .then(post1 => Post.create({ author: user.id, image: 'http://invented-image.com', text: 'post text2' })
                        .then(post2 =>
                            getPosts(user.id)
                                .then(posts => {
                                    expect(posts).to.exist
                                    expect(posts).to.have.lengthOf(2) // in this case
                                    expect(posts[0].date >= posts[1].date).to.be.true
                                })
                        )
                    )
            )
    )

    it('fails on non-existing user', () =>
        expect(
            getPosts('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )
})