import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Match, Notification } from 'dat'
import markMatchNotificationAsRead from './markMatchNotificationAsRead.js'

describe('markMatchNotificationAsRead', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([
        User.deleteMany(),
        Match.deleteMany(),
        Notification.deleteMany()
    ]))

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on marking match notification as read', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        const match = await Match.create({ users: [user1.id, user2.id] })

        const notification = await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'match',
            matchId: match.id,
            read: false
        })

        const result = await markMatchNotificationAsRead(user1.id, notification.id)

        expect(result).to.exist
        expect(result.success).to.be.true
        expect(result.modifiedCount).to.equal(1)

        // Verify notification was marked as read
        const updatedNotification = await Notification.findById(notification.id)
        expect(updatedNotification.read).to.be.true
    })

    it('returns 0 modified when notification already read', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        const match = await Match.create({ users: [user1.id, user2.id] })

        const notification = await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'match',
            matchId: match.id,
            read: true // Already read
        })

        const result = await markMatchNotificationAsRead(user1.id, notification.id)

        expect(result.success).to.be.true
        expect(result.modifiedCount).to.equal(0)
    })

    it('returns 0 modified when notification belongs to different user', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })
        const user3 = await User.create({ ...mockUserData, email: 'user3@test.com' })

        const match = await Match.create({ users: [user1.id, user2.id] })

        const notification = await Notification.create({
            from: user2.id,
            to: user1.id, // Notification is for user1
            type: 'match',
            matchId: match.id,
            read: false
        })

        const result = await markMatchNotificationAsRead(user3.id, notification.id) // user3 trying to mark

        expect(result.success).to.be.true
        expect(result.modifiedCount).to.equal(0)
    })

    it('returns 0 modified when notification is not a match type', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        const match = await Match.create({ users: [user1.id, user2.id] })

        const notification = await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'message', // Not a match notification
            matchId: match.id,
            read: false
        })

        const result = await markMatchNotificationAsRead(user1.id, notification.id)

        expect(result.success).to.be.true
        expect(result.modifiedCount).to.equal(0)
    })

    after(() => db.disconnect())
})