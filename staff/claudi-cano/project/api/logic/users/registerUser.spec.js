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
    before(async () => await db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('Claudi Cano', 'claudi@cano.com', 'ClauStark', '123123123', '123123123')

        const user = await User.findOne({ username: 'ClauStark' })

        expect(user).to.exist //.not.to.be.null
        expect(user.name).to.equal('Claudi Cano')
        expect(user.email).to.equal('claudi@cano.com')
        expect(user.username).to.equal('ClauStark')
        expect(bcrypt.compareSync('123123123', user.password)).to.be.true
    })

    debugger
    it('fails on existing user', () =>
        expect((async () => {
            await registerUser('Claudi Cano', 'claudi@cano.com', 'ClauStark', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    after(async () => await db.disconnect())
})