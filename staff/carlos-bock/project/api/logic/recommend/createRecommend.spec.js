import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Recommend } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import createRecommend from './createRecommend.js'
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

describe('createRecommend', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Recommend.deleteMany()]))

    it('succeeds for exisiting user', () =>
        User.create({
            name: 'Luis Fonci',
            email: 'fonci@pr.net',
            username: 'lfonci25',
            password: '123456789'
        })
            .then(user =>
                createRecommend(
                    user.id,
                    recommend1.city,
                    recommend1.country,
                    recommend1.category,
                    recommend1.price,
                    recommend1.link,
                    recommend1.imageUrl,
                    recommend1.recommend,
                    recommend1.subject
                )
                    .then(() => Recommend.findOne())
                    .then(recommend => {
                        expect(recommend).to.exist
                        expect(recommend.author.toString()).to.equal(user.id)
                        expect(recommend.city).to.equal(recommend1.city)
                        expect(recommend.country).to.equal(recommend1.country)
                        expect(recommend.category).to.equal(recommend1.category)
                        expect(recommend.price).to.equal(recommend1.price)
                        expect(recommend.link).to.equal(recommend1.link)
                        expect(recommend.image).to.equal(recommend1.imageUrl)
                        expect(recommend.text).to.equal(recommend1.recommend)
                        expect(recommend.subject).to.equal(recommend1.subject)
                        expect(recommend.date).to.be.instanceOf(Date)
                    })
            )
    )

    it('fails on non-existing user', () =>
        expect(
            createRecommend('012345678901234567890123',
                recommend1.city,
                recommend1.country,
                recommend1.category,
                recommend1.price,
                recommend1.link,
                recommend1.imageUrl,
                recommend1.recommend,
                recommend1.subject)
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => createRecommend(true,
            recommend1.city,
            recommend1.country,
            recommend1.category,
            recommend1.price,
            recommend1.link,
            recommend1.imageUrl,
            recommend1.recommend,
            recommend1.subject)
        ).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => createRecommend('0152345646',
            recommend1.city,
            recommend1.country,
            recommend1.category,
            recommend1.price,
            recommend1.link,
            recommend1.imageUrl,
            recommend1.recommend,
            recommend1.subject

        )).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('fails on non-string city', () =>
        expect(() => createRecommend(recommend1.userId,
            true,
            recommend1.country,
            recommend1.category,
            recommend1.price,
            recommend1.link,
            recommend1.imageUrl,
            recommend1.recommend,
            recommend1.subject
        )).to.throw(ValidationError, /^invalid text/)
    )

    it('fails on non-string country', () =>
        expect(() => createRecommend(recommend1.userId,
            recommend1.city,
            true,
            recommend1.category,
            recommend1.price,
            recommend1.link,
            recommend1.imageUrl,
            recommend1.recommend,
            recommend1.subject
        )).to.throw(ValidationError, /^invalid text/)
    )


    it('fails on non-number category', () =>
        expect(() => createRecommend(recommend1.userId,
            recommend1.city,
            recommend1.country,
            true,
            recommend1.price,
            recommend1.link,
            recommend1.imageUrl,
            recommend1.recommend,
            recommend1.subject
        )).to.throw(ValidationError, /^invalid category/)
    )

    it('fails on non-number price', () =>
        expect(() => createRecommend(recommend1.userId,
            recommend1.city,
            recommend1.country,
            recommend1.category,
            true,
            recommend1.link,
            recommend1.imageUrl,
            recommend1.recommend,
            recommend1.subject
        )).to.throw(ValidationError, /^invalid price/)
    )

    it('fails on non-string link', () =>
        expect(() => createRecommend(recommend1.userId,
            recommend1.city,
            recommend1.country,
            recommend1.category,
            recommend1.price,
            true,
            recommend1.imageUrl,
            recommend1.recommend,
            recommend1.subject
        )).to.throw(ValidationError, /^invalid link/)
    )

    it('fails on non-string imageUrl', () =>
        expect(() => createRecommend(recommend1.userId,
            recommend1.city,
            recommend1.country,
            recommend1.category,
            recommend1.price,
            recommend1.link,
            true,
            recommend1.recommend,
            recommend1.subject
        )).to.throw(ValidationError, /^invalid link$/)
    )

    it('fails on non-string recommendation', () =>
        expect(() => createRecommend(recommend1.userId,
            recommend1.city,
            recommend1.country,
            recommend1.category,
            recommend1.price,
            recommend1.link,
            recommend1.imageUrl,
            true,
            recommend1.subject
        )).to.throw(ValidationError, /^invalid text/)
    )

    it('fails on non-string subject', () =>
        expect(() => createRecommend(recommend1.userId,
            recommend1.city,
            recommend1.country,
            recommend1.category,
            recommend1.price,
            recommend1.link,
            recommend1.imageUrl,
            recommend1.recommend,
            true
        )).to.throw(ValidationError, /^invalid text/)
    )

    describe('fails on Recommend.create error', () => {
        let create

        beforeEach(() => {
            create = Recommend.create

            Recommend.create = () => Promise.reject(new Error('system error on Recommend.create'))
        })

        it('fails on Recommend.create error', () =>
            expect(
                User.create({
                    name: 'Luis Fonci',
                    email: 'fonci@pr.net',
                    username: 'lfonci25',
                    password: '123456789'
                })
                    .then(user =>
                        createRecommend(user.id,
                            recommend1.city,
                            recommend1.country,
                            recommend1.category,
                            recommend1.price,
                            recommend1.link,
                            recommend1.imageUrl,
                            recommend1.recommend,
                            recommend1.subject
                        )
                    )
            ).to.be.rejectedWith(SystemError, /^system error on Recommend.create$/)
        )
        afterEach(() => Recommend.create = create)
    })
    after(() => db.disconnect())
})

