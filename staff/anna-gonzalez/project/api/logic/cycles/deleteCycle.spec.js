import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import deleteCycle from './deleteCycle.js'

describe('deleteCycle', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () => {
        return User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-11-13T00:00:00.000Z' })
                    .then(newCycle =>
                        deleteCycle(user.id, '2024-11-13T00:00:00.000Z')
                            .then(() =>
                                Cycle.findById(newCycle.id)
                                    .then(deletedCycle => {
                                        expect(deletedCycle).to.be.null
                                    })
                            )
                    )
            )
    })

    it('succeeds on updating the end date of the previous cycle', () => {
        return User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Promise.all([
                    Cycle.create({ user: user.id, start: '2024-11-02T00:00:00.000Z', end: '2024-11-11T00:00:00.000Z' }),
                    Cycle.create({ user: user.id, start: '2024-11-12T00:00:00.000Z', end: '2024-11-21T00:00:00.000Z' }),
                    Cycle.create({ user: user.id, start: '2024-11-22T00:00:00.000Z' })
                ])
                    .then(() =>
                        deleteCycle(user.id, '2024-11-12T00:00:00.000Z')
                            .then(() =>
                                Cycle.findOne({ start: { $lte: '2024-11-13T00:00:00.000Z' } })
                                    .then(updatedPrevCycle => {
                                        expect(new Date(updatedPrevCycle.end).toISOString()).to.equal(new Date('2024-11-21T00:00:00.000Z').toISOString())
                                    })
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        expect(
            deleteCycle('012345678901234567890123', '2024-11-13T00:00:00.000Z')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    })

    it('fails if the cycle to delete is not found', () => {
        return User.create({ name: 'Lucy', email: 'lucy@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-11-13T00:00:00.000Z' })
                    .then(() =>
                        expect(deleteCycle(user.id, '2024-10-13T00:00:00.000Z')
                        ).to.be.rejectedWith(NotFoundError, /^Cycle not found$/)
                    )
            )
    })

    after(() => db.disconnect())
})