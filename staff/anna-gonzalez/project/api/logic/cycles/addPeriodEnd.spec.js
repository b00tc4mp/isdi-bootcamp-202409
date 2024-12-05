import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, DuplicityError } = errors

import addPeriodEnd from './addPeriodEnd.js'

describe('addPeriodEnd', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () => {
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-10-13T00:00:00.000Z' })
                    .then(() =>
                        expect(
                            addPeriodEnd(user.id, '2024-10-13T00:00:00.000Z')
                        ).to.be.instanceOf(Date)
                    )
            )
    })

    it('succeeds on updating periodEnd', () => {
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-10-13T00:00:00.000Z', periodEnd: '2024-10-14T00:00:00.000Z' })
                    .then(() =>
                        Cycle.updateOne({ periodEnd: '2024-10-14T00:00:00.000Z' })
                            .then(() =>
                                expect(
                                    addPeriodEnd(user.id, '2024-10-15T00:00:00.000Z')
                                ).to.exist
                            )
                    )
            )
    })

    it('fails on non-existing user', () =>
        expect(
            addPeriodEnd('012345678901234567890123', '2024-10-13T00:00:00.000Z')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on future creation', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-10-13T00:00:00.000Z' })
                    .then(() =>
                        expect(
                            addPeriodEnd(user.id, '2050-10-11T00:00:00.000Z')
                        ).to.be.rejectedWith(ValidationError, /^End of period cannot be created in the future$/)
                    )
            )
    )

    it('fails on future creation', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                expect(
                    addPeriodEnd(user.id, '2024-10-11T00:00:00.000Z')
                ).to.be.rejectedWith(NotFoundError, /^Cycle not found$/)
            )
    )

    it('fails on periodEnd already existing', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-10-13T00:00:00.000Z', periodEnd: '2024-10-17T00:00:00.000Z' })
                    .then(() =>
                        expect(
                            addPeriodEnd(user.id, '2024-10-17T00:00:00.000Z')
                        ).to.be.rejectedWith(DuplicityError, /^Period end already set on this day$/)
                    )
            )
    )

    after(() => db.disconnect())
})