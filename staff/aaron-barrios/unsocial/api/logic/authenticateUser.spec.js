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

//debugger

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany()) //callback para cada test (it)

    it('succeeds on existing user', () =>
        User.create({ name: 'aaron', email: 'aaron@ar.com', username: 'aaron', password: bcrypt.hashSync('123') })
            .then(() => authenticateUser('aaron', '123'))
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.be.a.string
                expect(user).to.have.lengthOf(24)
                expect(user.role).to.equal('regular')
            })
    )

    it('fails on non-existing user', () =>
        expect(
            authenticateUser('aaron', '123')
        ).to.be.rejectedWith(CredentialsError, 'wrong credentials')
    )

    after(() => db.disconnect())
})



