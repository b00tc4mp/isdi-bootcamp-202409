import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getCurrentDayLog from './getCurrentDayLog.js'

describe('getCurrentDayLog', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user and dayLog', () => {
        return User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user => {
                const cycle = new Cycle({
                    user: user.id,
                    start: '2024-10-13T00:00:00.000Z',
                    periodEnd: '2024-10-17T00:00:00.000Z',
                    dayLogs: [{ date: '2024-10-14T00:00:00.000Z', symptoms: ['headache'], mood: 'happy' }]
                })
                return cycle.save()
                    .then(() => {

                        return getCurrentDayLog(user.id, '2024-10-14')
                            .then(foundDayLog => {
                                expect(foundDayLog).to.exist
                                expect(new Date(foundDayLog.date).toISOString()).to.equal(new Date('2024-10-14T00:00:00.000Z').toISOString())
                                expect(foundDayLog.symptoms).to.include('headache')
                            })
                    })
            })
    })

    it('succeeds for existing user and non-existing dayLog', () => {
        return User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user => {
                const cycle = new Cycle({
                    user: user.id,
                    start: '2024-10-13T00:00:00.000Z',
                    periodEnd: '2024-10-17T00:00:00.000Z',
                    dayLogs: []
                })

                return cycle.save()
                    .then(() => {

                        return getCurrentDayLog(user.id, '2024-10-14')
                            .then(newDayLog => {
                                expect(newDayLog).to.exist
                                expect(new Date(newDayLog.date).toISOString()).to.equal(new Date('2024-10-14T00:00:00.000Z').toISOString())
                                expect(newDayLog._id).to.exist
                            })
                    })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            getCurrentDayLog('012345678901234567890123', '2024-10-14')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on non-existing cycle', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                expect(
                    getCurrentDayLog(user.id, '2024-10-14')
                ).to.be.rejectedWith(NotFoundError, /^Cycle not found$/)
            )
    )

    after(() => db.disconnect())
})