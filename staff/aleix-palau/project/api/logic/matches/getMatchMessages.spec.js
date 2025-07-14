import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import mongoose from 'mongoose'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Match } from 'dat'
import getMatchMessages from './getMatchMessages.js'
import { errors } from 'com'

const { NotFoundError, AuthorizationError } = errors

describe('getMatchMessages', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([
        User.deleteMany(),
        Match.deleteMany()
    ]))

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on getting messages from match', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        const messages = [
            {
                _id: new mongoose.Types.ObjectId(),
                sender: user1.id,
                text: 'Hello!',
                timestamp: new Date()
            },
            {
                _id: new mongoose.Types.ObjectId(),
                sender: user2.id,
                text: 'Hi there!',
                timestamp: new Date()
            }
        ]

        const match = await Match.create({
            users: [user1.id, user2.id],
            messages
        })

        const result = await getMatchMessages(user1.id, match.id)

        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(2)
        expect(result[0].text).to.equal('Hello!')
        expect(result[1].text).to.equal('Hi there!')
    })

    it('returns empty array when match has no messages', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        const match = await Match.create({
            users: [user1.id, user2.id],
            messages: []
        })

        const result = await getMatchMessages(user1.id, match.id)

        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(0)
    })

    it('fails when user is not part of the match', async () => {
        const user1 = await User.create({ ...mockUserData, email: 'user1@test.com' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })
        const user3 = await User.create({ ...mockUserData, email: 'user3@test.com' })

        const match = await Match.create({
            users: [user1.id, user2.id],
            messages: []
        })

        expect(
            getMatchMessages(user3.id, match.id)
        ).to.be.rejectedWith(AuthorizationError, 'user is not part of this match')
    })

    it('fails on non-existing match', () =>
        expect(
            User.create({ ...mockUserData, email: 'user@test.com' })
                .then(user => getMatchMessages(user.id, '000000000000000000000000'))
        ).to.be.rejectedWith(NotFoundError, 'match not found')
    )

    after(() => db.disconnect())
})