import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai
//import { describe } from 'mocha'


import db, { User, Recommend } from '../../../dat/index.js'
import errors from '../../../com/errors.js'

const { NotFoundError, ValidationError, SystemError } = errors

import addComment from './addComment.js'

const user1 = {
    name: 'Luis Fonci',
    email: 'fonci@pr.net',
    username: 'lfonci25',
    password: '123456789'
}

debugger

describe('addComment', () => {
    before(() => db.connect('mongodb://127.0.0.1:27017/mired-test')) //process.env.MONGO_URL_TEST

    beforeEach(() => Promise.all[User.deleteMany(), Recommend.deleteMany()])

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
            recommend: 'guten tag'
        })

        return Promise.all([user.save(), recommend.save()])
            .then(([user, recommend]) =>
                addComment(user.id, recommend.id, 'guten tag')
                    .then(() => Recommend.findOne())
                    .then(recommend => {
                        expect(recommend).to.exist
                        expect(recommend.comments).to.have.lengthOf(1)

                        const [comment] = post.comments
                        expect(comment.author.toString()).to.equal(user.id)
                        expect(comment.text).to.equal('guten tag')
                        expect(comment.date).to.be.instanceOf(Date)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            addComment('012345678901234567890123', '012345678901234567890123', 'guten tag')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({
                name: 'Luis Fonci',
                email: 'fonci@pr.net',
                username: 'lfonci25',
                password: '123456789'
            })
                .then(user =>
                    addComment(user.id, '012345678901234567890123', 'guten tag')
                )
        ).to.be.rejectedWith(NotFoundError, /^recommend not found$/)
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
