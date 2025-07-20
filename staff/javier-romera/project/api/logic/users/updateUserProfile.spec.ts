import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, ValidationError, NotFoundError } = errors

import updateUserProfile from './updateUserProfile.js'

describe('updateUserprofile', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and updating username', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        await updateUserProfile(user.id, 'javiii', '', '', '', '')

        const foundUser = await User.findOne().lean()

        expect(foundUser).to.exist
        expect(foundUser!.username).to.equal('javiii')
        expect(foundUser!.email).to.equal('javi@gmail.com')
    })

    it('succeeds on existing user and updating email', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        await updateUserProfile(user.id, '', 'javiii@gmail.com', '', '', '')

        const foundUser = await User.findOne().lean()

        expect(foundUser).to.exist
        expect(foundUser!.username).to.equal('javi')
        expect(foundUser!.email).to.equal('javiii@gmail.com')
    })

    it('succeeds on existing user and updating username and email', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        await updateUserProfile(user.id, 'javiii', 'javiii@gmail.com', '', '', '')

        const foundUser = await User.findOne().lean()

        expect(foundUser).to.exist
        expect(foundUser!.username).to.equal('javiii')
        expect(foundUser!.email).to.equal('javiii@gmail.com')
    })

    it('succeeds on existing user and updating password', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        await updateUserProfile(user.id, '', '', '123123123', '321321321', '321321321')

        const foundUser = await User.findOne().lean()

        expect(foundUser).to.exist
        expect(bcrypt.compareSync('321321321', foundUser!.password)).to.be.true
    })

    it('succeeds on existing user and updating everything', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        await updateUserProfile(user.id, 'javiii', 'javiii@gmail.com', '123123123', '321321321', '321321321')

        const foundUser = await User.findOne().lean()

        expect(foundUser).to.exist
        expect(foundUser!.username).to.equal('javiii')
        expect(foundUser!.email).to.equal('javiii@gmail.com')
        expect(bcrypt.compareSync('321321321', foundUser!.password)).to.be.true
    })

    it('fails on non-existing user', () => {
        expect(
            updateUserProfile('012345678901234567890123', 'javiii', '', '', '', '')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    it('fails on invalid form', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        expect(() =>
            updateUserProfile(user.id, '', '', '', '', '')
        ).to.throw(/^Invalid form$/)
    })

    it('fails on invalid password fields', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        expect(() =>
            updateUserProfile(user.id, '', '', '123123123', '321321321', '')
        ).to.throw(/^You have to fill all the password fields$/)
    })

    it('fails on invalid old password not matching', () =>
        expect((async () => {
            const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            await updateUserProfile(user.id, '', '', '999999999', '111222333', '111222333')
        })()).to.be.rejectedWith(ValidationError, /^Incorrect old password match$/)
    )

    it('fails on invalid new password not matching', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        expect(() =>
            updateUserProfile(user.id, '', '', '123123123', '111111111', '222222222')
        ).to.throw(ValidationError, /^New passwords do not match$/)
    })

    it('fails on updating already in use username', () =>
        expect((async () => {
            const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            await updateUserProfile(user.id, 'javi', '', '', '', '')
        })()).to.be.rejectedWith(DuplicityError, /^This is your present username$/)
    )

    it('fails on updating already in use email', () =>
        expect((async () => {
            const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            await updateUserProfile(user.id, '', 'javi@gmail.com', '', '', '')
        })()).to.be.rejectedWith(DuplicityError, /^This is your present email$/)
    )

    it('fails on new password equal to old password', () =>
        expect((async () => {
            const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            await updateUserProfile(user.id, '', '', '123123123', '123123123', '123123123')
        })()).to.be.rejectedWith(ValidationError, /^Your new password can\'t be your old password$/)
    )

    it('fails on username already in use by another user', () =>
        expect((async () => {
            const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            await User.create({ email: 'javi2@gmail.com', username: 'javi2', password: bcrypt.hashSync('123123123', 10) })

            await updateUserProfile(user.id, 'javi2', '', '', '', '')
        })()).to.be.rejectedWith(DuplicityError, /^username already in use$/)
    )

    it('fails on email already in use by another user', () =>
        expect((async () => {
            const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            await User.create({ email: 'javi2@gmail.com', username: 'javi2', password: bcrypt.hashSync('123123123', 10) })

            await updateUserProfile(user.id, '', 'javi2@gmail.com', '', '', '')
        })()).to.be.rejectedWith(DuplicityError, /^email already in use$/)
    )

    after(() => db.disconnect())
})