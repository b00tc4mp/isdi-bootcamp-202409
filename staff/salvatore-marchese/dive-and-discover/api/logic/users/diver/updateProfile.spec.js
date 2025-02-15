import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import db, { User } from 'dat'
import { errors } from 'com'
import updateProfile from './updateProfile.js'

chai.use(chaiAsPromised)
const { expect } = chai
const { NotFoundError, SystemError } = errors

describe('updateProfile', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(async () => {
        await User.deleteMany()
    })

    it('should update user profile successfully', async () => {
        // Create a user to be updated
        const user = await User.create({ 
            name: 'Salva', 
            email: 'salva@test.com', 
            password: '123123123', 
            role: 'diver' 
        })

        const data = { name: 'John', email: 'nemo2@gmail.com' }

        // Call the updateProfile function
        await updateProfile(user.id, user.id, data)

        const updatedUser = await User.findById(user.id)

        // Check if the updated user contains the new data
        expect(updatedUser.name).to.equal('John')
        expect(updatedUser.email).to.equal('nemo2@gmail.com')
    })

    it('fails on non-exisiting user', () => {
        const data = { name: 'John', email: 'nemo2@gmail.com' }
        
        // Try to update a non-existing user (using a random ID)
        return expect(updateProfile('67503f6a10182798c1418773', '67503f6a10182798c1418773', data))
            .to.be.rejectedWith(NotFoundError, 'user not found')
    })

    after(() => db.disconnect())
})