import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import refreshSpotifyToken from './refreshSpotifyToken.js'
import { errors } from 'com'

const { NotFoundError, AuthorizationError, SystemError } = errors

describe('refreshSpotifyToken', () => {
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

    it('succeeds on refreshing Spotify token', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            spotifyRefreshToken: 'old_refresh_token',
            spotifyAccessToken: 'old_access_token'
        })

        fetchStub.resolves({
            ok: true,
            json: async () => ({
                access_token: 'new_access_token'
            })
        })

        const newToken = await refreshSpotifyToken(user.id)

        expect(newToken).to.equal('new_access_token')

        const updatedUser = await User.findById(user.id)
        expect(updatedUser.spotifyAccessToken).to.equal('new_access_token')
        expect(updatedUser.spotifyRefreshToken).to.equal('old_refresh_token') // Should keep refresh token
    })

    it('fails when user has no refresh token', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com'
            // No Spotify tokens
        })

        expect(
            refreshSpotifyToken(user.id)
        ).to.be.rejectedWith(AuthorizationError, 'No refresh token available')
    })

    it('fails on non-existing user', () =>
        expect(
            refreshSpotifyToken('000000000000000000000000')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails when Spotify API returns error', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            spotifyRefreshToken: 'invalid_refresh_token'
        })

        fetchStub.resolves({
            ok: false,
            json: async () => ({
                error: 'invalid_grant',
                error_description: 'Refresh token revoked'
            })
        })

        expect(
            refreshSpotifyToken(user.id)
        ).to.be.rejectedWith(SystemError, /Spotify token refresh failed/)
    })

    after(() => db.disconnect())
})