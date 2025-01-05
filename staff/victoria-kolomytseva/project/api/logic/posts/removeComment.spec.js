import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, OwnershipError } = errors

import removeComment from './removeComment.js'


describe('removeComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Juan Pérez', email: 'juan.perez@example.com', password: '123123123' })
        const comment = new Comment({
            author: user.id,
            text: 'Hellow world'
        })
        const post = new Post({
            author: user.id,
            image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600",
            text: "We have lost our Pug named Lolo on Sant Oleguer Street 12, Vilassar de Mar, on 11/22/24. He is beige with a black muzzle, and his belly has lighter fur. If you see him, please contact us. A reward is offered. Thank you for your help!",
            petType: 'dog',
            petGender: 'male',
            whatHappened: 'lost',
            comments: [comment],
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

        return Promise.all([user.save(), comment.save(), post.save()])
            .then(([user, comment, post]) =>
                removeComment(user.id, post.id, comment.id)
                    .then(() => Comment.findOne())
                    .then(comment => {
                        expect(comment).to.null;
                    })
            )
    })

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Juan Pérez', email: 'juan.perez@example.com', password: '123123123' })
                .then(user =>
                    removeComment(user.id, '012345678901234567890123', '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    it('fails on non-existing comment', () => {
        const user = new User({ name: 'Juan Pérez', email: 'juan.perez@example.com', password: '123123123' })
        const post = new Post({
            author: user.id,
            image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600",
            text: "We have lost our Pug named Lolo on Sant Oleguer Street 12, Vilassar de Mar, on 11/22/24. He is beige with a black muzzle, and his belly has lighter fur. If you see him, please contact us. A reward is offered. Thank you for your help!",
            petType: 'dog',
            petGender: 'male',
            whatHappened: 'lost',
            comments: [],
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

        return expect(
            Promise.all([user.save(), post.save()])
                .then(([user, post]) =>
                    removeComment(user.id, post.id, '012345678901234567890123')
                )
        ).to.be.rejectedWith(NotFoundError, /^comment not found$/)
    })

    it('fails on non-own comment', () => {
        const user = new User({ name: 'Juan Pérez', email: 'juan.perez@example.com', password: '123123123' })
        const user2 = new User({ name: 'Juan Pérez 2', email: 'juan.perez2@example.com', password: '123123123' })
        const comment = new Comment({
            author: user.id,
            text: 'Hellow world'
        })
        const post = new Post({
            author: user.id,
            image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600",
            text: "We have lost our Pug named Lolo on Sant Oleguer Street 12, Vilassar de Mar, on 11/22/24. He is beige with a black muzzle, and his belly has lighter fur. If you see him, please contact us. A reward is offered. Thank you for your help!",
            petType: 'dog',
            petGender: 'male',
            whatHappened: 'lost',
            comments: [comment],
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

        return expect(
            Promise.all([user.save(), user2.save(), post.save()])
                .then(([user, user2, post]) =>
                    removeComment(user2.id, post.id, post.comments[0].id)
                )
        ).to.be.rejectedWith(OwnershipError, /^user not author of comment$/)
    })

    //si no existe usario deletePost falla
    it('fails on non-existing user', () =>
        expect(
            removeComment('012345678901234567890123', '012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => removeComment(true)).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => removeComment('0123')).to.throw(ValidationError, /^invalid userId length$/)
    )

    after(() => db.disconnect())
})
