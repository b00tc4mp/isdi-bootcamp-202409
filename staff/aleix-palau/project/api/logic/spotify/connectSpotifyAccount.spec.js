import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import connectSpotifyAccount from './connectSpotifyAccount.js'
import { errors } from 'com'

const { NotFoundError, SystemError, ValidationError } = errors

describe('connectSpotifyAccount', () => {
    let fetchStub

    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(async () => {
        await User.deleteMany()
        fetchStub = sinon.stub(global, 'fetch')
    })

    afterEach(() => {
        fetchStub.restore()
    })

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on connecting Spotify account', async () => {
        const user = await User.create({ ...mockUserData, email: 'al@eix.com' })

        // Mock Spotify token response
        fetchStub.onFirstCall().resolves({
            ok: true,
            json: async () => ({
                access_token: 'mock_access_token',
                refresh_token: 'mock_refresh_token'
            })
        })

        // Mock Spotify profile response
        fetchStub.onSecondCall().resolves({
            ok: true,
            json: async () => ({
                id: 'spotify_user_123',
                email: 'user@spotify.com'
            })
        })

        await connectSpotifyAccount(user.id, 'mock_auth_code')

        const updatedUser = await User.findById(user.id)
        expect(updatedUser.spotifyId).to.equal('spotify_user_123')
        expect(updatedUser.spotifyAccessToken).to.equal('mock_access_token')
        expect(updatedUser.spotifyRefreshToken).to.equal('mock_refresh_token')
    })

    it('fails on non-existing user', () => {
        fetchStub.resolves({
            ok: true,
            json: async () => ({
                access_token: 'mock_access_token',
                refresh_token: 'mock_refresh_token'
            })
        })

        expect(
            connectSpotifyAccount('000000000000000000000000', 'mock_auth_code')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    })

    it('fails when Spotify token exchange fails', () => {
        fetchStub.resolves({
            ok: false,
            json: async () => ({
                error: 'invalid_grant',
                error_description: 'Authorization code expired'
            })
        })

        expect(
            User.create({ ...mockUserData, email: 'al@eix.com' })
                .then(user => connectSpotifyAccount(user.id, 'invalid_code'))
        ).to.be.rejectedWith(SystemError, /Spotify token exchange failed/)
    })

    it('fails when Spotify profile fetch fails', () => {
        // Mock successful token response
        fetchStub.onFirstCall().resolves({
            ok: true,
            json: async () => ({
                access_token: 'mock_access_token',
                refresh_token: 'mock_refresh_token'
            })
        })

        // Mock failed profile response
        fetchStub.onSecondCall().resolves({
            ok: false
        })

        expect(
            User.create({ ...mockUserData, email: 'al@eix.com' })
                .then(user => connectSpotifyAccount(user.id, 'mock_auth_code'))
        ).to.be.rejectedWith(SystemError, 'Failed to fetch Spotify profile')
    })

    it('fails with invalid auth code', () => {
        expect(() => connectSpotifyAccount('654321098765432109876545', ''))
            .to.throw(ValidationError)
    })

    after(() => db.disconnect())
})