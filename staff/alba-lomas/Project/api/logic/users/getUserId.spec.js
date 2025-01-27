


import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserId from './getUserId.js'

describe('getUserId', () => {
    before(() => db.connect(process.env.MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and target user', async () => {
        const user = await User.create({
            role: 'restaurant',
            name: 'alba',
            email: 'alba@lomas.com',
            license: '46718412-F',
            password: '123123123',
        })

        const targetUser = await User.create({
            role: 'restaurant',
            name: 'laura',
            email: 'laura@gmail.com',
            license: '46718412-M',
            password: '123123123',
        })

        const foundUser = await getUserId(user.id, targetUser.id)

        expect(foundUser.name).to.equal('laura')
    })

    it('fails on non-existing user', async () => {
        const invalidId = '012345678901234567890123'

        await expect(getUserId(invalidId, invalidId)).to.be.rejectedWith(
            NotFoundError,
            'Usuario no encontrado'
        )
    })

    it('fails on non-existing target user', async () => {
        const user = await User.create({
            role: 'restaurant',
            name: 'alba',
            email: 'alba@lomas.com',
            license: '46718412-F',
            password: '123123123',
        })

        const invalidTargetId = '012345678901234567890123'

        await expect(getUserId(user.id, invalidTargetId)).to.be.rejectedWith(
            NotFoundError,
            'Target de usuario no encontrado'
        )
    })
    after(() => db.disconnect())
})