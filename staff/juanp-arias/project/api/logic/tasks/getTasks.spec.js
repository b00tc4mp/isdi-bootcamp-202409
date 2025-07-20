import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Task } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getTasks from './getTasks.js'

describe('getTasks', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on existing user with future tasks', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const now = new Date()
        const futureDate1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
        const futureDate2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2)

        return user.save().then(savedUser => {
            const task1 = new Task({
                creator: savedUser._id,
                assignes: [savedUser._id],
                date: futureDate1,
                text: 'Future Task 1',
            })

            const task2 = new Task({
                creator: savedUser._id,
                assignes: [savedUser._id],
                date: futureDate2,
                text: 'Future Task 2',
            })

            return Promise.all([task1.save(), task2.save()])
                .then(() => getTasks(savedUser._id.toString()))
                .then(tasks => {
                    expect(tasks).to.be.an('array').with.lengthOf(2)

                    // Verificar orden ascendente
                    expect(new Date(tasks[0].date)).to.deep.equal(futureDate1)
                    expect(new Date(tasks[1].date)).to.deep.equal(futureDate2)

                    // Verificar campos específicos
                    expect(tasks[0].text).to.equal('Future Task 1')
                    expect(tasks[1].text).to.equal('Future Task 2')
                    expect(tasks[0].creator.name).to.equal('Coco Loco')
                    expect(tasks[0].assignes[0].name).to.equal('Coco Loco')
                })
        })
    })

    it('fails on non-existing user', () =>
        expect(getTasks('012345678901234567890123')).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => getTasks(true)).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getTasks('0123')).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('succeeds with no tasks for user', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(savedUser => {
            return getTasks(savedUser._id.toString()).then(tasks => {
                expect(tasks).to.be.an('array').that.is.empty
            })
        })
    })
    after(() => db.disconnect())
})