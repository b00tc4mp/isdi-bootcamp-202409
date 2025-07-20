import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import updateUserScore from './updateUserScore.js'

describe('updateUserScore', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), score: 500 })

        await updateUserScore(user.id, 200)

        const foundUser = await User.findById(user.id)

        expect(foundUser).to.exist
        expect(foundUser!.score).to.equal(700)
    })

    it('fails on non-existing user', () => {
        expect(
            updateUserScore('012345678901234567890123', 200)
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    it('fails on non-valid userId length', () => {
        expect(() => {
            updateUserScore('0123', 200)
        }).to.throw(ValidationError, /^Invalid userId length$/)
    })

    it('fails on non-valid score', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), score: 500 })
        expect(() =>
            updateUserScore(user.id, 1000)
        ).to.throw(ValidationError, /^Invalid score number$/)
    })

    after(() => db.disconnect())
})