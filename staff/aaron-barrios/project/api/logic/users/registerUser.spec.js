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

    it('succeds on new user', async () => {
        await registerUser('Cris', 'Cristina', '123', '123')

        const user = await User.findOne({ nickname: 'Cristina' })

        expect(user).to.exist
        expect(user.name).to.equal('Cris')
        expect(user.nickname).to.equal('Cristina')
        expect(bcrypt.compareSync('123', user.password)).to.be.true
    })

    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'Cris', nickname: 'Cristina', password: bcrypt.hashSync('123', 10) })

            await registerUser('Cris', 'Cristina', '123', '123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    after(() => db.disconnect())
})