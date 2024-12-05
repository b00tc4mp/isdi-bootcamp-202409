import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getAllCharactersNameAndAlias from './getAllCharactersNameAndAlias.js'

describe('getAllCharactersNameAndAlias', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: '123123123' })

        const chars = await getAllCharactersNameAndAlias(user.id)

        expect(chars).to.exist
        expect(chars![0]).to.haveOwnProperty('name')
        expect(chars![0]).to.haveOwnProperty('alias')
        expect(chars![0]).not.to.haveOwnProperty('_id')
    })

    it('fails on non-existing user', () => {
        expect(
            getAllCharactersNameAndAlias('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    after(() => db.disconnect())
})