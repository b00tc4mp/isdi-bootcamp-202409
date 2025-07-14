import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Match, Notification } from 'dat'
import sendMessage from './sendMessage.js'
import { errors } from 'com'

const { NotFoundError, AuthorizationError, ValidationError } = errors

describe('sendMessage', () => {
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

    it('succeeds on sending message', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        const match = await Match.create({
            users: [user1.id, user2.id],
            messages: []
        })

        const message = await sendMessage(user1.id, match.id, 'Hello there!')

        expect(message).to.exist
        expect(message._id).to.exist
        expect(message.sender.toString()).to.equal(user1.id)
        expect(message.text).to.equal('Hello there!')
        expect(message.timestamp).to.exist

        // Check message was saved
        const updatedMatch = await Match.findById(match.id)
        expect(updatedMatch.messages).to.have.lengthOf(1)
        expect(updatedMatch.lastActivity).to.exist

        // Check notification was created
        const notification = await Notification.findOne({
            to: user2.id,
            type: 'message'
        })
        expect(notification).to.exist
        expect(notification.matchId.toString()).to.equal(match.id)
    })

    it('trims message text', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        const match = await Match.create({
            users: [user1.id, user2.id],
            messages: []
        })

        const message = await sendMessage(user1.id, match.id, '  Hello!  ')

        expect(message.text).to.equal('Hello!')
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
            sendMessage(user3.id, match.id, 'Hello!')
        ).to.be.rejectedWith(AuthorizationError, 'user is not part of this match')
    })

    it('fails on non-existing match', () =>
        expect(
            User.create({ ...mockUserData, email: 'user@test.com' })
                .then(user => sendMessage(user.id, '000000000000000000000000', 'Hello!'))
        ).to.be.rejectedWith(NotFoundError, 'match not found')
    )

    it('fails on empty message', () => {
        expect(() => sendMessage('654321098765432109876543', '654321098765432109876544', '   '))
            .to.throw(ValidationError)
    })

    it('fails on message too long', () => {
        const longMessage = 'a'.repeat(501)
        expect(() => sendMessage('654321098765432109876543', '6543210987654akil', longMessage))
            .to.throw(ValidationError)
    })

    after(() => db.disconnect())
})