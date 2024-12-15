import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from '../../../dat/index.js'
import errors from '../../../com/errors.js'

const { DuplicityError } = errors

import registerUser from './registerUser.js'
import { beforeEach, describe } from 'mocha'

const user1 = {
    name: 'Antonio Banderas',
    email: 'abanderas@spain.net',
    username: 'banderas',
    password: '123456789'
}

describe('registerUser', () => {
    before(() => db.connect('mongodb://127.0.0.1:27017/mired-test')) //process.env.MONGO_ULR_TEST

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser(user1.name,
            user1.email,
            user1.username,
            user1.password,
            user1.password
        )
        const user = await User.findOne({ username: user1.username })

        expect(user).to.exist
        expect(user.name).to.equal(user1.name)
        expect(user.email).to.equal(user1.email)
        expect(user.username).to.equal(user1.username)
        expect(bcrypt.compareSync(user1.password, user.password)).to.be.true
    })

    debugger
    it('fails on existing user', () =>
        expect((async () => {
            await User.create({
                name: user1.name,
                email: user1.email,
                username: user1.username,
                password: bcrypt.hashSync(user1.password, 10)
            })
            await registerUser(
                user1.name,
                user1.email,
                user1.username,
                user1.password,
                user1.password)

        })()).to.be.rejectedWith(DuplicityError, 'user already registered')
    )

    after(() => db.disconnect())
})
