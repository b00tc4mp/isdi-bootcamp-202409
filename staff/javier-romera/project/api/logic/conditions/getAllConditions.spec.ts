import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getAllConditions from './getAllConditions.js'

describe('getAllConditions', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        const conditions = await getAllConditions(user.id)

        expect(conditions).to.exist
        expect(conditions).to.have.lengthOf(12)
    })

    it('fails on non-existing user', () => {
        expect(
            getAllConditions('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    it('fails on non-valid userId length', () =>
        expect(() =>
            getAllConditions('0123')
        ).to.throw(ValidationError, /^Invalid userId length$/)
    )

    after(() => db.disconnect())
})