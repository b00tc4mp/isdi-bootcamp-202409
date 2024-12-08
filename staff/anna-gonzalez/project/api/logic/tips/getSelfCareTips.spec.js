import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Tip } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getSelfCareTips from './getSelfCareTips.js'

describe('getSelfCareTips', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Tip.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const tip = new Tip({ date: '2024-10-17T00:00:00.000Z', phase: 'menstruation', category: 'self-care', description: 'Tip description' })

        return Promise.all([user.save(), tip.save()])
            .then(([user, tip]) => {
                return getSelfCareTips(user.id, 'menstruation')
                    .then(menstruationTips => {
                        expect(menstruationTips).to.exist
                    })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            getSelfCareTips('012345678901234567890123', 'menstruation')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on non-existing tip', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const tip = new Tip({ date: '2024-10-17T00:00:00.000Z', phase: 'follicular', category: 'nutrition', description: 'Tip description' })

        return Promise.all([user.save(), tip.save()])
            .then(([user, tip]) => {
                expect(
                    getSelfCareTips(user.id, tip.phase)
                ).to.be.rejectedWith(NotFoundError, /^Tips not found$/)
            })
    })

    after(() => db.disconnect())
})