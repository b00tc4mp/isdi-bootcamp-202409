import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { CredentialsError } = errors

import authenticateUser from './authenticateUser.js'

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
            .then(() => authenticateUser('voromir', 'voromir'))
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.be.a.string
                expect(user.id).to.have.lengthOf(24)
                expect(user.role).to.equal('regular')
            })
    )

    it('fails on non-existing user', () =>
        expect(
            authenticateUser('voromir', 'lacomarca')
        ).to.be.rejectedWith(CredentialsError, 'User or pass incorrect')
    )
})