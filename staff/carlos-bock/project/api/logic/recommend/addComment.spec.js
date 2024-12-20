import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai
import { describe } from 'mocha'


import db, { User, Recommend } from 'dat'
import errors from 'com'

const { NotFoundError } = errors

import addComment from './addComment.js'

const user1 = {
    name: 'Antonio Banderas',
    email: 'abanderas@spain.net',
    username: 'banderas',
    password: '123456789'
}

debugger

describe('addComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Recommend.deleteMany()]))

    it('succeds for existing user', () => {
        const user = new User(user1)
        const recommend = new Recommend({
            author: user.id,
            city: 'Lisboa',
            country: 'Portugal',
            category: 1,
            price: 1,
            link: 'https:/www.example.com',
            imageUrl: 'https:/www.example.com/image.jpg',
            text: 'guten tag',
            subject: 'la vida en Lisboa'
        })

        return Promise.all([user.save(), recommend.save()])
            .then(([user, recommend]) =>
                addComment(user.id, recommend.id, 'guten tag')
                    .then(() => Recommend.findOne())
                    .then(recommend => {
                        expect(recommend).to.exist
                        expect(recommend.comments).to.have.lengthOf(1)

                        const [comment] = recommend.comments
                        expect(comment.author.toString()).to.equal(user.id)
                        expect(comment.text).to.equal('guten tag')
                        expect(comment.date).to.be.instanceOf(Date)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            addComment('012345678901234567890123', '012345678901234567890124', 'guten tag')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({
                name: 'Luis Fonci',
                email: 'fonci@pr.net',
                username: 'lfonci25',
                password: '123456789'
            })
                .then(user =>
                    addComment(user.id, '012345678901234567890123', 'guten tag')
                )
        ).to.be.rejectedWith(NotFoundError, /^recommendation not found$/)
    )

    //TODO need to add validation error test case
    //TODO need to add system error test case

    after(() => db.disconnect())
})
