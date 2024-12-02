import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, ValidationError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('javi@gmail.com', 'javi', '123123123', '123123123')

        const user = await User.findOne({ username: 'javi' })

        expect(user).to.exist
        expect(user!.email).to.equal('javi@gmail.com')
        expect(user!.username).to.equal('javi')
        expect(bcrypt.compareSync('123123123', user!.password)).to.be.true
    })

    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            await registerUser('javi@gmail.com', 'javi', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    it('fails on non-valid username length', () =>
        expect(() => registerUser('javi@gmail.com', 'j', '123123123', '321321321')).to.throw(ValidationError, /^Username is too short, it should be at least 4 characters long$/)
    )

    it('fails on non-valid email', () =>
        expect(() => registerUser('javigmail.com', 'javi', '123123123', '321321321')).to.throw(ValidationError, /^Invalid e-mail$/)
    )

    it('fails on non-matching passwords', () =>
        expect(() => registerUser('javi@gmail.com', 'javi', '123123123', '321321321')).to.throw(ValidationError, /^Passwords do not match$/)
    )

    // TODO SystemError tests (typescript no me deja)

    after(() => db.disconnect())
})