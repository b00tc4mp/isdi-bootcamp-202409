import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import addPeriodEnd from './addPeriodEnd.js'

describe('addPeriodEnd', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const cycle = new Cycle({ user: user.id, start: new Date() })

        return Promise.all([user.save(), cycle.save()])
            .then(([user, cycle]) =>
                addPeriodEnd(user.id, cycle.id, new Date())
                    .then(() => Cycle.findOne())
                    .then(cycle => {
                        expect(cycle).to.exist
                        expect(cycle.start).to.exist

                        expect(cycle.periodEnd).to.be.instanceOf(Date)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            addPeriodEnd('012345678901234567890123', '012345678901234567890123', new Date())
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on non-existing cycle', () =>
        expect(
            User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
                .then(user =>
                    addPeriodEnd(user.id, '012345678901234567890123', new Date())
                )
        ).to.be.rejectedWith(NotFoundError, /^Cycle not found$/)
    )

    after(() => db.disconnect())
})