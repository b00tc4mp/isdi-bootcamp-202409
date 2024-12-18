import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai
import { beforeEach, describe } from 'mocha'

import db, { User, Recommend } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getComments from './getComments.js'

const recommend1 = { //don't include user.id 
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

describe('getComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Recommend.deleteMany()]))

    it('succeeds for exisiting user', () => {
        const user = new User({
            name: 'Antonio Banderas',
            email: 'abanderas@spain.net',
            username: 'banderas',
            password: '123456789'
        })
        const user2 = new User({
            name: 'Antonio Banderas2',
            email: 'abanderas2@spain.net',
            username: 'banderas2',
            password: '123456789'
        })
        const comment1 = { author: user.id, text: 'guten tag' }
        const comment2 = { author: user2.id, text: 'guten tag' }
        const recommend2 = new Recommend({
            author: user.id,
            city: recommend1.city,
            country: recommend1.country,
            category: recommend1.category,
            price: recommend1.price,
            link: recommend1.link,
            image: recommend1.imageUrl,
            text: recommend1.recommend,
            subject: recommend1.subject,
            comments: [comment1, comment2],
            date: new Date(2024, 11, 11)
        })


        return Promise.all([user.save(), user2.save(), recommend2.save()])
            .then(([user, user2, recommend2]) =>
                getComments(user.id, recommend2.id)
                    .then(comments => {
                        console.log(comments)
                        expect(comments[0].id).to.exist
                        expect(comments[0].text).to.equal(comment2.text)
                        expect(comments[0].author.id).to.equal(user.id)
                        expect(comments[0].author.username).to.equal(user.username)

                        expect(comments[1].id).to.exist
                        expect(comments[1].text).to.equal(comment1.text)
                        expect(comments[1].author.id).to.equal(user2.id)
                        expect(comments[1].author.username).to.equal(user2.username)


                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            getComments('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    //add validation error test cases
    //add system error test cases

    after(() => db.disconnect())
})