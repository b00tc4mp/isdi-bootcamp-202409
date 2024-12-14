import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Recommend } from '../../../dat/index.js'
import errors from '../../../com/errors.js'

const { NotFoundError, ValidationError, SystemError } = errors

import createRecommend from './createRecommend.js'
import { beforeEach } from 'mocha'
import { describe } from 'mocha'
import e from 'cors'

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

describe('createPost', () => {
    before(() => db.connect('mongodb://127.0.0.1:27017/mired-test')) //process.env.MONGO_ULR_TEST

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
                    'Lisboa',
                    'Portugal',
                    1,
                    1,
                    'https://sede.madrid.es',
                    'https:/www.example.com/image.jpg',
                    'guten tag',
                    'Vida en Lisboa'
                )
                    .then(() => Recommend.findOne())
                    .then(recommend => {
                        expect(recommend).to.exist
                        expect(recommend.author.toString()).to.equal(user.id)
                        expect(recommend.city).to.equal('Lisboa')
                        expect(recommend.country).to.equal('Portugal')
                        expect(recommend.category).to.equal(1)
                        expect(recommend.price).to.equal(1)
                        expect(recommend.link).to.equal('https:/www.example.com')
                        expect(recommend.image).to.equal('https:/www.example.com/image.jpg')
                        expect(recommend.text).to.equal('guten tage')
                        expect(recomment.date).to.be.instanceOf(Date)
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
    ///might have to add min length test

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

    ///might have to add min length test


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
    // add test for link length

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
    ///add length test for validation

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
    ///add length test for validation


    it('fails on non-string recommendation', () =>
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
    ///add length test for validation

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

