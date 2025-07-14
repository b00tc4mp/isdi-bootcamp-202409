import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Match } from 'dat'
import getUserMatches from './getUserMatches.js'

describe('getUserMatches', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([
        User.deleteMany(),
        Match.deleteMany()
    ]))

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on getting user matches', async () => {
        const user1 = await User.create({
            ...mockUserData,
            email: 'user1@test.com',
            name: 'User1',
            profilePicture: 'pic1.jpg',
            pictures: ['pic1.jpg'],
            dateOfBirth: new Date('1990-01-01'),
            location: 'Barcelona',
            bio: 'Hello!',
            artists: [{ id: '1', name: 'Artist1' }]
        })
        const user2 = await User.create({
            ...mockUserData,
            email: 'user2@test.com',
            name: 'User2',
            profilePicture: 'pic2.jpg',
            pictures: ['pic2.jpg']
        })
        const user3 = await User.create({
            ...mockUserData,
            email: 'user3@test.com',
            name: 'User3',
            profilePicture: 'pic3.jpg',
            pictures: ['pic3.jpg']
        })

        await Match.create({
            users: [user1.id, user2.id],
            messages: [],
            lastActivity: new Date()
        })

        await Match.create({
            users: [user1.id, user3.id],
            messages: [],
            lastActivity: new Date(Date.now() - 1000) // Older
        })

        const matches = await getUserMatches(user1.id)

        expect(matches).to.be.an('array')
        expect(matches).to.have.lengthOf(2)
        expect(matches[0].users).to.have.lengthOf(2)
        expect(matches[0].users[0].name).to.exist
        expect(matches[0].users[0].profilePicture).to.exist
        // Should be sorted by lastActivity (most recent first)
        expect(matches[0].users.map(u => u.name)).to.include('User2')
    })

    it('returns empty array when user has no matches', async () => {
        const user = await User.create({ ...mockUserData, email: 'user@test.com' })

        const matches = await getUserMatches(user.id)

        expect(matches).to.be.an('array')
        expect(matches).to.have.lengthOf(0)
    })

    it('populates correct user fields', async () => {
        const user1 = await User.create({
            ...mockUserData,
            email: 'user1@test.com',
            name: 'User1',
            profilePicture: 'pic1.jpg',
            pictures: ['pic1.jpg', 'pic2.jpg'],
            dateOfBirth: new Date('1990-01-01'),
            location: 'Barcelona',
            coordinates: { type: 'Point', coordinates: [2.1734, 41.3851] },
            distance: 50,
            bio: 'Test bio',
            artists: [{ id: '1', name: 'Artist1' }]
        })
        const user2 = await User.create({
            ...mockUserData,
            email: 'user2@test.com',
            name: 'User2'
        })

        await Match.create({
            users: [user1.id, user2.id],
            messages: []
        })

        const matches = await getUserMatches(user1.id)

        expect(matches[0].users[0]).to.have.all.keys(
            '_id', 'name', 'profilePicture', 'pictures', 'dateOfBirth',
            'location', 'coordinates', 'distance', 'bio', 'artists'
        )
    })

    after(() => db.disconnect())
})