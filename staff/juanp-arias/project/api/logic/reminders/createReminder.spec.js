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
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', dateOfBirth: new Date('07/01/2000'), password: '123456' })
            .then(user =>
                createReminder(user.id, 'hello reminders', 'hola reminders', '12/20/2024')
                    .then(() => Reminder.findOne())
                    .then(reminder => {
                        expect(reminder).to.exist
                        expect(reminder.date).to.be.instanceOf(Date)
                        expect(reminder.text).to.equal('hola reminders')
                    })
            )
    )

    it('fails on non-existing user', () =>
        expect(
            createReminder('012345678901234567890123', 'hello reminders', 'hola reminders', '12/20/2024')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => createReminder(true, 'hello reminders', 'hola reminders', '12/20/2024')).to.throw(ValidationError, /^invalid id$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => createReminder('0123', 'hello reminders', 'hola reminders', '12/20/2024')).to.throw(ValidationError, /^invalid id length$/)
    )

    it('fails on non-string text', () =>
        expect(() => createReminder('012345678901234567890123', true, 'hola reminders', '12/20/2024')).to.throw(ValidationError, /^invalid text$/)
    )
    after(() => db.disconnect())
})