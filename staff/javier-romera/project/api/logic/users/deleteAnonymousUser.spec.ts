import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import deleteAnonymousUser from './deleteAnonymousUser.js'

describe('deleteAnonymousUser', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), role: 'anonymous' })

        await deleteAnonymousUser(user._id.toString())

        const user2 = await User.findOne().lean()

        expect(user2).not.to.exist
    })

    it('fails on non-existing user', () => {
        expect(
            deleteAnonymousUser('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    it('fails on non-existing user', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        expect(
            deleteAnonymousUser(user._id.toString())
        ).to.be.rejectedWith(ValidationError, /^user is not anonymous$/)
    })

    it('fails on non-valid userId length', () =>
        expect(() =>
            deleteAnonymousUser('0123')
        ).to.throw(ValidationError, /^Invalid userId length$/)
    )

    after(() => db.disconnect())
})