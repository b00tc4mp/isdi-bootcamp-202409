import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai
import bcrypt from 'bcryptjs'

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getCharacterByName from './getCharacterByName.js'

describe('getCharacterByName', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and sending name', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        const char = await getCharacterByName(user.id, 'Monkey D. Luffy')

        expect(char).to.exist
        expect(char.name).to.equal('Monkey D. Luffy')
        expect(char.alias).to.equal('Luffy')
    })

    it('succeeds on existing user and sending alias', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        const char = await getCharacterByName(user.id, 'Luffy')

        expect(char).to.exist
        expect(char.name).to.equal('Monkey D. Luffy')
        expect(char.alias).to.equal('Luffy')
    })

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getCharacterByName('0123', 'Monkey D. Luffy')).to.throw(ValidationError, /^Invalid userId length$/)
    )

    it('fails on non-existing user', () => {
        expect(
            getCharacterByName('012345678901234567890123', 'Monkey D. Luffy')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    })

    it('fails on non-existing character', async () => {
        const user = await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        expect(
            getCharacterByName(user.id, 'Ruffy')
        ).to.be.rejectedWith(NotFoundError, /^character not found$/)
    })

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getCharacterByName('0123', 'Luffy')).to.throw(ValidationError, /^Invalid userId length$/)
    )

    after(() => db.disconnect())
})