import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, DuplicityError } = errors

import createCycle from './createCycle.js'

describe('createCycle', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                createCycle(user.id, '2024-10-13T00:00:00.000')
                    .then(() => Cycle.findOne())
                    .then(cycle => {
                        expect(cycle).to.exist
                        expect(cycle.user.toString()).to.equal(user.id)
                        expect(cycle.start).to.be.instanceOf(Date)
                    })
            )
    )

    it('succeeds on having a last and next cycle', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-10-13T00:00:00.000' })
                    .then(lastCycle =>
                        Cycle.create({ user: user.id, start: '2024-11-13T00:00:00.000' })
                            .then(nextCycle =>
                                createCycle(user.id, '2024-11-01T00:00:00.000')
                                    .then(() => Cycle.findOne())
                                    .then(newCycle => {
                                        expect(lastCycle).to.exist
                                        expect(nextCycle).to.exist
                                        expect(newCycle).to.exist
                                    })
                            )
                    )
            )
    )

    it('succeeds on not having a last cycle', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-11-13T00:00:00.000' })
                    .then(nextCycle =>
                        createCycle(user.id, '2024-11-01T00:00:00.000')
                            .then(() => Cycle.findOne())
                            .then(newCycle => {
                                expect(nextCycle).to.exist
                                expect(newCycle).to.exist
                            })
                    )
            )
    )

    it('fails on non-existing user', () =>
        expect(
            createCycle('012345678901234567890123', '2024-10-13T00:00:00.000')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on future creation', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                expect(
                    createCycle(user.id, '2050-10-11T00:00:00.000')
                ).to.be.rejectedWith(ValidationError, /^Cycle cannot be created in the future$/)
            )
    )

    it('fails on cycle already existing', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-10-11T00:00:00.000' })
                    .then(() =>
                        expect(
                            createCycle(user.id, '2024-10-11T00:00:00.000')
                        ).to.be.rejectedWith(DuplicityError, /^Cycle already exists$/)
                    )
            )
    )

    it('fails on cycle too close to the last one', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-10-11T00:00:00.000' })
                    .then(() =>
                        expect(
                            createCycle(user.id, '2024-10-13T00:00:00.000')
                        ).to.be.rejectedWith(ValidationError, /^Cycle cannot be created if a cycle was created at most 7 days ago$/)
                    )
            )
    )

    it('fails on cycle too close to the next one', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-10-13T00:00:00.000' })
                    .then(() =>
                        expect(
                            createCycle(user.id, '2024-10-11T00:00:00.000')
                        ).to.be.rejectedWith(ValidationError, /^Cycle cannot be created if a cycle starts in 7 days or less$/)
                    )
            )
    )

    after(() => db.disconnect())
})