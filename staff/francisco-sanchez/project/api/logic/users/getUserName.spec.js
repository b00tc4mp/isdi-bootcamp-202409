import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, SystemError, ValidationError } = errors

import getUserName from './getUserName.js'

describe('getUserName', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany()]))

    it('succeeds on valid userId and targetUserId', async () => {
        const user1 = await User.create({ username: 'Risto1', password: 'password123', email: 'risto1@example.com', name: 'Risto Provider' })
        const user2 = await User.create({ username: 'Risto2', password: 'password456', email: 'risto2@example.com', name: 'Risto Customer' })

        const result = await getUserName(user1._id.toString(), user2._id.toString())

        expect(result).to.exist
        expect(result).to.equal('Risto Customer')
    })

    it('fails on non-existing userId', () =>
        expect((async () => {
            const user2 = await User.create({ username: 'Risto2', password: 'password456', email: 'risto2@example.com', name: 'Risto Customer' })
            await getUserName('609c01a8f1b5c17d0cd10a77', user2._id.toString()) // Non-existent user ID
        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-existing targetUserId', () =>
        expect((async () => {
            const user1 = await User.create({ username: 'Risto1', password: 'password123', email: 'risto1@example.com', name: 'Risto Provider' })
            await getUserName(user1._id.toString(), '609c01a8f1b5c17d0cd10a77') // Non-existent target user ID
        })()).to.be.rejectedWith(NotFoundError, 'target user not found')
    )

    it('fails on invalid userId format', () =>
        expect((async () => {
            const user2 = await User.create({ username: 'Risto2', password: 'password456', email: 'risto2@example.com', name: 'Risto Customer' })
            await getUserName('invalid-user-id', user2._id.toString())
        })()).to.be.rejectedWith(ValidationError, 'invalid userId')
    )

    it('fails on invalid targetUserId format', () =>
        expect((async () => {
            const user1 = await User.create({ username: 'Risto1', password: 'password123', email: 'risto1@example.com', name: 'Risto Provider' })
            await getUserName(user1._id.toString(), 'invalid-target-id')
        })()).to.be.rejectedWith(ValidationError, 'invalid targetUserId')
    )

    after(() => db.disconnect())
})
