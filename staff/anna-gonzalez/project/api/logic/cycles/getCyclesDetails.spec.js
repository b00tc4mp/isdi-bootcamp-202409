import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getCyclesDetails from './getCyclesDetails.js'

describe('getCyclesDetails', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const cycle1 = new Cycle({
            user: user.id,
            start: '2024-10-13T00:00:00.000Z',
            periodEnd: '2024-10-17T00:00:00.000Z',
            dayLogs: [{ date: '2024-10-13T00:00:00.000Z', symptoms: ['headache'], mood: 'happy' }]
        })
        const cycle2 = new Cycle({
            user: user.id,
            start: '2024-11-01T00:00:00.000Z',
            periodEnd: '2024-11-05T00:00:00.000Z',
            dayLogs: [{ date: '2024-11-02T00:00:00.000Z', symptoms: ['fatigue'], mood: 'sad' }]
        })

        return Promise.all([user.save(), cycle1.save(), cycle2.save()])
            .then(([user, cycle1, cycle2]) => {
                return getCyclesDetails(user.id)
                    .then(cycleDetails => {
                        expect(cycleDetails).to.have.lengthOf(2)
                        expect(new Date(cycleDetails[0].start).toISOString()).to.equal(new Date('2024-11-01T00:00:00.000Z').toISOString())
                        expect(new Date(cycleDetails[1].start).toISOString()).to.equal(new Date('2024-10-13T00:00:00.000Z').toISOString())
                    })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            getCyclesDetails('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on non-existing cycle', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                expect(getCyclesDetails(user.id)).to.be.rejectedWith(NotFoundError, /^Cycle not found$/)
            )
    )

    after(() => db.disconnect())
})