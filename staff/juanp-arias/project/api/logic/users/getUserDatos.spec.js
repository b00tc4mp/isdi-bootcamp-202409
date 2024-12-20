import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors
import getUserDatos from './getUserDatos.js'

describe('getUserDatos', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Coco Loco', email: 'coco@loco.com', dateOfBirth: new Date('07/04/2000'), password: bcrypt.hashSync('123456', 10) })

        const data = await getUserDatos(user.id, user.id)
        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal('student')
    })

    it('fails on non-existing user', () =>
        expect(
            getUserDatos('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )
    it('fails on non-existing target-user', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', dateOfBirth: new Date('07/04/2000'), password: '123123123' })
                .then(user => getUserDatos(user.id, '012345678901234567890123'))
        ).to.be.rejectedWith(NotFoundError, 'target user not found')
    )
    after(() => db.disconnect())
})