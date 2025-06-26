import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import searchSpotifyArtists from './searchSpotifyArtists.js'
import { errors } from 'com'

const { NotFoundError, AuthorizationError, SystemError, ValidationError } = errors

describe('searchSpotifyArtists', () => {
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

    it('succeeds on searching artists', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            spotifyAccessToken: 'valid_token',
            spotifyRefreshToken: 'refresh_token'
        })

        fetchStub.resolves({
            ok: true,
            json: async () => ({
                artists: {
                    items: [
                        {
                            id: 'artist1',
                            name: 'Radiohead',
                            images: [{ url: 'http://image1.jpg' }],
                            popularity: 90
                        },
                        {
                            id: 'artist2',
                            name: 'The Strokes',
                            images: [],
                            popularity: 20
                        }
                    ]
                }
            })
        })

        const artists = await searchSpotifyArtists(user.id, 'strokes')

        expect(artists).to.be.an('array')
        expect(artists).to.have.lengthOf(2)
        expect(artists[0]).to.deep.equal({
            id: 'artist1',
            name: 'Radiohead',
            image: 'http://image1.jpg',
            popularity: 90
        })
        expect(artists[1]).to.deep.equal({
            id: 'artist2',
            name: 'The Strokes',
            image: null,
            popularity: 20
        })
    })

    it('refreshes token when unauthorized', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            spotifyAccessToken: 'expired_token',
            spotifyRefreshToken: 'refresh_token'
        })

        // First call returns 401
        fetchStub.onFirstCall().resolves({
            status: 401,
            ok: false
        })

        // Token refresh call
        fetchStub.onSecondCall().resolves({
            ok: true,
            json: async () => ({
                access_token: 'new_access_token'
            })
        })

        // Retry search with new token
        fetchStub.onThirdCall().resolves({
            ok: true,
            json: async () => ({
                artists: {
                    items: [
                        {
                            id: 'artist1',
                            name: 'Radiohead',
                            images: [{ url: 'http://radiohead.jpg' }],
                            popularity: 90
                        }
                    ]
                }
            })
        })

        const artists = await searchSpotifyArtists(user.id, 'radiohead')

        expect(artists).to.have.lengthOf(1)
        expect(artists[0].name).to.equal('Radiohead')

        // Verify token was updated
        const updatedUser = await User.findById(user.id)
        expect(updatedUser.spotifyAccessToken).to.equal('new_access_token')
    })

    it('returns empty array when no results', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            spotifyAccessToken: 'valid_token',
            spotifyRefreshToken: 'refresh_token'
        })

        fetchStub.resolves({
            ok: true,
            json: async () => ({
                artists: {
                    items: []
                }
            })
        })

        const artists = await searchSpotifyArtists(user.id, 'nonexistentartist')

        expect(artists).to.be.an('array')
        expect(artists).to.have.lengthOf(0)
    })

    it('fails when user has no Spotify connection', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            // No Spotify tokens
        })

        expect(
            searchSpotifyArtists(user.id, 'artist')
        ).to.be.rejectedWith(AuthorizationError, 'Spotify not connected')
    })

    it('fails on non-existing user', () =>
        expect(
            searchSpotifyArtists('000000000000000000000000', 'artist')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails with empty query', () => {
        expect(() => searchSpotifyArtists('654321098765432109876543', ''))
            .to.throw(ValidationError)
    })

    it('fails when Spotify API returns error', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            spotifyAccessToken: 'valid_token',
            spotifyRefreshToken: 'refresh_token'
        })

        fetchStub.resolves({
            ok: false,
            status: 500
        })

        expect(
            searchSpotifyArtists(user.id, 'artist')
        ).to.be.rejectedWith(SystemError, 'Failed to search Spotify artists')
    })

    after(() => db.disconnect())
})