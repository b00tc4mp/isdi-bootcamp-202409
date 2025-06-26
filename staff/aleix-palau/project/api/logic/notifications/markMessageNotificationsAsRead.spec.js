import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Match, Notification } from 'dat'
import markMessageNotificationsAsRead from './markMessageNotificationsAsRead.js'

describe('markMessageNotificationsAsRead', () => {
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

    it('succeeds on marking message notifications as read', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        const match = await Match.create({ users: [user1.id, user2.id] })

        // Create multiple unread message notifications
        await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'message',
            matchId: match.id,
            read: false
        })
        await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'message',
            matchId: match.id,
            read: false
        })
        await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'message',
            matchId: match.id,
            read: false
        })

        const result = await markMessageNotificationsAsRead(user1.id, match.id)

        expect(result).to.exist
        expect(result.success).to.be.true
        expect(result.modifiedCount).to.equal(3)

        // Verify all notifications were marked as read
        const unreadNotifications = await Notification.find({
            to: user1.id,
            matchId: match.id,
            type: 'message',
            read: false
        })
        expect(unreadNotifications).to.have.lengthOf(0)
    })

    it('only marks notifications for specific match', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })
        const user3 = await User.create({ ...mockUserData, email: 'user3@test.com' })

        const match1 = await Match.create({ users: [user1.id, user2.id] })
        const match2 = await Match.create({ users: [user1.id, user3.id] })

        // Create notifications for different matches
        await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'message',
            matchId: match1.id,
            read: false
        })
        await Notification.create({
            from: user3.id,
            to: user1.id,
            type: 'message',
            matchId: match2.id,
            read: false
        })

        const result = await markMessageNotificationsAsRead(user1.id, match1.id)

        expect(result.modifiedCount).to.equal(1)

        // Verify only match1 notifications were marked
        const match2Notifications = await Notification.find({
            to: user1.id,
            matchId: match2.id,
            type: 'message',
            read: false
        })
        expect(match2Notifications).to.have.lengthOf(1)
    })

    it('returns 0 modified when no unread notifications', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        const match = await Match.create({ users: [user1.id, user2.id] })

        // Create already read notification
        await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'message',
            matchId: match.id,
            read: true
        })

        const result = await markMessageNotificationsAsRead(user1.id, match.id)

        expect(result.success).to.be.true
        expect(result.modifiedCount).to.equal(0)
    })

    it('ignores match notifications', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        const match = await Match.create({ users: [user1.id, user2.id] })

        // Create match notification (not message)
        await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'match',
            matchId: match.id,
            read: false
        })

        const result = await markMessageNotificationsAsRead(user1.id, match.id)

        expect(result.success).to.be.true
        expect(result.modifiedCount).to.equal(0)
    })

    after(() => db.disconnect())
})