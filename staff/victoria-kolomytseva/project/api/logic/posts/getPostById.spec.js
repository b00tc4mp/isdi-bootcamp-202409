import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getPostById from './getPostById.js'


describe('getPostById', () => { // Agrupa todas las pruebas relacionadas con getPost
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Juan Pérez', email: 'juan.perez@example.com', password: '123123123' })
        const post = new Post({
            author: user.id, image: 'https://www.image.com', whatHappened: 'lost', petType: 'cat', petGender: 'female', text: 'We have lost our Pug', date: new Date(2024, 10, 18), location: {
                type: 'Point',
                "coordinates": [
                    41.5064041,
                    2.3913883
                ],
                "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                "province": "Barcelona"
            }
        })

        return Promise.all([user.save(), post.save()])//Guarda el usuario y las publicacion en la base de datos
            .then(([user, post]) =>
                getPostById(user.id, post.id)
                    .then(postById => {
                        expect(postById.id).to.equal(post.id)
                        expect(postById.author.id).to.equal(user.id)
                        expect(postById.image).to.equal(post.image)
                        expect(postById.text).to.equal(post.text)
                        expect(postById.date).to.deep.equal(post.date)

                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            getPostById('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )
})