/* FAILS ON  1) should successfully add opening hours to a user
    2) should throw NotFoundError if user does not exist
    ✔ should throw an error for invalid day (not between 1 and 7)
    ✔ should throw an error for invalid time format (empty openTime or closeTime)
    3) should throw SystemError for any internal errors */


import 'dotenv/config'
import { expect } from 'chai'
import db, { User } from 'dat'
import { errors } from 'com'
import addOpeningHours from './addOpeningHours.js'

const { NotFoundError, SystemError } = errors

describe('addOpeningHours', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(async () => {
        await User.deleteMany()
    })

    it('should successfully add opening hours to a user', async () => {
        // Create a test user
        const user = await User.create({ 
            name: 'TestDiveCenter', 
            email: 'divecenter@test.com', 
            password: '123123123', 
            role: 'center' 
        })
        
        // Add opening hours
        await addOpeningHours(user.id, 1, '12:00h', '22:00h')

        // Fetch the user to verify that the opening hours have been added
        const updatedUser = await User.findById(user.id).lean()
        
        expect(updatedUser.openingHours).to.have.lengthOf(1)
        expect(updatedUser.openingHours[0].day).to.equal(1)
        expect(updatedUser.openingHours[0].openTime).to.equal('12:00h')
        expect(updatedUser.openingHours[0].closeTime).to.equal('22:00h')
    })

    it('should throw NotFoundError if user does not exist', async () => {
        const nonExistentUserId = 'non-existent-user-id'
    
        try {
            await addOpeningHours(nonExistentUserId, 2, '09:00h', '18:00h')
        } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
        }
    })

    it('should throw an error for invalid day (not between 1 and 7)', async () => {
        const user = await User.create({ 
            name: 'TestDiveCenter', 
            email: 'divecenter@test.com', 
            password: '123123123', 
            role: 'center' 
        })

        const invalidDay = 8

        try {
            await addOpeningHours(user.id, invalidDay, '09:00h', '18:00h')
        } catch (error) {
            expect(error).to.have.property('message', 'Invalid day: must be a number between 1 and 7')
        }
    })

    it('should throw an error for invalid time format (empty openTime or closeTime)', async () => {
        const user = await User.create({ 
            name: 'TestDiveCenter', 
            email: 'divecenter@test.com', 
            password: '123123123', 
            role: 'center' 
        })

        try {
            await addOpeningHours(user.id, 3, '', '18:00h')
        } catch (error) {
            expect(error.message).to.equal('openTime is required')
        }
    
        try {
            await addOpeningHours(user.id, 3, '09:00h', '')
        } catch (error) {
            expect(error.message).to.equal('closeTime is required')
        }
    })

    it('should throw SystemError for any internal errors', async () => {
        // Mocking a database error by temporarily overriding `findById` method
        const originalFindById = User.findById
        User.findById = () => { throw new Error('Database connection failed') }

        const user = await User.create({ 
            name: 'TestDiveCenter', 
            email: 'divecenter@test.com', 
            password: '123123123', 
            role: 'center' 
        })

        try {
            await addOpeningHours(user.id, 3, '09:00h', '18:00h')
        } catch (error) {
            expect(error).to.be.instanceOf(SystemError)
            expect(error.message).to.equal('Database connection failed')
        }

        // Restore the original method after the test
        User.findById = originalFindById
    })

    after(() => db.disconnect())
})