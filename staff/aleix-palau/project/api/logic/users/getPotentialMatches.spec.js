import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Heartbeat } from 'dat'
import getPotentialMatches from './getPotentialMatches.js'
import { errors } from 'com'

const { NotFoundError } = errors

describe('getPotentialMatches', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([
        User.deleteMany(),
        Heartbeat.deleteMany()
    ]))

    const createUser = (overrides = {}) => {
        const defaults = {
            email: 'user@test.com',
            password: '123123123',
            name: 'Test User',
            dateOfBirth: new Date('1990-01-01'),
            gender: 'Man',
            targetGender: ['Women'],
            coordinates: { type: 'Point', coordinates: [2.1734, 41.3851] },
            distance: 50,
            minAge: 20,
            maxAge: 40,
            artists: [{ id: 'artist1', name: 'The Strokes' }],
            stage: 'completed'
        }
        return User.create({ ...defaults, ...overrides })
    }

    it('succeeds on finding compatible matches', async () => {
        const user = await createUser({
            email: 'al@eix.com',
            name: 'Aleix',
            dateOfBirth: new Date('1991-08-19'),
            gender: 'Man',
            targetGender: ['Women'],
            minAge: 20,
            maxAge: 30,
            artists: [
                { id: 'artist1', name: 'The Strokes' },
                { id: 'artist2', name: 'Radiohead' }
            ]
        })

        const match1 = await createUser({
            email: 'match1@test.com',
            name: 'Maria',
            dateOfBirth: new Date('1995-01-01'),
            gender: 'Woman',
            targetGender: ['Men'],
            minAge: 25,
            maxAge: 35,
            artists: [
                { id: 'artist1', name: 'The Strokes' },
                { id: 'artist3', name: 'Arctic Monkeys' }
            ]
        })

        const matches = await getPotentialMatches(user.id)

        expect(matches).to.be.an('array')
        expect(matches).to.have.lengthOf(1)
        expect(matches[0]._id.toString()).to.equal(match1.id)
        expect(matches[0].commonArtists).to.deep.equal(['The Strokes'])
        expect(matches[0].commonArtistsCount).to.equal(1)
    })

    it('filters out users who are not interested in requesting user gender', async () => {
        const maleUser = await createUser({
            email: 'male@test.com',
            gender: 'Man',
            targetGender: ['Women']
        })

        // Female user only interested in women
        await createUser({
            email: 'female@test.com',
            gender: 'Woman',
            targetGender: ['Women'] // Not interested in men
        })

        const matches = await getPotentialMatches(maleUser.id)

        expect(matches).to.be.an('array')
        expect(matches).to.have.lengthOf(0)
    })

    it('filters by age preferences of potential match', async () => {
        const youngUser = await createUser({
            email: 'young@test.com',
            dateOfBirth: new Date('2005-01-01'), // 19-20 years old
            targetGender: ['Women']
        })

        // Woman looking for older partners
        await createUser({
            email: 'woman@test.com',
            gender: 'Woman',
            targetGender: ['Men'],
            minAge: 25, // Young user is too young
            maxAge: 35
        })

        const matches = await getPotentialMatches(youngUser.id)

        expect(matches).to.be.an('array')
        expect(matches).to.have.lengthOf(0)
    })

    it('filters by distance preferences of potential match', async () => {
        const barcelonaUser = await createUser({
            email: 'barcelona@test.com',
            coordinates: { type: 'Point', coordinates: [2.1734, 41.3851] }, // Barcelona
            distance: 100
        })

        // Madrid user with small distance preference
        await createUser({
            email: 'madrid@test.com',
            gender: 'Woman',
            targetGender: ['Men'],
            coordinates: { type: 'Point', coordinates: [-3.7038, 40.4168] }, // Madrid (~500km)
            distance: 10 // Barcelona user is too far
        })

        const matches = await getPotentialMatches(barcelonaUser.id)

        expect(matches).to.be.an('array')
        expect(matches).to.have.lengthOf(0)
    })

    it('returns empty array when user has no location', async () => {
        const userNoLocation = await createUser({
            email: 'nolocation@test.com',
            coordinates: null
        })

        const matches = await getPotentialMatches(userNoLocation.id)

        expect(matches).to.be.an('array')
        expect(matches).to.have.lengthOf(0)
    })

    it('excludes users already swiped on', async () => {
        const user = await createUser({ email: 'al@eix.com' })
        const match = await createUser({
            email: 'match@test.com',
            gender: 'Woman',
            targetGender: ['Men']
        })

        await Heartbeat.create({
            sender: user.id,
            receiver: match.id,
            action: 'right'
        })

        const matches = await getPotentialMatches(user.id)

        expect(matches).to.be.an('array')
        expect(matches).to.have.lengthOf(0)
    })

    it('returns empty array when user has no artists', async () => {
        const user = await createUser({
            email: 'noartists@test.com',
            artists: []
        })

        const matches = await getPotentialMatches(user.id)

        expect(matches).to.be.an('array')
        expect(matches).to.have.lengthOf(0)
    })

    it('excludes users without completed profiles', async () => {
        const user = await createUser({ email: 'user@test.com' })

        await createUser({
            email: 'incomplete@test.com',
            gender: 'Woman',
            targetGender: ['Men'],
            stage: 'name-dob' // Not completed
        })

        const matches = await getPotentialMatches(user.id)

        expect(matches).to.be.an('array')
        expect(matches).to.have.lengthOf(0)
    })

    it('handles pagination correctly', async () => {
        const user = await createUser({ email: 'user@test.com' })

        // Create 15 compatible matches
        for (let i = 0; i < 15; i++) {
            await createUser({
                email: `match${i}@test.com`,
                gender: 'Woman',
                targetGender: ['Men'],
                artists: [
                    { id: 'artist1', name: 'The Strokes' },
                    { id: `artist${i}`, name: `Artist ${i}` }
                ]
            })
        }

        // Test default pagination (page 1, limit 10)
        const page1 = await getPotentialMatches(user.id)
        expect(page1).to.have.lengthOf(10)

        // Test page 2
        const page2 = await getPotentialMatches(user.id, 2, 10)
        expect(page2).to.have.lengthOf(5)

        // Test custom limit
        const customLimit = await getPotentialMatches(user.id, 1, 5)
        expect(customLimit).to.have.lengthOf(5)
    })

    it('normalizes invalid pagination parameters', async () => {
        const user = await createUser({ email: 'user@test.com' })

        await createUser({
            email: 'match@test.com',
            gender: 'Woman',
            targetGender: ['Men']
        })

        // Invalid page parameter
        const invalidPage = await getPotentialMatches(user.id, -1, 10)
        expect(invalidPage).to.be.an('array')

        // Invalid limit parameter
        const invalidLimit = await getPotentialMatches(user.id, 1, 150)
        expect(invalidLimit).to.be.an('array')

        // Non-number parameters
        const nonNumbers = await getPotentialMatches(user.id, 'abc', 'xyz')
        expect(nonNumbers).to.be.an('array')
    })

    it('sorts matches by number of common artists', async () => {
        const user = await createUser({
            email: 'user@test.com',
            artists: [
                { id: 'artist1', name: 'Artist 1' },
                { id: 'artist2', name: 'Artist 2' },
                { id: 'artist3', name: 'Artist 3' }
            ]
        })

        // Match with 1 common artist
        await createUser({
            email: 'match1@test.com',
            gender: 'Woman',
            targetGender: ['Men'],
            artists: [{ id: 'artist1', name: 'Artist 1' }]
        })

        // Match with 3 common artists
        await createUser({
            email: 'match3@test.com',
            gender: 'Woman',
            targetGender: ['Men'],
            artists: [
                { id: 'artist1', name: 'Artist 1' },
                { id: 'artist2', name: 'Artist 2' },
                { id: 'artist3', name: 'Artist 3' }
            ]
        })

        // Match with 2 common artists
        await createUser({
            email: 'match2@test.com',
            gender: 'Woman',
            targetGender: ['Men'],
            artists: [
                { id: 'artist1', name: 'Artist 1' },
                { id: 'artist2', name: 'Artist 2' }
            ]
        })

        const matches = await getPotentialMatches(user.id)

        expect(matches).to.have.lengthOf(3)
        expect(matches[0].commonArtistsCount).to.equal(3)
        expect(matches[1].commonArtistsCount).to.equal(2)
        expect(matches[2].commonArtistsCount).to.equal(1)
    })

    it('excludes potential matches without location data', async () => {
        const user = await createUser({ email: 'user@test.com' })

        // Create match without coordinates
        await createUser({
            email: 'match@test.com',
            gender: 'Woman',
            targetGender: ['Men'],
            coordinates: null,
            distance: null
        })

        const matches = await getPotentialMatches(user.id)

        expect(matches).to.have.lengthOf(0)
    })

    it('fails on non-existing user', async () => {
        await expect(
            getPotentialMatches('000000000000000000000000')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    })

    it('handles all gender combinations correctly', async () => {
        // Man seeking women and nonbinary
        const manUser = await createUser({
            email: 'man@test.com',
            gender: 'Man',
            targetGender: ['Women', 'Nonbinary people']
        })

        // Woman seeking men
        const womanMatch = await createUser({
            email: 'woman@test.com',
            gender: 'Woman',
            targetGender: ['Men']
        })

        // Nonbinary seeking men
        const nonbinaryMatch = await createUser({
            email: 'nonbinary@test.com',
            gender: 'Nonbinary',
            targetGender: ['Men']
        })

        // Woman seeking women (not compatible)
        await createUser({
            email: 'woman2@test.com',
            gender: 'Woman',
            targetGender: ['Women']
        })

        const matches = await getPotentialMatches(manUser.id)

        expect(matches).to.have.lengthOf(2)
        const matchEmails = matches.map(m => m._id.toString()).sort()
        expect(matchEmails).to.include(womanMatch.id)
        expect(matchEmails).to.include(nonbinaryMatch.id)
    })

    it('fails on non-existing user', () =>
        expect(
            getPotentialMatches('000000000000000000000000')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    after(() => db.disconnect())
})