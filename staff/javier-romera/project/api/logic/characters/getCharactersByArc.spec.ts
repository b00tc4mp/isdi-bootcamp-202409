import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai
import bcrypt from 'bcryptjs'

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getCharactersByArc from './getCharactersByArc.js'

describe('getCharactersByArc', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeds on existing user', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        const chars = await getCharactersByArc(user.id, 'Romance-Dawn')

        expect(chars).to.exist
        expect(chars![0].firstArc.toString()).to.equal(chars![1].firstArc.toString())
    })

    it('fails on non-existing user', () => {
        expect(
            getCharactersByArc('012345678901234567890123', 'Romance-Dawn')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getCharactersByArc('0123', 'Romance-Dawn')).to.throw(ValidationError, /^Invalid userId length$/)
    )

    it('fails on non-valid arc', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        expect(() => getCharactersByArc(user.id, 'one-piece')).to.throw(ValidationError, /^Invalid arc$/)
    })

    after(() => db.disconnect())
})