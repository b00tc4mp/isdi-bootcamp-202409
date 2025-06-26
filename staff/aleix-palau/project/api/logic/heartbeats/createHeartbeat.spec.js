import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Heartbeat, Match, Notification } from 'dat'
import createHeartbeat from './createHeartbeat.js'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('createHeartbeat', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([
        User.deleteMany(),
        Heartbeat.deleteMany(),
        Match.deleteMany(),
        Notification.deleteMany()
    ]))

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on creating left swipe', async () => {
        const sender = await User.create({ ...mockUserData, email: 'sender@test.com' })
        const receiver = await User.create({ ...mockUserData, email: 'receiver@test.com' })

        const result = await createHeartbeat(sender.id, receiver.id, 'left')

        expect(result).to.exist
        expect(result.heartbeat).to.exist
        expect(result.heartbeat.sender.toString()).to.equal(sender.id)
        expect(result.heartbeat.receiver.toString()).to.equal(receiver.id)
        expect(result.heartbeat.action).to.equal('left')
        expect(result.match).to.be.null
    })

    it('succeeds on creating right swipe without match', async () => {
        const sender = await User.create({ ...mockUserData, email: 'sender@test.com' })
        const receiver = await User.create({ ...mockUserData, email: 'receiver@test.com' })

        const result = await createHeartbeat(sender.id, receiver.id, 'right')

        expect(result).to.exist
        expect(result.heartbeat).to.exist
        expect(result.heartbeat.action).to.equal('right')
        expect(result.match).to.be.null
    })

    it('creates match on mutual right swipes', async () => {
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

        // First swipe
        await createHeartbeat(user1.id, user2.id, 'right')

        // Mutual swipe
        const result = await createHeartbeat(user2.id, user1.id, 'right')

        expect(result.heartbeat).to.exist
        expect(result.match).to.exist
        expect(result.match.users).to.have.lengthOf(2)
        expect(result.match.users[0]._id.toString()).to.be.oneOf([user1.id, user2.id])
        expect(result.match.users[1]._id.toString()).to.be.oneOf([user1.id, user2.id])

        // Check notifications were created
        const notifications = await Notification.find({ matchId: result.match._id })
        expect(notifications).to.have.lengthOf(2)
    })

    it('fails when user swipes on themselves', () => {
        expect(() => createHeartbeat('654321098765432109876543', '654321098765432109876543', 'right'))
            .to.throw(ValidationError)
    })

    it('fails when already swiped on user', async () => {
        const sender = await User.create({ ...mockUserData, email: 'sender@test.com' })
        const receiver = await User.create({ ...mockUserData, email: 'receiver@test.com' })

        await createHeartbeat(sender.id, receiver.id, 'right')

        expect(
            createHeartbeat(sender.id, receiver.id, 'left')
        ).to.be.rejectedWith(ValidationError)
    })

    it('fails on non-existing sender', () =>
        expect(
            User.create({ ...mockUserData, email: 'receiver@test.com' })
                .then(receiver => createHeartbeat('000000000000000000000000', receiver.id, 'right'))
        ).to.be.rejectedWith(NotFoundError, 'sender not found')
    )

    it('fails on non-existing receiver', () =>
        expect(
            User.create({ ...mockUserData, email: 'sender@test.com' })
                .then(sender => createHeartbeat(sender.id, '000000000000000000000000', 'right'))
        ).to.be.rejectedWith(NotFoundError, 'receiver not found')
    )

    after(() => db.disconnect())
})