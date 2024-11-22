import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';
import bcrypt from 'bcryptjs'

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
                expect(bcrypt.compareSync('123123123', user.password)).to.be.true
            })
    )
    it('fails on existing user', () =>
        expect(
            User.create({ name: 'Chomo Loco', email: 'chomo@loco.com', username: 'chomoloco', password: bcrypt.hashSync('123123123', 10) })
                .then(() => registerUser('Chomo Loco', 'chomo@loco.com', 'chomoloco', '123123123', '123123123'))
        ).to.be.rejectedWith(DuplicityError, 'user already exists')
    )
    after(() => db.disconnect())
})