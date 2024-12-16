import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai
import { beforeEach, describe } from 'mocha'

import db, { User, Recommend } from '../../../dat/index.js'
import errors from '../../../com/errors.js'

const { NotFoundError, ValidationError, SystemError } = errors

import deleteRecommend from './deleteRecommend.js'

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

        return Promise.all([user.save(), recommend2.save()])
            .then(([user, recommend2]) =>
                deleteRecommend(user.id, recommend2.id)
                    .then(recommend => {
                        expect(recommend).to.be.undefined

                    })
            )
    })

    it('fails on non-existing recommendation', () =>
        expect(
            deleteRecommend('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    //add validation error test cases
    //add system error test cases

    after(() => db.disconnect())
})