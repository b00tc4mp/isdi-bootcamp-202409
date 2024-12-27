import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Tip } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getTips from './getTips.js'
debugger

describe('getTips', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Tip.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const musicTip = new Tip({ date: '2024-10-17T00:00:00.000Z', phase: 'menstruation', category: 'music', description: 'Tip description' })
        const selfCareTip = new Tip({ date: '2024-10-17T00:00:00.000Z', phase: 'menstruation', category: 'self-care', description: 'Tip description' })
        const exerciseTip = new Tip({ date: '2024-10-17T00:00:00.000Z', phase: 'menstruation', category: 'exercise', description: 'Tip description' })
        const nutritionTip = new Tip({ date: '2024-10-17T00:00:00.000Z', phase: 'menstruation', category: 'nutrition', description: 'Tip description' })

        return Promise.all([user.save(), musicTip.save(), selfCareTip.save(), exerciseTip.save(), nutritionTip.save()])
            .then(([user]) => {
                return getTips(user.id, 'menstruation')
                    .then(menstruationTips => {
                        expect(menstruationTips).to.exist
                    })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            getTips('012345678901234567890123', 'menstruation')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on non-existing tip', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const tip = new Tip({ date: '2024-10-17T00:00:00.000Z', phase: 'follicular', category: 'nutrition', description: 'Tip description' })

        return Promise.all([user.save(), tip.save()])
            .then(([user, tip]) => {
                expect(
                    getTips(user.id, tip.phase)
                ).to.be.rejectedWith(NotFoundError, /^Tips not found$/)
            })
    })

    after(() => db.disconnect())
})