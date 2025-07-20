import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getCyclesStart from './getCyclesStart.js'

describe('getCyclesStart', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () => {
        return User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user => {
                const cycle1 = new Cycle({
                    user: user.id,
                    start: '2024-10-13T00:00:00.000Z',
                    periodEnd: '2024-10-17T00:00:00.000Z'
                })
                const cycle2 = new Cycle({
                    user: user.id,
                    start: '2024-10-18T00:00:00.000Z',
                    periodEnd: '2024-10-20T00:00:00.000Z'
                })

                return Promise.all([cycle1.save(), cycle2.save()])
                    .then(() => {

                        return getCyclesStart(user.id)
                    })
                    .then(cyclesStart => {
                        expect(cyclesStart).to.deep.equal([
                            '2024-10-18T00:00:00.000Z',
                            '2024-10-13T00:00:00.000Z'
                        ])
                    })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            getCyclesStart('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    after(() => db.disconnect())
})