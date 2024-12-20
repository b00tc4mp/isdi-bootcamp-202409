import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getPeriodDays from './getPeriodDays.js'

describe('getPeriodDays', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user with periodEnd', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const cycle = new Cycle({
            user: user.id,
            start: '2024-10-13T00:00:00.000Z',
            periodEnd: '2024-10-15T00:00:00.000Z'
        })

        return Promise.all([user.save(), cycle.save()])
            .then(([savedUser, savedCycle]) => {
                return getPeriodDays(savedUser.id)
                    .then(periodDays => {
                        expect(periodDays).to.have.lengthOf(3)
                        expect(periodDays).to.include('2024-10-13T00:00:00.000Z')
                        expect(periodDays).to.include('2024-10-14T00:00:00.000Z')
                        expect(periodDays).to.include('2024-10-15T00:00:00.000Z')
                    })
            })
    })

    it('succeeds for existing user without periodEnd', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const cycle = new Cycle({ user: user.id, start: '2024-10-13T00:00:00.000Z' })

        return Promise.all([user.save(), cycle.save()])
            .then(([savedUser, savedCycle]) => {
                return getPeriodDays(savedUser.id)
                    .then(periodDays => {
                        expect(periodDays).to.have.lengthOf(1)
                        expect(periodDays[0]).to.equal('2024-10-13T00:00:00.000Z')
                    })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            getPeriodDays('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    after(() => db.disconnect())
})