import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import updateUser from './updateUser.js'

describe('updateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating existing user', async () => {
        const user = await User.create({ email: 'al@eix.com', password: bcrypt.hashSync('123123123', 10) })

        await updateUser(user.id, {
            name: 'Aleix',
            dateOfBirth: '1991-08-19'
        })

        const updatedUser = await User.findById(user.id)

        expect(updatedUser).to.exist
        expect(updatedUser.name).to.equal('Aleix')
        expect(updatedUser.dateOfBirth.toISOString().slice(0, 10)).to.equal('1991-08-19')
    })

    it('fails on non-existing user', () =>
        expect(
            updateUser('000000000000000000000000', {
                name: 'Aleix',
                dateOfBirth: '1991-08-19'
            })
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on invalid dateOfBirth', () =>
        expect(
            User.create({ email: 'al@eix.com', password: bcrypt.hashSync('123123123', 10) })
                .then(user =>
                    updateUser(user.id, {
                        name: 'Aleix',
                        dateOfBirth: '1996-13-33'
                    })
                )
        ).to.be.rejectedWith(ValidationError, 'invalid date of birth')
    )

    after(() => db.disconnect())
})