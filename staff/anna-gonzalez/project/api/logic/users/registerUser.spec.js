import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
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

    it('succeeds on new user', async () => {
        await registerUser('Anna', 'an@na.com', '123123123', '123123123')

        const user = await User.findOne({ email: 'an@na.com' })

        expect(user).to.exist
        expect(user.name).to.equal('Anna')
        expect(user.email).to.equal('an@na.com')
        expect(bcrypt.compareSync('123123123', user.password)).to.be.true
    })

    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'Anna', email: 'an@na.com', password: bcrypt.hashSync('123123123', 10) })

            await registerUser('Anna', 'an@na.com', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, 'User already exists')
    )

    after(() => db.disconnect())
})