import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { Player } from 'dat'
import { errors } from 'com'

const { CredentialsError } = errors

import authenticatePlayer from './authenticatePlayer.js'

describe('authenticatePlayer', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST!))

    beforeEach(() => Player.deleteMany())

    it('succeeds on existing player', async () => {
        await Player.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: bcrypt.hashSync('123123123', 10) })

        const player = await authenticatePlayer('perolito', '123123123')
        expect(player).to.exist
        expect(player.id).to.be.a.string
        expect(player.id).to.have.lengthOf(24)
    })

    it('fails on non-existing player', () =>
        expect(
            authenticatePlayer('perolito', '123123123')
        ).to.be.rejectedWith(CredentialsError, /^wrong credentials$/))

    after(() => db.disconnect())
})