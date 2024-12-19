import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, LogBook } from 'dat'
import { errors } from 'com'
import { Types } from 'mongoose'

import createLog from './createLog.js'

const { NotFoundError, SystemError } = errors



describe('createLog', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(async () => {
        // Clean the database before each test
        await User.deleteMany()
        await LogBook.deleteMany()
    })

    it('should create a log successfully for an existing user', async () => {
        // Create a test user
        const user = await User.create({ 
            name: 'Test Diver', 
            email: 'testdiver@example.com', 
            password: 'password123', 
            role: 'diver' 
        })

        const result = await createLog(
            user.id,
            '01/09/2024',          // date
            18,                    // depth 
            45,                    // time 
            'Sunny',               // weather
            24,                    // temperature
            'Good',                // visibility
            'Low',                 // waves
            5,                     // wetSuit
            6,                     // weight 
            12,                    // tankSize 
            200,                   // tankBar
            'Amazing',             // feeling
            'Tossa Divers',        // diveCenter
            'Tossa de Mar',        // diveSite
            'First dive in Costa Brava, perfect' // notes
        )

        expect(result.message).to.equal('Log created successfully')

        // Fetch the log from the database to verify it was created
        const log = await LogBook.findOne({ _id: result.log._id })
        expect(log).to.not.be.null  // Ensure the log was created before accessing properties

        expect(log.date).to.deep.equal(new Date('2024-09-01'))
        expect(log.depth).to.equal(18)        
        expect(log.time).to.equal(45)           
        expect(log.weather).to.equal('Sunny')
        expect(log.temperature).to.equal(24)
        expect(log.visibility).to.equal('Good')
        expect(log.waves).to.equal('Low')
        expect(log.wetSuit).to.equal(5)
        expect(log.weight).to.equal(6)        
        expect(log.tankSize).to.equal(12)       
        expect(log.tankBar).to.equal(200)
        expect(log.feeling).to.equal('Amazing')
        expect(log.diveCenter).to.equal('Tossa Divers')
        expect(log.diveSite).to.equal('Tossa de Mar')
        expect(log.notes).to.equal('First dive in Costa Brava, perfect')
    })

    it('should throw NotFoundError if user does not exist', async () => {
        const nonExistentUserId = new Types.ObjectId() // Generate a non-existent ObjectId

        await expect(
            createLog(
                nonExistentUserId.toString(),
                '01/09/2024',
                18,                    // depth
                45,                    // time
                'Sunny',               // weather
                24,                    // temperature
                'Good',                // visibility
                'Low',                 // waves
                5,                 // wetSuit
                6,                     // weight
                12,                    // tankSize
                200,                   // tankBar
                'Amazing',             // feeling
                'Tossa Divers',        // diveCenter
                'Tossa de Mar',        // diveSite
                'First dive in Costa Brava, perfect' // notes
            )
        ).to.be.rejectedWith(NotFoundError, 'User not found')
    })

    it('should throw SystemError if there is an internal server error', async () => {
        // Simulate a database error by overriding the create method
        const originalCreate = LogBook.create
        LogBook.create = () => { throw new Error('Database error') }
    
        const user = await User.create({ 
            name: 'Test Diver', 
            email: 'testdiver@example.com', 
            password: 'password123', 
            role: 'diver' 
        })
    
        await expect(
            createLog(
                user.id, // Pass user id here
                '01/09/2024', // date
                18, // depth
                45, // time
                'Sunny', // weather
                24, // temperature
                'Good', // visibility
                'Low', // waves
                5, // wetSuit
                6, // weight
                12, // tankSize
                200, // tankBar
                'Amazing', // feeling
                'Tossa Divers', // diveCenter
                'Tossa de Mar', // diveSite
                'First dive in Costa Brava, perfect' // notes
            )
        ).to.be.rejectedWith(SystemError, 'Database error')
    
        // Restore the original method
        LogBook.create = originalCreate
    })

    after(() => db.disconnect())
})