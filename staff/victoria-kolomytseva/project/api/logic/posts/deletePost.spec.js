import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import deletePost from './deletePost.js'


describe('deletePost', () => { // Agrupa todas las pruebas relacionadas con deletePost
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', () =>
        User.create({ name: 'Juan Pérez', email: 'juan.perez@example.com', password: '123123123' })
            .then(user => Promise.all([
                user,
                Post.create({
                    author: user.id,
                    image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600",
                    text: "We have lost our Pug named Lolo on Sant Oleguer Street 12, Vilassar de Mar, on 11/22/24. He is beige with a black muzzle, and his belly has lighter fur. If you see him, please contact us. A reward is offered. Thank you for your help!",
                    petType: 'dog',
                    petGender: 'male',
                    whatHappened: 'lost',
                    location: {
                        "type": "Point",
                        "coordinates": [
                            41.5064041,
                            2.3913883
                        ],
                        "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                        "province": "Barcelona"
                    }
                })
            ]))
            .then(([user, post]) =>
                deletePost(user.id, post.id)
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post).to.null;
                    })
            )
    )
    //si no existe usario deletePost falla
    it('fails on non-existing user', () =>
        expect(
            deletePost('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        User.create({ name: 'Juan Pérez', email: 'juan.perez@example.com', password: '123123123' })
            .then((user) => {
                return expect(
                    deletePost(user._id.toString(), '012345678901234567890123')
                ).to.be.rejectedWith(NotFoundError, /^post not found$/)
            })

    )


    it('fails on non-string user-id', () =>
        expect(() => deletePost(true)).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => deletePost('0123')).to.throw(ValidationError, /^invalid userId length$/)
    )

    after(() => db.disconnect())
})
