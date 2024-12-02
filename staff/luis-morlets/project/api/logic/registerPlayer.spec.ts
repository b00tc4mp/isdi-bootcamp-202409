import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { Player } from 'dat'
import { errors } from 'com'

const { DuplicityError } = errors

import registerPlayer from './registerPlayer.js'

describe('registerPlayer', (): void => {
    before(() => db.connect(process.env.MONGO_URL_TEST!))

    beforeEach(() => Player.deleteMany())

    it('succeeds on new player', async () => {
        await registerPlayer('Pero Lito', 'pero@lito.com', 'perolito', '123123123', '123123123')

        const player = await Player.findOne({ username: 'perolito' })

        expect(player).to.exist
        expect(player!.name).to.equal('Pero Lito')
        expect(player!.email).to.equal('pero@lito.com')
        expect(player!.username).to.equal('perolito')
        expect(bcrypt.compareSync('123123123', player!.password)).to.be.true
    })

    it('fails on player duplicity', () =>
        expect((async () => {
            await Player.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: bcrypt.hashSync('123123123', 8) })

            await registerPlayer('Pero Lito', 'pero@lito.com', 'perolito', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, 'this user already exists')
    )

    after(() => db.disconnect())
})