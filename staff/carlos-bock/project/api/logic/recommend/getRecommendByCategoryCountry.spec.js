import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai
import { beforeEach, describe } from 'mocha'

import db, { User, Recommend } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getRecommendByCategoryCountry from './getRecommendByCategoryCountry.js'

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

describe('getRecommendByCategoryCountry', () => {
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
            .then(([user, recommend2, recommend3]) =>
                getRecommendByCategoryCountry(user.id, 1, 'Portugal')
                    .then(recommend => {
                        expect(recommend[0].id).to.equal(recommend3.id)
                        expect(recommend[0].author.id).to.equal(user.id)
                        expect(recommend[0].author.username).to.equal(user.username)
                        expect(recommend[0].city).to.equal(recommend3.city)
                        expect(recommend[0].country).to.equal(recommend3.country)
                        expect(recommend[0].category).to.equal(recommend3.category)
                        expect(recommend[0].price).to.equal(recommend3.price)
                        expect(recommend[0].link).to.equal(recommend3.link)
                        expect(recommend[0].image).to.equal(recommend3.image)
                        expect(recommend[0].text).to.equal(recommend3.text)
                        expect(recommend[0].subject).to.equal(recommend3.subject)
                        //expect(recommend[1].date).to.equal(recommend3.date)

                        expect(recommend[1].id).to.equal(recommend2.id)
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
                        //expect(recommend[0].date).to.equal(recommend2.date)

                    })
            )
    })


    it('fails on non number category', () => {
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

        return Promise.all([user.save(), recommend2.save(),])
            .then(([user, recommend2]) =>
                expect(getRecommendByCategoryCountry(user.id, true, recommend2.country)
                ).to.be.rejectedWith(ValidationError, /^invalid category$/)

            )
    })

    it('fails on non string country', () => {
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

        return Promise.all([user.save(), recommend2.save(),])
            .then(([user, recommend2]) =>
                expect(getRecommendByCategoryCountry(user.id, 1, true)
                ).to.be.rejectedWith(ValidationError, /^invalid country$/)

            )
    })


    //add validation error test cases
    //add system error test cases

    after(() => db.disconnect())
})