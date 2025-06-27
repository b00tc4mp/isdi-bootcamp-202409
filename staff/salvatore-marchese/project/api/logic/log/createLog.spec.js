import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, LogBook } from 'dat'
import { errors } from 'com'
import createLog from './createLog.js'
import mongoose from 'mongoose'
const { Types: { ObjectId } } = mongoose

const { NotFoundError } = errors



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

        await createLog(
            user.id,
            user.id,
            'Tossa de Mar',
            '01/09/2024',
            18,
            45,
            'Sunny',
            24,
            'Good',
            'Low',
            5,
            6,
            12,
            200,
            'Amazing',
            'Tossa Divers',
            'First dive in Costa Brava, perfect'
        )

        // Fetch the log from the database to verify it was created
        const log = await LogBook.findOne({ diver: user.id })
        expect(log).to.not.be.null  // Ensure the log was created before accessing properties
        expect(log.diveSite).to.equal('Tossa de Mar')
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
        expect(log.notes).to.equal('First dive in Costa Brava, perfect')
    })

    it('should throw NotFoundError if user does not exist', async () => {
        const randomId = new ObjectId().toString()

        await expect(
            createLog(
                randomId,
                randomId,
                'Tossa de Mar',
                '01/09/2024',
                18,
                45,
                'Sunny',
                24,
                'Good',
                'Low',
                5,
                6,
                12,
                200,
                'Amazing',
                'Tossa Divers',
                'First dive in Costa Brava, perfect'
            )
        ).to.be.rejectedWith(NotFoundError, 'User not found')
    })

    after(() => db.disconnect())
})