import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai
import { describe } from 'mocha'


import db, { User, Recommend } from '../../../dat/index.js'
import errors from '../../../com/errors.js'

const { NotFoundError, ValidationError, SystemError } = errors

import downVote from './downVote.js'

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
                downVote(user.id, recommend.id)
                    .then(() => Recommend.findOne())
                    .then(recommend => {
                        console.log(recommend)
                        expect(recommend.downVotes).to.exist
                        expect(recommend.downVotes).to.have.lengthOf(1)
                        expect(recommend.downVotes[0].toString()).to.equal(user.id)


                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            downVote('012345678901234567890123', '012345678901234567890124')
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
                    downVote(user.id, '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^recommendation not found$/)
    )

    //TODO need to add validation error test case
    //TODO need to add system error test case

    after(() => db.disconnect())
})








/*const recommend1 = {
    author: user.id,
    city: 'Lisboa',
    country: 'Portugal',
    category: 1,
    link: 'https://sede.madrid.es',
    imageUrl: 'https://tugestionespana.com/wp-content/uploads/2022/10/padron-empadronamiento-madrid-espana-768x768.jpg',
    subject: 'empadronamiento',
    recommend: '1. ¿Qué es el empadronamiento? El empadronamiento es el registro administrativo que acredita dónde resides. Este registro lo gestiona el Ayuntamiento de Madrid y es obligatorio para todas las personas que viven en el municipio, independientemente de su nacionalidad o situación legal.'
}*/
