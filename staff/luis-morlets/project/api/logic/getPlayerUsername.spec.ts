import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { Player } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getPlayerUsername from './getPlayerUsername.js'

describe('getPlayerUsername', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST!))

    beforeEach(() => Player.deleteMany())

    it('succeeds on existing player', () =>
        Player.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
            .then(player => getPlayerUsername(player.id, player.id))
            .then(username => expect(username).to.equal('perolito'))
    )

    it('fails on non-existing player', () =>
        expect(
            getPlayerUsername('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^player not found$/)
    )

    it('fails on non-existing target-player', () =>
        expect(
            Player.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: '123123123' })
                .then(player => getPlayerUsername(player.id, '012345678901234567890123'))
        ).to.be.rejectedWith(NotFoundError, /^target player not found$/)
    )

    after(() => db.disconnect())
})