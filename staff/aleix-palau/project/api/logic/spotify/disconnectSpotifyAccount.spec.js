import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import disconnectSpotifyAccount from './disconnectSpotifyAccount.js'
import { errors } from 'com'

const { NotFoundError } = errors

describe('disconnectSpotifyAccount', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on disconnecting Spotify account', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            spotifyId: 'spotify_user_123',
            spotifyAccessToken: 'access_token',
            spotifyRefreshToken: 'refresh_token'
        })

        await disconnectSpotifyAccount(user.id)

        const updatedUser = await User.findById(user.id)
        expect(updatedUser.spotifyId).to.be.undefined
        expect(updatedUser.spotifyAccessToken).to.be.undefined
        expect(updatedUser.spotifyRefreshToken).to.be.undefined
    })

    it('succeeds even when no Spotify account connected', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com'
        })

        await disconnectSpotifyAccount(user.id)

        const updatedUser = await User.findById(user.id)
        expect(updatedUser.spotifyId).to.be.undefined
        expect(updatedUser.spotifyAccessToken).to.be.undefined
        expect(updatedUser.spotifyRefreshToken).to.be.undefined
    })

    it('fails on non-existing user', () =>
        expect(
            disconnectSpotifyAccount('000000000000000000000000')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    after(() => db.disconnect())
})