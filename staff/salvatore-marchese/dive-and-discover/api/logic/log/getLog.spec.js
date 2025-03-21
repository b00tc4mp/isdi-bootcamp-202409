import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import mongoose from 'mongoose'
const { Types: { ObjectId } } = mongoose

import db, { User, LogBook as Log, LogBook } from 'dat'
import { errors } from 'com'
import getLog from './getLog.js'

const { NotFoundError } = errors




describe('getLog', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(async () => {
        await User.deleteMany()
        await Log.deleteMany()
    })

    it('succeeds on existing user', async () => {
        const user = await User.create({
            name: 'salva',
            email: 'smarchese985@gmail.com',
            password: 'salva123', role: 'diver'
        })

        const log = await LogBook.create({
            diver: user.id,
            date: '01/09/2024',
            depth: 18,
            time: 45,
            weather: 'cloudy',
            temperature: 15,
            visibility: 'good',
            waves: 'calm',
            wetSuit: 5,
            weight: 6,
            tankSize: 12,
            tankBar: 200,
            feeling: 'really good',
            diveCenter: 'Tossa Diver',
            diveSite: 'Tossa de Mar',
            notes: 'was a very good day',
        })

        const newLog = await getLog(
            user.id,
            log.id
        )

        expect(newLog).to.be.an('array')
        expect(newLog).to.have.lengthOf(1)
        expect(newLog[0].weather).to.be.equal(log.weather)
    })

    it('fails on non-existing user', async () => {
        const nonExistentUserId = new ObjectId().toString()
        const randomLogId = new ObjectId().toString()  // Generate a valid ObjectId, but it doesn't exist in the DB

        await expect(getLog(nonExistentUserId, randomLogId ))
            .to.be.rejectedWith(NotFoundError, 'User not found')
    })

    it('fails on non-existing log', async () => {
        const user = await User.create({
            name: 'salva',
            email: 'smarchese985@gmail.com',
            password: 'salva123', role: 'diver'
        })
        


        const randomLogId = new ObjectId().toString()  // Generate a valid ObjectId, but it doesn't exist in the DB

        await expect(getLog(user.id, randomLogId ))
            .to.be.rejectedWith(NotFoundError, 'Log not found')
    })

    after(() => db.disconnect())
})



