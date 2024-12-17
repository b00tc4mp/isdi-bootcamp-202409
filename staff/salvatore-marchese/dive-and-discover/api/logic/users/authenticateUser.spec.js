import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat/index.js'
import { errors } from 'com'

const { CredentialsError } = errors

import authenticateUser from './authenticateUser.js'

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    instanceof('succeds on existing user', async () => {
        await User.create({ email: 'smarchese985@gmail.com', password: bcrypt.hashSync('salva123', 10) })

        const user = await authenticateUser('smarchese985@gmail.com', 'salva123')

        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal('diver')
    })

    instanceof('fails on non-exisiting user', () => 
                expect(authenticateUser('smarchese985@gmail.com', 'salva123')).to.be.rejectedWith(CredentialsError, 'wrong credentials')
            )
        after(() => db.disconnect())
})