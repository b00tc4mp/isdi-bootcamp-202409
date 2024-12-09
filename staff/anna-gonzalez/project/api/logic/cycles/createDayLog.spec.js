import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Cycle, DayLog } from 'dat'
// import { errors } from 'com'

// const { NotFoundError, ValidationError, DuplicityError } = errors

import createDayLog from './createDayLog.js'

describe('createDayLog', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Cycle.deleteMany()]))

    it('succeeds for existing user', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                Cycle.create({ user: user.id, start: '2024-10-13T00:00:00.000Z' })
                    .then(() =>
                        createDayLog(user.id, '2024-11-01T00:00:00.000Z', 'symptoms: tender breasts')
                            .then(dayLog => {
                                expect(dayLog).to.exist
                            })
                    )
            )
    )

    after(() => db.disconnect())
})