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

debugger

describe('authenticateUser', () => {
    Before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        await User.create({ name: 'Claudi Cano', email: 'claudi@cano.com', username: 'ClauStark', password: bcrypt.hashSync('123123123', 10) })

        const user = await authenticateUser('ClauStark', '123123123')

        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal('regular')
    })

    it('fails on non-existing user', () =>
        expect(
            // (async () => (await authenticateUser('cocoloco', '123123123')))()
            authenticateUser('ClauStark', '123123123')
        ).to.be.rejectedWith(CredentialsError, 'wrong credentials')
    )

    after(() => db.disconnect())
})