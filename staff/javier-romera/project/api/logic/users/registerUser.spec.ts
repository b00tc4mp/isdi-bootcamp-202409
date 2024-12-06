import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, ValidationError, NotFoundError } = errors

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

    it('succeeds on anonymous user registering', async () => {
        const anonymousUser = await User.create({ email: 'qwerty@gmail.com', username: 'qwerty', password: bcrypt.hashSync('qwertyqwerty', 10), role: 'anonymous' })

        const { _id } = anonymousUser

        await registerUser('javi@gmail.com', 'javi', '123123123', '123123123', _id.toString())

        const user = await User.findOne({ username: 'javi' })

        expect(user).to.exist
        expect(user!.email).to.equal('javi@gmail.com')
        expect(user!.username).to.equal('javi')
        expect(bcrypt.compareSync('123123123', user!.password)).to.be.true
        expect(user!.role).to.equal('regular')
    })

    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            await registerUser('javi@gmail.com', 'javi', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, /^user already exists$/)
    )

    it('fails on existing user as anonymous', () =>
        expect((async () => {
            await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            const user = await User.create({ email: 'javi2@gmail.com', username: 'javi2', password: bcrypt.hashSync('123123123', 10), role: 'anonymous' })

            await registerUser('javi@gmail.com', 'javi', '123123123', '123123123', user._id.toString())
        })()).to.be.rejectedWith(DuplicityError, /^user already exists$/)
    )

    it('fails on not found user', () =>
        expect((async () => {
            await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            const user = await User.create({ email: 'javi2@gmail.com', username: 'javi2', password: bcrypt.hashSync('123123123', 10), role: 'anonymous' })

            await registerUser('javi@gmail.com', 'javi', '123123123', '123123123', '012345678901234567890123')
        })()).to.be.rejectedWith(NotFoundError, /^user not found$/)
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

    after(() => db.disconnect())
})