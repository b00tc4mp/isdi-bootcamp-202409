import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Recommend } from '../../../dat/index.js'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getRecommend from './getRecommend.js'

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

describe('getRecommend', () => {
    before(() => db.connect('mongodb://127.0.0.1:27017/mired-test')) //process.env.MONGO_ULR_TEST

    it('succeeds for exisiting user', () => {
        const user = new User({
            name: 'Antonio Banderas',
            email: 'abanderas@spain.net',
            username: 'banderas',
            password: '123456789'
        })
        const recommend = new Recommend({
            author: user.id,
            city: recommend1.city,
            country: recommend1.country,
            category: recommend1.category,
            price: recommend1.price,
            link: recommend1.link,
            imageUrl: recommend1.imageUrl,
            recommend: recommend1.recommend,
            subject: recommend1.subject,
            date: new Date(2024, 11, 11)
        })
        const recommend2 = new Recommend({
            author: user.id,
            city: recommend1.city,
            country: recommend1.country,
            category: recommend1.category,
            price: recommend1.price,
            link: recommend1.link,
            imageUrl: recommend1.imageUrl,
            recommend: recommend1.recommend,
            subject: recommend1.subject,
            date: new Date(2024, 12, 12)
        })

        return Promise.all([user.save(), recommend.save(), recommend2.save()])
            .then(([user, recommend, recommend2]) =>
                getRecommend(user.id)
                    .then(recommend => {
                        expect(recommend[0].id).to.equal(recommend2.id)
                        expect(recommend[0].author.id).to.equal(user.id)
                        expect(recommend[0].author.username).to.equal(user.username)
                        expect(recommend[0].city).to.equal(recommend2.city)
                        expect(recommend[0].country).to.equal(recommend2.country)
                        expect(recommend[0].category).to.equal(recommend2.category)
                        expect(recommend[0].price).to.equal(recommend2.price)
                        expect(recommend[0].link).to.equal(recommend2.link)
                        expect(recommend[0].imageUrl).to.equal(recommend2.imageUrl)
                        expect(recommend[0].recommend).to.equal(recommend2.recommend)
                        expect(recommend[0].subject).to.equal(recommend2.date)

                        expect(recommend[1].id).to.equal(recommend.id)
                        expect(recommend[1].author.id).to.equal(user.id)
                        expect(recommend[1].author.username).to.equal(user.username)
                        expect(recommend[1].city).to.equal(recommend.city)
                        expect(recommend[1].country).to.equal(recommend.country)
                        expect(recommend[1].category).to.equal(recommend.category)
                        expect(recommend[1].price).to.equal(recommend.price)
                        expect(recommend[1].link).to.equal(recommend.link)
                        expect(recommend[1].imageUrl).to.equal(recommend.imageUrl)
                        expect(recommend[1].recommend).to.equal(recommend.recommend)
                        expect(recommend[1].subject).to.equal(recommend.date)

                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            getRecommend('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    //add validation error test cases
    //add system error test cases

    after(() => db.disconnect())
})