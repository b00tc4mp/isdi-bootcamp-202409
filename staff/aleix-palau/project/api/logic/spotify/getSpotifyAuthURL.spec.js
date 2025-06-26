import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import getSpotifyAuthURL from './getSpotifyAuthURL.js'

describe('getSpotifyAuthURL', () => {
    it('succeeds on generating Spotify auth URL', () => {
        const authUrl = getSpotifyAuthURL()
        const url = new URL(authUrl)
        const params = url.searchParams

        expect(authUrl).to.be.a('string')
        expect(authUrl).to.match(/^https:\/\/accounts\.spotify\.com\/authorize/)

        expect(params.get('client_id')).to.equal(process.env.SPOTIFY_CLIENT_ID)
        expect(params.get('response_type')).to.equal('code')
        expect(params.get('redirect_uri')).to.equal(process.env.SPOTIFY_REDIRECT_URI)

        const scopeValue = params.get('scope')
        expect(scopeValue).to.include('user-read-private')
        expect(scopeValue).to.include('user-read-email')
        expect(scopeValue).to.include('user-top-read')
    })

    it('generates consistent URL format', () => {
        const authUrl1 = getSpotifyAuthURL()
        const authUrl2 = getSpotifyAuthURL()

        // URLs should be the same (no random state by default)
        expect(authUrl1).to.equal(authUrl2)
    })

    it('includes all required parameters', () => {
        const authUrl = getSpotifyAuthURL()
        const url = new URL(authUrl)
        const params = url.searchParams

        expect(params.get('client_id')).to.equal(process.env.SPOTIFY_CLIENT_ID)
        expect(params.get('response_type')).to.equal('code')
        expect(params.get('redirect_uri')).to.equal(process.env.SPOTIFY_REDIRECT_URI)
        expect(params.get('scope')).to.include('user-read-private')
        expect(params.get('scope')).to.include('user-read-email')
        expect(params.get('scope')).to.include('user-top-read')
    })
})