import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, DuplicityError } = errors

import createDayLog from './createDayLog.js'

describe('createDayLog', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-10-13T00:00:00.000Z' })
                    .then(createdCycle =>
                        createDayLog(user.id, '2024-11-01T00:00:00.000Z', { symptoms: 'headache', mood: "happy" })
                            .then(() =>
                                Cycle.findOne()
                                    .then(foundCycle => {
                                        expect(foundCycle.dayLogs).to.have.lengthOf(1)
                                        expect(foundCycle.dayLogs[0]).to.have.property('symptoms')
                                        expect(foundCycle.dayLogs[0].symptoms[0]).to.equal('headache')
                                        expect(foundCycle.dayLogs[0]).to.have.property('mood')
                                        expect(foundCycle.dayLogs[0].mood).to.equal('happy')
                                        expect(new Date(foundCycle.dayLogs[0].date).toISOString()).to.equal('2024-11-01T00:00:00.000Z')
                                    })
                            )
                    )
            )
    )

    it('succeeds for existing dayLog', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({
                    user: user.id,
                    start: '2024-10-13T00:00:00.000Z',
                    dayLogs: [{
                        date: '2024-12-03T23:00:00.000Z',
                        symptoms: 'cramps'
                    }]
                })
                    .then(createdCycle =>
                        createDayLog(user.id, '2024-12-03T23:00:00.000Z', { symptoms: 'headache', mood: "happy" })
                            .then(() =>
                                Cycle.findOne()
                                    .then(foundCycle => {
                                        expect(foundCycle.dayLogs).to.have.lengthOf(1)
                                        expect(foundCycle.dayLogs[0]).to.have.property('symptoms')
                                        expect(foundCycle.dayLogs[0].symptoms[0]).to.equal('headache')
                                        expect(foundCycle.dayLogs[0]).to.have.property('mood')
                                        expect(foundCycle.dayLogs[0].mood).to.equal('happy')
                                        expect(new Date(foundCycle.dayLogs[0].date).toISOString()).to.equal('2024-12-03T23:00:00.000Z')
                                    })
                            )
                    )
            )
    )

    it('fails on non-existing user', () =>
        expect(
            createDayLog('012345678901234567890123', '2024-10-13T00:00:00.000Z', { symptoms: 'headache', mood: "happy" })
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on non-existing cycle', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                expect(
                    createDayLog(user.id, '2024-11-01T00:00:00.000Z', { symptoms: 'headache', mood: "happy" })
                ).to.be.rejectedWith(NotFoundError, /^Cycle not found$/)
            )
    )

    it('fails on future creation', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({
                    user: user.id,
                    start: '2024-10-13T00:00:00.000Z',
                    end: new Date().toISOString(),
                    dayLogs: [{
                        date: '2024-12-03T23:00:00.000Z',
                        symptoms: 'cramps'
                    }]
                })
                    .then(createdCycle =>
                        expect(
                            createDayLog(user.id, '2050-10-11T00:00:00.000Z', { symptoms: 'headache', mood: "happy" })
                        ).to.be.rejectedWith(ValidationError, /^DayLog cannot be created in the future$/)
                    )
            )
    )

    after(() => db.disconnect())
})