import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import db, { User } from 'dat'
import { errors } from 'com'
import updateCenterInfo from './updateCenterInfo.js'

chai.use(chaiAsPromised)
const { expect } = chai
const { NotFoundError, SystemError } = errors

describe('updateCenterInfo', () => {
    let user;

    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(async () => {
        // Clear the database before each test
        await User.deleteMany()

        // Create user to be updated
        user = await User.create({
            name: 'Tossa Divers',
            email: 'tossadivers@test.com',
            password: '123123123',
            role: 'center',
            address: 'Avenida del Mar, 1',
            country: 'Spain',
            city: 'Tortosa',
            postcode: '17320',
            telephone: '972123456',
        })
    })

    it('should update user information successfully', async () => {
        const data = { name: 'Tossa Super Divers', city: 'Tossa de Mar', telephone: '9726543210' }

        const updatedUser = await updateCenterInfo(user._id.toString(), data)

        expect(updatedUser.name).to.equal('Tossa Super Divers')
        expect(updatedUser.city).to.equal('Tossa de Mar')
        expect(updatedUser.telephone).to.equal('9726543210')
    })

    it('should throw NotFoundError when user does not exist', async () => {
        const data = { name: 'Madrid Divers', city: 'Madrid' }

        await expect(updateCenterInfo('605c72ef8cfa4a3d60e3a53', data))
            .to.be.rejectedWith(NotFoundError, 'User not found')
    })

    it('should throw SystemError for invalid email', async () => {
        const data = { email: 'invalid@email' }

        await expect(updateCenterInfo(user._id.toString(), data))
            .to.be.rejectedWith(SystemError, 'Invalid email')
    })

    it('should throw SystemError for empty name', async () => {
        const data = { name: '' }

        await expect(updateCenterInfo(user._id.toString(), data))
            .to.be.rejectedWith(SystemError, 'Name cannot be empty')
    })

    after(() => db.disconnect())
})