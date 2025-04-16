import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'com'

const { ValidationError, NotFoundError, OwnershipError } = errors

import getComments from './getComments.js';

describe('getComments', () => {

    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))


    //Caso 1. Test verifica que se puede borrar el post
    it('succeeds on getting comments', () => {
        const user = new User({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
        const comment1 = new Comment({ author: user.id, text: 'comment1' })
        const comment2 = new Comment({ author: user.id, text: 'comment2' })
        const post = new Post({ author: user.id, image: 'https://image.com', text: 'hola manola', comments: [comment1, comment2] })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                getComments(user.id, post.id)
                    .then(comments => {
                        expect(comments).to.exist
                        expect(comments).to.have.lengthOf(2)

                        expect(comments[0].id).to.equal(comment1.id)
                        expect(comments[0].author.id).to.equal(user.id)
                        expect(comments[0].author.username).to.equal(user.username)
                        expect(comments[0].text).to.equal(comment1.text)
                        expect(comments[0].date).to.be.instanceOf(Date)

                        expect(comments[1].id).to.equal(comment2.id)
                        expect(comments[1].author.id).to.equal(user.id)
                        expect(comments[1].author.username).to.equal(user.username)
                        expect(comments[1].text).to.equal(comment2.text)
                        expect(comments[1].date).to.be.instanceOf(Date)
                    })
            )

    })

    it('fails on non-existing user', () =>
        expect(
            getComments('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>

        User.create({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
            .then(user =>
                expect(
                    getComments(user.id, '012345678901234567890123')
                ).to.be.rejectedWith(NotFoundError, /^post not found$/)
            )
    )




    after(() => db.disconnect())
})