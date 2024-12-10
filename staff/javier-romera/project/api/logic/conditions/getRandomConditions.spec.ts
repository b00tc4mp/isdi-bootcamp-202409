import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai
import bcrypt from 'bcryptjs'

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getRandomConditions from './getRandomConditions.js'

describe('getRandomConditions', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        const conditions = await getRandomConditions(user.id)

        expect(conditions).to.have.lengthOf(6)
        expect(conditions[0].direction).to.equal('column')
        expect(conditions[0].indexes[0]).to.equal(0)
        expect(conditions[0].indexes[1]).to.equal(3)
        expect(conditions[0].indexes[2]).to.equal(6)

        expect(conditions[3].direction).to.equal('row')
        expect(conditions[3].indexes[0]).to.equal(0)
        expect(conditions[3].indexes[1]).to.equal(1)
        expect(conditions[3].indexes[2]).to.equal(2)
    })

    it('fails on non-existing user', () => {
        expect(
            getRandomConditions('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    it('fails on non-24-chars-length user-id', () =>
        expect(
            () => getRandomConditions('0123')
        ).to.throw(ValidationError, /^Invalid userId length$/)
    )

    after(() => db.disconnect())
})