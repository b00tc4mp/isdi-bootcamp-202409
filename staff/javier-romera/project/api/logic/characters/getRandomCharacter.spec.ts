import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai
import bcrypt from 'bcryptjs'

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getRandomCharacter from './getRandomCharacter.js'

describe('getRandomCharacter', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        const char = await getRandomCharacter(user.id)

        expect(char).to.exist
        expect(char._id).to.be.undefined
    })

    it('fails on on existing user', () => {
        expect(
            getRandomCharacter('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getRandomCharacter('0123')).to.throw(ValidationError, /^Invalid userId length$/)
    )

    after(() => db.disconnect())
})