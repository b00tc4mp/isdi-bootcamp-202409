import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { CredentialsError, ValidationError } = errors

import authenticateUser from './authenticateUser.js'

describe('authenticateUser', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        const user = await authenticateUser('javi', '123123123')

        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal('regular')
    })

    it('succeeds on anonymous user logging in', async () => {
        await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        const anonymousUser = await User.create({ email: 'javi2@gmail.com', username: 'javi2', password: bcrypt.hashSync('123123123', 10), role: 'anonymous' })

        await authenticateUser('javi', '123123123', anonymousUser.id)

        const anonymousUsers = await User.find({ role: 'anonymous' }).lean()

        expect(anonymousUsers.length).to.equal(0)
    })

    it('fails on non-existing user', () =>
        expect(
            authenticateUser('Javi', '123123123')
        ).to.be.rejectedWith(CredentialsError, 'cagaste')
    )

    it('fails on non-matching password', async () => {
        await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        expect(
            authenticateUser('javi', '321321321')
        ).to.be.rejectedWith(CredentialsError, 'cagaste')
    })

    it('fails on non-valid username length', async () => {
        await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        expect(() =>
            authenticateUser('jav', '123123123')
        ).to.throw(ValidationError, /^Username is too short, it should be at least 4 characters long$/)
    })

    after(() => db.disconnect())
})