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
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(async () => {
        await User.deleteMany()
    })

    it('should update user profile successfully', async () => {
        // Create a user to be updated
        const user = await User.create({ 
            name: 'Tossa Divers', 
            email: 'tossadivers@test.com', 
            password: '123123123', 
            role: 'center',
            address: 'Seafront, 2',
            country: 'Spain',
            city: 'Tossa de Mar',
            postcode: '17320',
            telephone: '6980558111'
        })

        const data = { name: 'Tossa Super Diver', email: 'tossasuperdiver@test.com', address: 'Avenida del mar, 1' }

        await updateCenterInfo(user.id, user.id, data)

        const updatedUser = await User.findById(user.id)

        // Check if the updated user contains the new data
        expect(updatedUser.name).to.equal('Tossa Super Diver')
        expect(updatedUser.email).to.equal('tossasuperdiver@test.com')
        expect(updatedUser.address).to.equal('Avenida del mar, 1')
    })

    it('fails on non-existing user', () => {
        const data = { name: 'John', email: 'nemo2@gmail.com' }
        
        // Try to update a non-existing user (using a random ID)
        return expect(updateCenterInfo('67503f6a10182798c1418773','67503f6a10182798c1418773', data))
            .to.be.rejectedWith(NotFoundError, 'user not found')
    })

    after(() => db.disconnect())
})