import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import createCycle from './createCycle.js'

describe('createCycle', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                createCycle(user.id, new Date())
                    .then(() => Cycle.findOne())
                    .then(cycle => {
                        expect(cycle).to.exist
                        expect(cycle.user.toString()).to.equal(user.id)
                        expect(cycle.start).to.be.instanceOf(Date)
                    })
            )
    )

    it('fails on non-existing user', () =>
        expect(
            createCycle('012345678901234567890123', new Date())
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    after(() => db.disconnect())
})