import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Recommend, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError } = errors

import removeComment from './removeComment.js'
import { beforeEach, describe } from 'mocha'

const recommend1 = { //don't include user.id not
    userId: '012345678901234567890123',
    city: 'Lisboa',
    country: 'Portugal',
    category: 1,
    price: 1,
    link: 'https:/www.example.com',
    imageUrl: 'https:/www.example.com/image.jpg',
    recommend: 'guten tag',
    subject: 'Vida en Lisboa'
}

debugger

describe('removeComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Recommend.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({
            name: 'Luis Fonci',
            email: 'fonci@pr.net',
            username: 'lfonci25',
            password: '123456789'
        })
        const comment = new Comment({ author: user.id, text: 'guten tag' })
        const recommend = new Recommend({
            author: user.id,
            city: recommend1.city,
            country: recommend1.country,
            category: recommend1.category,
            price: recommend1.price,
            link: recommend1.link,
            imageUrl: recommend1.imageUrl,
            text: recommend1.recommend,
            subject: recommend1.subject,
            comments: [comment]
        })

        return Promise.all([user.save(), recommend.save()]) //add comment to promise all array?
            .then(([user, recommend]) =>
                removeComment(user.id, recommend.id, recommend.comments[0].id)
                    .then(() => Recommend.findOne())
                    .then(recommend => {
                        expect(recommend).to.exist
                        expect(recommend.comments).to.have.lengthOf(0)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            removeComment('012345678901234567890123', '012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing recommend', () =>
        expect(
            User.create({
                name: 'Luis Fonci',
                email: 'fonci@pr.net',
                username: 'lfonci25',
                password: '123456789'
            })
                .then(user =>
                    removeComment(user.id, '012345678901234567890123', '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^recommendation not found$/)
    )

    it('fails on non-existing comment', () => {
        const user = new User({
            name: 'Luis Fonci',
            email: 'fonci@pr.net',
            username: 'lfonci25',
            password: '123456789'
        })
        const recommend = new Recommend({
            author: user.id,
            city: 'Lisboa',
            country: 'Portugal',
            category: 1,
            price: 1,
            link: 'https:/www.example.com',
            imageUrl: 'https:/www.example.com/image.jpg',
            text: 'guten tag',
            subject: 'Vida en Lisboa'
        })

        return expect(
            Promise.all([user.save(), recommend.save()])
                .then(([user, recommend]) =>
                    removeComment(user.id, recommend.id, '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^comment not found$/)
    })

    it('fails on non-own commment', () => {
        const user = new User({
            name: 'Luis Fonci',
            email: 'fonci@pr.net',
            username: 'lfonci25',
            password: '123456789'
        })
        const user2 = new User({
            name: 'Antonio Banderas',
            email: 'abanderas@spain.net',
            username: 'banderas',
            password: '123456789'
        })
        const comment = new Comment({
            author: user.id,
            text: 'guten tag'
        })
        const recommend = new Recommend({
            author: user.id,
            city: recommend1.city,
            country: recommend1.country,
            category: recommend1.category,
            price: recommend1.price,
            link: recommend1.link,
            imageUrl: recommend1.imageUrl,
            text: recommend1.recommend,
            subject: recommend1.subject,
            comments: [comment]
        })

        return expect(
            Promise.all([user.save(), user2.save(), recommend.save()])
                .then(([user, user2, recommend]) =>
                    removeComment(user2.id, recommend.id, recommend.comments[0].id)
                )
        ).to.be.rejectedWith(OwnershipError, /^user not recommendation author$/) // double check logic here
    })

    // add validation error test cases
    // add system error test cases

    after(() => db.disconnect())
})