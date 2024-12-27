import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Reminder } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getCurrentReminders from './getCurrentReminders.js'

describe('getCurrentReminders', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Reminder.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Anna', email: 'an@na.com', password: '123123123' })
        const reminder = new Reminder({ user: user.id, date: '2024-12-11T00:00:00.000Z', title: 'Doctor appointment' })

        return Promise.all([user.save(), reminder.save()])
            .then(() =>
                getCurrentReminders(user.id, '2024-12-11T00:00:00.000Z')
                    .then(reminders => {
                        expect(reminders).to.exist
                        expect(reminders).to.be.an('array').that.is.not.empty
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            getCurrentReminders('012345678901234567890123', '2024-12-11T00:00:00.000Z')
        ).to.be.rejectedWith(NotFoundError, /^User not found$/)
    )

    // it('fails on non-existing reminder', () =>
    //     User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })
    //         .then(user =>
    //             expect(
    //                 getCurrentReminders(user.id, '2024-12-11T00:00:00.000Z')
    //             ).to.be.rejectedWith(NotFoundError, /^Reminder not found$/)
    //         )
    // )

    after(() => db.disconnect())
})