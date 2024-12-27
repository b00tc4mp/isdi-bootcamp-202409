import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import setNewUserStatus from './setNewUserStatus.js'

describe('setNewUserStatus', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user, status 0, from onepiecedle', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), status: 0 })

        await setNewUserStatus(user.id, 0, 'onepiecedle')

        const foundUser = await User.findById(user.id).lean()

        expect(foundUser).to.exist
        expect(foundUser!.status).to.equal(1)
    })

    it('succeeds on existing user, status 0, from onedoku', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), status: 0 })

        await setNewUserStatus(user.id, 0, 'onedoku')

        const foundUser = await User.findById(user.id).lean()

        expect(foundUser).to.exist
        expect(foundUser!.status).to.equal(2)
    })

    it('succeeds on existing user, status 1, from onepiecedle', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), status: 1 })

        await setNewUserStatus(user.id, user.status, 'onepiecedle')

        const foundUser = await User.findById(user.id).lean()

        expect(foundUser).to.exist
        expect(foundUser!.status).to.equal(1)
    })

    it('succeeds on existing user, status 1, from onedoku', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), status: 1 })

        await setNewUserStatus(user.id, user.status, 'onedoku')

        const foundUser = await User.findById(user.id).lean()

        expect(foundUser).to.exist
        expect(foundUser!.status).to.equal(3)
    })

    it('succeeds on existing user, status 2, from onedoku', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), status: 2 })

        await setNewUserStatus(user.id, user.status, 'onedoku')

        const foundUser = await User.findById(user.id).lean()

        expect(foundUser).to.exist
        expect(foundUser!.status).to.equal(2)
    })

    it('succeeds on existing user, status 2, from onepiecedle', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), status: 2 })

        await setNewUserStatus(user.id, user.status, 'onepiecedle')

        const foundUser = await User.findById(user.id).lean()

        expect(foundUser).to.exist
        expect(foundUser!.status).to.equal(3)
    })

    it('succeeds on existing user, status 3', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), status: 3 })

        await setNewUserStatus(user.id, user.status, 'onepiecedle')

        const foundUser = await User.findById(user.id).lean()

        expect(foundUser).to.exist
        expect(foundUser!.status).to.equal(3)
    })

    it('fails on non-existing user', () =>
        expect(
            setNewUserStatus('012345678901234567890123', 0, 'onepiecedle')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-valid userId length', () =>
        expect(() =>
            setNewUserStatus('0123', 1, 'onepiecedle')
        ).to.throw(ValidationError, /^Invalid userId length$/)
    )

    it('fails on non-valid status', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        expect(() =>
            setNewUserStatus(user.id, 4, 'onepiecedle')
        ).to.throw(ValidationError, /^Invalid status$/)
    })

    after(() => db.disconnect())
})