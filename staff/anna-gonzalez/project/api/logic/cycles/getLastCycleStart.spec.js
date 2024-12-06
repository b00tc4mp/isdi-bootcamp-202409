import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getLastCycleStart from './getLastCycleStart.js'

describe('getLastCycleStart', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const cycle = new Cycle({ user: user.id, start: '2024-10-13T00:00:00.000Z', periodEnd: '2024-10-17T00:00:00.000Z' })

        return Promise.all([user.save(), cycle.save()])
            .then(([user, cycle]) => {
                getLastCycleStart(user.id)
                    .then(lastCycle => {
                        expect(lastCycle).to.exist
                    })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            getLastCycleStart('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on non-existing cycle', () => {
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user => {
                expect(
                    getLastCycleStart(user.id)
                ).to.be.rejectedWith(NotFoundError, /^Cycle not found$/)
            })
    })

    after(() => db.disconnect())
})