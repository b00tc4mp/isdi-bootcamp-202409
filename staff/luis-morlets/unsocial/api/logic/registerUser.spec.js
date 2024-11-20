import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () =>
        registerUser('Pero Lito', 'pero@lito.com', 'perolito', '123123123', '123123123')
            .then(() => User.findOne({ username: 'perolito' }))
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal('Pero Lito')
                expect(user.email).to.equal('pero@lito.com')
                expect(user.username).to.equal('perolito')
                expect(user.password).to.equal('123123123')
            })
    )

    it('fails on user duplicity', () =>
        expect(
            User.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
                .then(() => registerUser('Pero Lito', 'pero@lito.com', 'perolito', '123123123', '123123123'))
        ).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    after(() => db.disconnect())
})