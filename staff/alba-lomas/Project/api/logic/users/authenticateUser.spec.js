


import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { CredentialsError } = errors

import authenticateUser from './authenticateUser.js'

debugger

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        await User.create({ role: 'employee', name: 'alba', email: 'alba@lomas.com', license: '46718412-F', password: bcrypt.hashSync('123123123', 10) })

        const user = await authenticateUser('alba', '123123123')

        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal("employee")
    })

    it('fails on non-existing user', () =>
        expect(
            authenticateUser('alba', '123123123')
        ).to.be.rejectedWith(CredentialsError, 'Usuario incorrecto')
    )
    it('fails on incorrect password', async () => {
        await User.create({ role: 'employee', name: 'alba', email: 'alba@lomas.com', license: '46718412-F', password: bcrypt.hashSync('123123123', 10) })
        expect(
            authenticateUser('alba', '123123t123')
        ).to.be.rejectedWith(CredentialsError, 'Contraseña incorrecta')
    })
    after(() => db.disconnect())
})