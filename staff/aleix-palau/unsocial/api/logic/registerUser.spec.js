import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () =>
        registerUser('Coco Loco', 'coco@loco.com', 'cocoloco', '123123123', '123123123')
            .then(() => User.findOne({ username: 'cocoloco' }))
            .then(user => {
                expect(user).to.exist //.not.to.be.null
                expect(user.name).to.equal('Coco Loco')
                expect(user.email).to.equal('coco@loco.com')
                expect(user.username).to.equal('cocoloco')
                expect(user.password).to.equal('123123123')
            })
    )

    // it('fails on existing user', () => {
    //     let expectedError

    //     return User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
    //         .then(() => registerUser('Coco Loco', 'coco@loco.com', 'cocoloco', '123123123', '123123123'))
    //         .catch(error => expectedError = error)
    //         .finally(() => {
    //             expect(expectedError).to.be.instanceOf(DuplicityError)
    //             expect(expectedError.message).to.equal('user already exists')
    //         })
    // })

    it('fails on existing user', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(() => registerUser('Coco Loco', 'coco@loco.com', 'cocoloco', '123123123', '123123123'))
        ).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    after(() => db.disconnect())
})