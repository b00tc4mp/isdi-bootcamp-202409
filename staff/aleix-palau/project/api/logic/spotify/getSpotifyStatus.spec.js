import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import getSpotifyStatus from './getSpotifyStatus.js'
import { errors } from 'com'

const { NotFoundError } = errors

describe('getSpotifyStatus', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('returns true when Spotify is connected', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            spotifyAccessToken: 'access_token',
            spotifyRefreshToken: 'refresh_token'
        })

        const isConnected = await getSpotifyStatus(user.id)

        expect(isConnected).to.be.true
    })

    it('returns false when Spotify is not connected', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com'
        })

        const isConnected = await getSpotifyStatus(user.id)

        expect(isConnected).to.be.false
    })

    it('returns false when only access token exists', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            spotifyAccessToken: 'access_token'
            // Missing refresh token
        })

        const isConnected = await getSpotifyStatus(user.id)

        expect(isConnected).to.be.false
    })

    it('returns false when only refresh token exists', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            spotifyRefreshToken: 'refresh_token'
            // Missing access token
        })

        const isConnected = await getSpotifyStatus(user.id)

        expect(isConnected).to.be.false
    })

    it('fails on non-existing user', () =>
        expect(
            getSpotifyStatus('000000000000000000000000')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    after(() => db.disconnect())
})