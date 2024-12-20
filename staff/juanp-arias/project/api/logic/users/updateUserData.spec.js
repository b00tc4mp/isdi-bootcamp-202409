import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors
import updateUserData from './updateUserData.js'

describe('updateUserData', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Coco Loco', email: 'coco@loco.com', dateOfBirth: new Date('07/04/2000'), password: bcrypt.hashSync('123456', 10) })

        await updateUserData(user.id, 'Juan Pablo', 'juan@pablo.com', '2000-07-04', 'student')
        expect(user).to.exist
        expect(user.name).to.equal('Coco Loco')
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.dateOfBirth).to.be.instanceOf(Date)
        expect(user.role).to.equal('student')
    })

    it('fails on non-existing user', () =>
        expect(
            updateUserData('012345678901234567890123', 'Juan Pablo', 'juan@pablo.com', '2000-07-04', 'student')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on invalid data', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', dateOfBirth: new Date('07/04/2000'), password: '123123123', role: 'teacher' })
                .then(user => updateUserData(user.id, 'juan@pablo.com', '2000-07-04', 'student'))
        ).to.be.rejectedWith(ValidationError, 'invalid e-mail')
    )
    after(() => db.disconnect())
})