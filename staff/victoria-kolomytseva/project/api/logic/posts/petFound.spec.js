import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import petFound from './petFound.js'


describe('petFound', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user and post', () => {
        const user = new User({ name: 'Pedro Sanchez', email: 'pedro@sanchez.com', password: '123123123' })
        const post = new Post({
            author: user.id, image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600", whatHappened: 'lost', petType: 'cat', petGender: 'female', text: 'We have lost our Pug', location: {
                type: 'Point',
                "coordinates": [
                    41.5064041,
                    2.3913883
                ],
                "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                "province": "Barcelona"
            }
        })


        return Promise.all([user.save(), post.save()])
            .then(([saveduser, savedpost]) =>
                petFound(saveduser.id, savedpost.id)//llamar a la function petFound
                    .then(() => Post.findOne({ _id: savedpost.id }))//buscar post actualizado
                    .then(updatedPost => {
                        expect(updatedPost).to.exist
                        expect(updatedPost.whatHappened).to.equal
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            petFound('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'pedro Loco', email: 'pedro@loco.com', password: '123123123' })
                .then(user =>
                    petFound(user.id, '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    after(() => db.disconnect())
})
