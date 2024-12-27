import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai
import bcrypt from 'bcryptjs'

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getAllCharactersNameAndAlias from './getAllCharactersNameAndAlias.js'

describe('getAllCharactersNameAndAlias', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

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

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getAllCharactersNameAndAlias('0123')).to.throw(ValidationError, /^Invalid userId length$/)
    )

    after(() => db.disconnect())
})