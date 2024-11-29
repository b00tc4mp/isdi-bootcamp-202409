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

//debugger

describe('registerUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany()) //callback para cada test (it)

    it('succeeds on new user', async () => {
        await registerUser('aaron', 'aaron@ar.com', 'aaron', '123', '123')

        const user = await User.findOne({ username: 'aaron' })

        expect(user).to.exist
        expect(user.name).to.equal('aaron')
        expect(user.email).to.equal('aaron@ar.com')
        expect(user.username).to.equal('aaron')
        expect(bcrypt.compareSync('123', user.password)).to.be.true

    })

    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'aaron', email: 'aaron@ar.com', username: 'aaron', password: bcrypt.hashSync('123') })

            await registerUser('aaron', 'aaron@ar.com', 'aaron', '123', '123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    after(() => db.disconnect())
})



