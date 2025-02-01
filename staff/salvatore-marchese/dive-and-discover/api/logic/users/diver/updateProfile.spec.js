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
            password: 'salva123', 
            role: 'diver' 
        })

        const data = { name: 'John', email: 'nemo2@gmail.com' }

        // Call the updateProfile function
        const updatedUser = await updateProfile(user.id, data)

        // Check if the updated user contains the new data
        expect(updatedUser.name).to.equal('John')
        expect(updatedUser.email).to.equal('nemo2@gmail.com')
    })

    it('should throw NotFoundError if user does not exist', async () => {
        const data = { name: 'John', email: 'nemo2@gmail.com' }
        
        // Try to update a non-existing user (using a random ID)
        await expect(updateProfile('67503f6a10182798c1418773', data))
            .to.be.rejectedWith(NotFoundError, 'user not found')
    })

    it('should throw SystemError for any internal errors', async () => {
        // Simulate an error in the database
        const originalFindById = User.findById
        User.findById = () => { throw new Error('Database connection failed') }

        const data = { name: 'John', email: 'nemo2@gmail.com' }
        
        await expect(updateProfile('67503f6a10182798c1418773', data))
            .to.be.rejectedWith(SystemError, 'Database connection failed')

        // Restore the original method to avoid side effects for other tests
        User.findById = originalFindById
    })

    after(() => db.disconnect())
})