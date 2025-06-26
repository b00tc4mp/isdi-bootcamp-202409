import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Match, Notification } from 'dat'
import getUnreadNotifications from './getUnreadNotifications.js'

describe('getUnreadNotifications', () => {
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

    it('succeeds on getting unread notifications', async () => {
        const user1 = await User.create({
            ...mockUserData,
            email: 'user1@test.com',
            name: 'User1',
            profilePicture: 'pic1.jpg'
        })
        const user2 = await User.create({
            ...mockUserData,
            email: 'user2@test.com',
            name: 'User2',
            profilePicture: 'pic2.jpg'
        })
        const user3 = await User.create({
            ...mockUserData,
            email: 'user3@test.com',
            name: 'User3',
            profilePicture: 'pic3.jpg'
        })

        const match1 = await Match.create({ users: [user1.id, user2.id] })
        const match2 = await Match.create({ users: [user1.id, user3.id] })

        // Create match notifications
        await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'match',
            matchId: match1.id,
            read: false
        })

        // Create message notifications
        await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'message',
            matchId: match1.id,
            read: false
        })
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

        const result = await getUnreadNotifications(user1.id)

        expect(result).to.exist
        expect(result.messageNotificationCounts).to.exist
        expect(result.messageNotificationCounts.count).to.equal(3)
        expect(result.messageNotificationCounts.matches).to.deep.equal({
            [match1.id]: 2,
            [match2.id]: 1
        })
        expect(result.pendingMatchNotifications).to.have.lengthOf(1)
        expect(result.pendingMatchNotifications[0].user.name).to.equal('User2')
    })

    it('returns empty result when no unread notifications', async () => {
        const user = await User.create({ ...mockUserData, email: 'user@test.com' })

        const result = await getUnreadNotifications(user.id)

        expect(result).to.deep.equal({
            messageNotificationCounts: {
                count: 0,
                matches: {}
            },
            pendingMatchNotifications: []
        })
    })

    it('excludes read notifications', async () => {
        const user1 = await User.create({
            ...mockUserData,
            email: 'user1@test.com',
            name: 'User1'
        })
        const user2 = await User.create({
            ...mockUserData,
            email: 'user2@test.com',
            name: 'User2'
        })

        const match = await Match.create({ users: [user1.id, user2.id] })

        // Create read notification
        await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'message',
            matchId: match.id,
            read: true
        })

        // Create unread notification
        await Notification.create({
            from: user2.id,
            to: user1.id,
            type: 'message',
            matchId: match.id,
            read: false
        })

        const result = await getUnreadNotifications(user1.id)

        expect(result.messageNotificationCounts.count).to.equal(1)
    })

    after(() => db.disconnect())
})