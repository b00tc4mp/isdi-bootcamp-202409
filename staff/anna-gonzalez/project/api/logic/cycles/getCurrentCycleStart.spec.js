import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getCurrentCycleStart from './getCurrentCycleStart.js'

describe('getCurrentCycleStart', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const cycle = new Cycle({ user: user.id, start: '2024-10-13T00:00:00.000Z', periodEnd: '2024-10-17T00:00:00.000Z' })

        return Promise.all([user.save(), cycle.save()])
            .then(([user, cycle]) => {
                return getCurrentCycleStart(user.id)
                    .then(currentCycle => {
                        return expect(new Date(currentCycle).toISOString()).to.equal(new Date(cycle.start).toISOString())
                    })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            getCurrentCycleStart('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on non-existing cycle', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                expect(
                    getCurrentCycleStart(user.id)
                ).to.be.rejectedWith(NotFoundError, /^Cycle not found$/)
            )
    )

    after(() => db.disconnect())
})