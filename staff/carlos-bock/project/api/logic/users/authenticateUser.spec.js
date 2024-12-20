import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from '../../../dat/index.js'
import errors from '../../../com/errors.js'

const { CredentialsError } = errors

import authenticateUser from './authenticateUser.js'
import { before, beforeEach, describe } from 'mocha' // comment out for testing

debugger

describe('authenticateUser', () => {
    before(() => db.connect('mongodb://127.0.0.1:27017/mired-test')) //process.env.MONGO_ULR_TEST

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        await User.create({
            name: 'Luis Fonci',
            email: 'fonci@pr.net',
            username: 'lfonci25',
            password: bcrypt.hashSync('123456789', 10),
        })

        const user = await authenticateUser('lfonci25', '123456789')

        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal('regular')
    })

    it('fails on non-existing user', () =>
        expect(
            authenticateUser('lfonci25', '123456789')
        ).to.be.rejectedWith(CredentialsError, 'wrong credentials')
    )

    after(() => db.disconnect())
})