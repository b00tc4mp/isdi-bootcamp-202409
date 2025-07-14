import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Match, Heartbeat, Notification } from 'dat'
import unmatchUser from './unmatchUser.js'
import { errors } from 'com'

const { NotFoundError, AuthorizationError } = errors

describe('unmatchUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([
        User.deleteMany(),
        Match.deleteMany(),
        Heartbeat.deleteMany(),
        Notification.deleteMany()
    ]))

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on unmatching users', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        // Create heartbeats
        await Heartbeat.create({
            sender: user1.id,
            receiver: user2.id,
            action: 'right'
        })
        await Heartbeat.create({
            sender: user2.id,
            receiver: user1.id,
            action: 'right'
        })

        // Create match
        const match = await Match.create({
            users: [user1.id, user2.id],
            messages: [
                { sender: user1.id, text: 'Hello!' },
                { sender: user2.id, text: 'Hi!' }
            ]
        })

        // Create notifications
        await Notification.create({
            from: user1.id,
            to: user2.id,
            type: 'match',
            matchId: match.id
        })
        await Notification.create({
            from: user1.id,
            to: user2.id,
            type: 'message',
            matchId: match.id
        })

        const result = await unmatchUser(user1.id, match.id)

        expect(result).to.be.true

        // Check match was deleted
        const deletedMatch = await Match.findById(match.id)
        expect(deletedMatch).to.be.null

        // Check heartbeats were deleted
        const heartbeats = await Heartbeat.find({
            $or: [
                { sender: user1.id, receiver: user2.id },
                { sender: user2.id, receiver: user1.id }
            ]
        })
        expect(heartbeats).to.have.lengthOf(0)

        // Check notifications were deleted
        const notifications = await Notification.find({ matchId: match.id })
        expect(notifications).to.have.lengthOf(0)
    })

    it('fails when user is not part of match', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })
        const user3 = await User.create({ ...mockUserData, email: 'user3@test.com' })

        const match = await Match.create({
            users: [user1.id, user2.id],
            messages: []
        })

        expect(
            unmatchUser(user3.id, match.id)
        ).to.be.rejectedWith(AuthorizationError, 'user is not part of this match')
    })

    it('fails on non-existing match', () =>
        expect(
            User.create({ ...mockUserData, email: 'user@test.com' })
                .then(user => unmatchUser(user.id, '000000000000000000000000'))
        ).to.be.rejectedWith(NotFoundError, 'match not found')
    )

    after(() => db.disconnect())
})