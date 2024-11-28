import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { ValidationError, NotFoundError, SystemError } = errors

import toggleLikePost from './toggleLikePost.js'


describe('toggleLikePost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for like post', () => {
        const user = new User({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
        const post = new Post({ author: user.id, image: 'https://image.com', text: 'hola manola' })

        //Siempre que trabajemos con promesas tenemos que añadir un return
        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                toggleLikePost(user.id, post.id)
                    .then(() => Post.findById(post.id))
                    .then((post => {
                        expect(post.likes).to.have.lengthOf(1)
                        //Aquí tengo que mirar la primera posición del string
                        //el .to.equal lo usamos para verificar que sea igual 
                        expect(post.likes[0].toString()).to.equal(user.id)
                    }))
            )
    })


    it('succeeds for remove existing like', () => {
        const user = new User({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
        const post = new Post({ author: user.id, image: 'https://image.com', text: 'hola manola' })

        //Siempre que trabajemos con promesas tenemos que añadir un return
        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                //Llamaremos a la función dos veces, para que la priemra le ponga el like y la segunda se lo quite
                toggleLikePost(user.id, post.id),
                toggleLikePost(user.id, post.id)
                    .then(() => Post.findById(post.id))
                    .then((post => {
                        expect(post.likes).to.have.lengthOf(0)
                    }))
            )
    })



    it('fails on non-existing user', () =>

        expect(
            Post.create({ author: '012345678901234567890123', image: 'https://image.com', text: 'hola manola' })
                .then(post =>
                    toggleLikePost('012345678901234137890123', post.id)
                )
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )



    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
                .then(user =>
                    toggleLikePost(user.id, '012345678901234567890999')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )


    after(() => db.disconnect())
})
