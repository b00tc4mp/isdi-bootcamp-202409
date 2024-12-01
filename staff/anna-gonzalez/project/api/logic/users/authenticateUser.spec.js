import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { CredentialsError } = errors

import authenticateUser from './authenticateUser.js'

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        await User.create({ name: 'Anna', email: 'an@na.com', password: bcrypt.hashSync('123123123', 10) })

        const userId = await authenticateUser('an@na.com', '123123123')

        expect(userId).to.exist
        expect(userId).to.be.a.string
        expect(userId).to.have.lengthOf(24)
    })

    it('fails on non-existing user', () =>
        expect(
            authenticateUser('an@na.com', '123123123')
        ).to.be.rejectedWith(CredentialsError, 'Wrong credentials')
    )

    after(() => db.disconnect())
})