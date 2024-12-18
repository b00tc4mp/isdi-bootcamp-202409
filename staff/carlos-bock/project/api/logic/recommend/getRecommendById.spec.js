import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai
import { beforeEach, describe } from 'mocha'

import db, { User, Recommend } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getRecommendById from './getRecommendById.js'

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

describe('getRecommendById', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Recommend.deleteMany()]))

    it('succeeds for exisiting user', () => {
        const user = new User({
            name: 'Antonio Banderas',
            email: 'abanderas@spain.net',
            username: 'banderas',
            password: '123456789'
        })
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
            date: new Date(2024, 11, 11)
        })
        const recommend3 = new Recommend({
            author: user.id,
            city: recommend1.city,
            country: recommend1.country,
            category: recommend1.category,
            price: recommend1.price,
            link: recommend1.link,
            image: recommend1.imageUrl,
            text: recommend1.recommend,
            subject: recommend1.subject,
            date: new Date(2024, 12, 12)
        })

        return Promise.all([user.save(), recommend2.save(), recommend3.save()])
            .then(([user, recommend3]) =>
                getRecommendById(user.id, recommend3.id)
                    .then(recommend => {
                        console.log(recommend)
                        expect(recommend.id).to.equal(recommend3.id)
                        expect(recommend.author.id).to.equal(user.id)
                        expect(recommend.author.username).to.equal(user.username)
                        expect(recommend.city).to.equal(recommend3.city)
                        expect(recommend.country).to.equal(recommend3.country)
                        expect(recommend.category).to.equal(recommend3.category)
                        expect(recommend.price).to.equal(recommend3.price)
                        expect(recommend.link).to.equal(recommend3.link)
                        expect(recommend.image).to.equal(recommend3.image)
                        expect(recommend.text).to.equal(recommend3.text)
                        expect(recommend.subject).to.equal(recommend3.subject)

                        /*expect(recommend[1].id).to.equal(recommend2.id)
                        expect(recommend[1].author.id).to.equal(user.id)
                        expect(recommend[1].author.username).to.equal(user.username)
                        expect(recommend[1].city).to.equal(recommend2.city)
                        expect(recommend[1].country).to.equal(recommend2.country)
                        expect(recommend[1].category).to.equal(recommend2.category)
                        expect(recommend[1].price).to.equal(recommend2.price)
                        expect(recommend[1].link).to.equal(recommend2.link)
                        expect(recommend[1].image).to.equal(recommend2.image)
                        expect(recommend[1].text).to.equal(recommend2.text)
                        expect(recommend[1].subject).to.equal(recommend2.subject)
                        */
                    })
            )
    })

    it('fails on non-existing recommendation', () =>
        expect(
            getRecommendById('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^Recommendation not found$/)
    )

    //add validation error test cases
    //add system error test cases

    after(() => db.disconnect())
})