import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('suceeds on new user', () =>
        registerUser('Chomo Loco', 'chomo@loco.com', 'chomoloco', '123123123', '123123123')
            .then(() => User.findOne({ username: 'chomoloco' }))
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal('Chomo Loco')
                expect(user.email).to.equal('chomo@loco.com')
                expect(user.username).to.equal('chomoloco')
                expect(user.password).to.equal('123123123')
            })
    )
    it('fails on existing user', () =>
        expect(
            User.create({ name: 'Chomo Loco', email: 'chomo@loco.com', username: 'chomoloco', password: '123123123' })
                .then(() => registerUser('Chomo Loco', 'chomo@loco.com', 'chomoloco', '123123123', '123123123'))
        ).to.be.rejectedWith(DuplicityError, 'user already exists')
    )
    after(() => db.disconnect)
})