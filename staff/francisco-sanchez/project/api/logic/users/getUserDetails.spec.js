import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, SystemError, ValidationError } = errors

import getUserDetails from './getUserDetails.js'

describe('getUserDetails', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany()]))

    it('succeeds on valid user and targetUserId', async () => {
        const user1 = await User.create({ username: 'Risto1', password: 'password123', email: 'risto1@example.com' })
        const user2 = await User.create({ username: 'Risto2', password: 'password456', email: 'risto2@example.com' })
        const result = await getUserDetails(user1._id.toString(), user2._id.toString())
        const result2 = await getUserDetails(user2._id.toString(), user1._id.toString())

        expect(result).to.exist
        expect(result.username).to.equal('Risto2')
        expect(result.email).to.equal('risto2@example.com')

        expect(result2).to.exist
        expect(result2.username).to.equal('Risto1')
        expect(result2.email).to.equal('risto1@example.com')
    })

    it('fails on non-existing userId', () =>
        expect((async () => {
            const user2 = await User.create({ username: 'Risto2', password: 'password456', email: 'risto2@example.com' })
            await getUserDetails('609c01a8f1b5c17d0cd10a77', user2._id.toString()) // Non-existent user ID
        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-existing targetUserId', () =>
        expect((async () => {
            const user1 = await User.create({ username: 'Risto1', password: 'password123', email: 'risto1@example.com' })
            await getUserDetails(user1._id.toString(), '609c01a8f1b5c17d0cd10a77') // Non-existent target user ID
        })()).to.be.rejectedWith(NotFoundError, 'targetUser not found')
    )

    it('fails on invalid userId format', () =>
        expect((async () => {
            const user2 = await User.create({ username: 'Risto2', password: 'password456', email: 'risto2@example.com' })
            await getUserDetails('invalid-user-id', user2._id.toString())
        })()).to.be.rejectedWith(ValidationError, 'invalid userId')
    )

    it('fails on invalid targetUserId format', () =>
        expect((async () => {
            const user1 = await User.create({ username: 'Risto1', password: 'password123', email: 'risto1@example.com' })
            await getUserDetails(user1._id.toString(), 'invalid-target-id')
        })()).to.be.rejectedWith(ValidationError, 'invalid targetUserId')
    )



    after(() => db.disconnect())
})
