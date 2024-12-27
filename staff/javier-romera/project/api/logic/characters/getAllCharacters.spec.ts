import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai
import bcrypt from 'bcryptjs'

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getAllCharacters from './getAllCharacters.js'

describe('getAllCharacters', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        const chars = await getAllCharacters(user.id)

        expect(chars).to.exist
        expect(chars[0]).to.haveOwnProperty('name')
        expect(chars[0]).to.haveOwnProperty('affiliation')
        expect(chars[0]).to.haveOwnProperty('gender')
        expect(chars[0]).to.haveOwnProperty('race')
        expect(chars[0]).to.haveOwnProperty('devilFruit')
        expect(chars[0].devilFruit).to.haveOwnProperty('type')
        expect(chars[0].devilFruit).to.haveOwnProperty('name')
        expect(chars[0]).to.haveOwnProperty('bounty')
        expect(chars[0]).to.haveOwnProperty('height')
        expect(chars[0]).to.haveOwnProperty('firstArc')
        expect(chars[0].firstArc).to.haveOwnProperty('name')
        expect(chars[0].firstArc).to.haveOwnProperty('number')
        expect(chars[0]).to.haveOwnProperty('description')
        expect(chars[0]).to.haveOwnProperty('observation')
        expect(chars[0]).to.haveOwnProperty('conqueror')
        expect(chars[0]).to.haveOwnProperty('armament')
        expect(chars[0]).to.haveOwnProperty('town')
        expect(chars[0]).to.haveOwnProperty('sea')
    })

    it('fails on non-existing user', () => {
        expect(
            getAllCharacters('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getAllCharacters('0123')).to.throw(ValidationError, /^Invalid userId length$/)
    )

    after(() => db.disconnect())
})