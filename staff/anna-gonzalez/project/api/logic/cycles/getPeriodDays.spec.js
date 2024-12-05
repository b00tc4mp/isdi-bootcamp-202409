import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getPeriodDays from './getPeriodDays.js'

describe('getPeriodDays', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const cycle = new Cycle({ user: user.id, start: '2024-10-13T00:00:00.000Z', periodEnd: '2024-10-17T00:00:00.000Z' })

        return Promise.all([user.save(), cycle.save()])
            .then(([user, cycle]) => {
                getPeriodDays(user.id, '2024-10-19T00:00:00.000Z')
                    .then(periodDays => {
                        expect(periodDays[0]).to.equal(cycle.start)
                    })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            getPeriodDays('012345678901234567890123', '2024-10-19T00:00:00.000Z')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on non-existing cycle', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const cycle = new Cycle({ user: user.id, start: '2024-10-13T00:00:00.000Z' })

        return Promise.all([user.save(), cycle.save()])
            .then(([user, cycle]) => {
                expect(
                    getPeriodDays(user.id, '2024-09-19T00:00:00.000Z')
                ).to.be.rejectedWith(NotFoundError, /^Cycle not found$/)
            })
    })

    after(() => db.disconnect())
})