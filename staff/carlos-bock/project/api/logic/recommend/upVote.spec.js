import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai
import { describe } from 'mocha'


import db, { User, Recommend } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import upVote from './upVote.js'

const user1 = {
    name: 'Antonio Banderas',
    email: 'abanderas@spain.net',
    username: 'banderas',
    password: '123456789'
}

debugger

describe('downvote', () => {
    before(() => db.connect('mongodb://127.0.0.1:27017/mired-test')) //process.env.MONGO_URL_TEST

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
                upVote(user.id, recommend.id)
                    .then(() => Recommend.findOne())
                    .then(recommend => {
                        expect(recommend.upVotes).to.exist
                        expect(recommend.upVotes).to.have.lengthOf(1)
                        expect(recommend.upVotes[0].toString()).to.equal(user.id)


                    })
            )
    })


    it('succeds for existing upVote', () => {
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
            subject: 'la vida en Lisboa',
            upVotes: [user.id]
        })

        return Promise.all([user.save(), recommend.save()])
            .then(([user, recommend]) =>
                upVote(user.id, recommend.id)
                    .then(() => Recommend.findOne())
                    .then(recommend => {
                        expect(recommend.upVotes).to.exist
                        expect(recommend.upVotes).to.have.lengthOf(0)


                    })
            )
    })


    it('fails on non-existing user', () =>
        expect(
            upVote('012345678901234567890123', '012345678901234567890124')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({
                name: 'Antonio Banderas',
                email: 'abanderas@spain.net',
                username: 'banderas',
                password: '123456789'
            })
                .then(user =>
                    upVote(user.id, '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^recommendation not found$/)
    )

    //TODO need to add validation error test case
    //TODO need to add system error test case

    after(() => db.disconnect())
})
