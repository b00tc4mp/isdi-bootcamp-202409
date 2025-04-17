import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import savePlayerState from './savePlayerState.js'

describe('savePlayerState', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: bcrypt.hashSync('123123123', 10) })
            .then(user => savePlayerState(user.id, 10, 10))
            .then(res => {
                expect(res).to.be.undefined

                return User.findOne()
            })
            .then(user => {
                expect(user.coords.x).to.equal(10)
                expect(user.coords.y).to.equal(10)
            })
    )

    // it('fails on non-existing user', () =>
    //     expect(
    //         savePlayerState('012345678901234567890123', 10, 10)
    //     ).to.be.rejectedWith(NotFoundError, 'user not found')
    // )

    after(() => db.disconnect())
})
