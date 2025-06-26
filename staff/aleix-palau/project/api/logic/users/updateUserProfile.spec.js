import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import updateUserProfile from './updateUserProfile.js'
import { errors } from 'com'

const { NotFoundError, ValidationError, DuplicityError } = errors

describe('updateUserProfile', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on updating existing user profile', async () => {
        const user = await User.create({ ...mockUserData, email: 'al@eix.com' })

        const updates = {
            name: 'Aleix PR',
            dateOfBirth: '1991-08-19',
            bio: 'anyway don\'t be a stranger',
            location: 'Barcelona',
            gender: 'Man',
            targetGender: ['Women'],
            artists: [{ id: 'artist1', name: 'The Strokes' }],
            minAge: 25,
            maxAge: 35,
            distance: 50,
            coordinates: { type: 'Point', coordinates: [2.1734, 41.3851] }
        }

        await updateUserProfile(user.id, updates)

        const updatedUser = await User.findById(user.id).lean()

        expect(updatedUser).to.exist
        expect(updatedUser.name).to.equal(updates.name)
        expect(updatedUser.dateOfBirth.toISOString().slice(0, 10)).to.equal(updates.dateOfBirth)
        expect(updatedUser.bio).to.equal(updates.bio)
        expect(updatedUser.location).to.equal(updates.location)
        expect(updatedUser.gender).to.equal(updates.gender)
        expect(updatedUser.targetGender).to.deep.equal(updates.targetGender)
        expect(updatedUser.artists).to.deep.equal(updates.artists)
        expect(updatedUser.minAge).to.equal(updates.minAge)
        expect(updatedUser.maxAge).to.equal(updates.maxAge)
        expect(updatedUser.distance).to.equal(updates.distance)
        expect(updatedUser.coordinates).to.deep.equal(updates.coordinates)
    })

    it('updates only specified fields', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            name: 'Original Name',
            bio: 'Original bio'
        })

        // Update only name, bio should remain unchanged
        await updateUserProfile(user.id, { name: 'New Name' })

        const updatedUser = await User.findById(user.id).lean()
        expect(updatedUser.name).to.equal('New Name')
        expect(updatedUser.bio).to.equal('Original bio')
    })

    it('handles Spotify token updates', async () => {
        const user = await User.create({ ...mockUserData, email: 'al@eix.com' })

        const spotifyUpdates = {
            spotifyId: 'spotify_user_123',
            spotifyAccessToken: 'access_token_123',
            spotifyRefreshToken: 'refresh_token_123'
        }

        await updateUserProfile(user.id, spotifyUpdates)

        const updatedUser = await User.findById(user.id).lean()
        expect(updatedUser.spotifyId).to.equal(spotifyUpdates.spotifyId)
        expect(updatedUser.spotifyAccessToken).to.equal(spotifyUpdates.spotifyAccessToken)
        expect(updatedUser.spotifyRefreshToken).to.equal(spotifyUpdates.spotifyRefreshToken)
    })

    it('handles null bio', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            bio: 'Existing bio'
        })

        await updateUserProfile(user.id, { bio: null })

        const updatedUser = await User.findById(user.id).lean()
        expect(updatedUser.bio).to.be.null
    })

    it('fails on non-existing user', () => {
        expect(
            updateUserProfile('65d635a9535e582e12c1337e', { name: 'Test' })
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    })

    it('fails on invalid date of birth format', () => {
        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { dateOfBirth: 'not-a-real-date' }))
            .to.throw(ValidationError)
    })

    it('fails on providing an empty name', () => {
        expect(() => updateUserProfile('65d6la-invalid-date-format', { name: ' ' }))
            .to.throw(ValidationError)
    })

    it('fails on invalid gender', () => {
        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { gender: 'Invalid' }))
            .to.throw(ValidationError)
    })

    it('fails on invalid target gender', () => {
        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { targetGender: ['Invalid'] }))
            .to.throw(ValidationError)
    })

    it('fails on invalid artists format', () => {
        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { artists: ['string instead of object'] }))
            .to.throw(ValidationError)
    })

    it('fails on bio too long', () => {
        const longBio = 'a'.repeat(201)
        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { bio: longBio }))
            .to.throw(ValidationError)
    })

    it('fails on invalid age range', () => {
        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { minAge: 17 }))
            .to.throw(ValidationError)

        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { maxAge: 56 }))
            .to.throw(ValidationError)
    })

    it('fails on invalid distance', () => {
        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { distance: 0 }))
            .to.throw(ValidationError)

        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { distance: 201 }))
            .to.throw(ValidationError)
    })

    it('fails on invalid coordinates', () => {
        expect(() => updateUserProfile('65d635a9535e582e12c1337e', {
            coordinates: { type: 'Polygon', coordinates: [] }
        }))
            .to.throw(ValidationError)
    })

    it('fails on invalid spotifyId', () => {
        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { spotifyId: '   ' }))
            .to.throw(ValidationError)
    })

    it('fails on invalid spotify tokens', () => {
        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { spotifyAccessToken: '' }))
            .to.throw(ValidationError)

        expect(() => updateUserProfile('65d635a9535e582e12c1337e', { spotifyRefreshToken: '   ' }))
            .to.throw(ValidationError)
    })

    it('fails on spotifyId duplicity', async () => {
        // Setup: Create two users. Give one a spotifyId.
        await User.create({ ...mockUserData, email: 'user1@test.com', spotifyId: 'spotify123' })
        const user2 = await User.create({ ...mockUserData, email: 'user2@test.com' })

        await expect(
            updateUserProfile(user2.id, { spotifyId: 'spotify123' })
        ).to.be.rejectedWith(DuplicityError)
    })

    after(() => db.disconnect())
})