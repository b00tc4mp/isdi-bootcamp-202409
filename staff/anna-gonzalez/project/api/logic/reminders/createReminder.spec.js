import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Reminder } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import createReminder from './createReminder.js'

describe('createReminder', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Reminder.deleteMany()]))

    it('succeeds for existing user', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                createReminder(user.id, '2025-10-13T00:00:00.000Z', 'Doctor appointment')
                    .then(() => Reminder.findOne())
                    .then(reminder => {
                        expect(reminder).to.exist
                        expect(reminder.user.toString()).to.equal(user.id)
                        expect(reminder.title).to.exist
                    })
            )
    )

    it('fails on non-existing user', () =>
        expect(
            createReminder('012345678901234567890123', '2024-10-13T00:00:00.000Z', 'Doctor appointment')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    it('fails on past creation', () =>
        User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
            .then(user =>
                expect(
                    createReminder(user.id, '2023-10-13T00:00:00.000Z', 'Doctor appointment')
                ).to.be.rejectedWith(ValidationError, /^Reminder cannot be created in the past$/)
            )
    )

    after(() => db.disconnect())
})