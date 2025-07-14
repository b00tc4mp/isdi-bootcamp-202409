import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import authenticateUser from './authenticateUser.js'
import { errors } from 'com'

const { CredentialsError } = errors

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        await User.create({ email: 'al@eix.com', password: bcrypt.hashSync('123123123', 10), coordinates: { type: 'Point', coordinates: [0, 0] } })

        const userId = await authenticateUser('al@eix.com', '123123123')

        expect(userId).to.exist
        expect(userId).to.be.a.string
        expect(userId).to.have.lengthOf(24)
    })

    it('fails on non-existing user', () =>
        expect(
            authenticateUser('al@eix.com', '123123123')
        ).to.be.rejectedWith(CredentialsError, 'Wrong credentials')
    )

    after(() => db.disconnect())
})