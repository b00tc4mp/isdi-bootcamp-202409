


import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserName from './getUserName.js'

describe('getUserName', () => {
    before(() => db.connect(process.env.MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({
            role: 'restaurant',
            name: 'alba',
            email: 'alba@lomas.com',
            license: '46718412-F',
            password: '123123123',
        })

        const name = await getUserName(user._id.toString(), user._id.toString())

        expect(name).to.equal('alba')
    })

    it('fails on non-existing user', async () => {
        const invalidId = '012345678901234567890123'

        await expect(getUserName(invalidId, invalidId)).to.be.rejectedWith(
            NotFoundError,
            'Usuario no encontrado'
        )
    })

    it('fails on non-existing target-user', async () => {
        const user = await User.create({
            role: 'restaurant',
            name: 'alba',
            email: 'alba@lomas.com',
            license: '46718412-F',
            password: '123123123',
        })

        const invalidTargetId = '012345678901234567890123'

        await expect(getUserName(user.id, invalidTargetId)).to.be.rejectedWith(
            NotFoundError,
            'Target de usuario no encontrado'
        )
    })

    after(() => db.disconnect())
})