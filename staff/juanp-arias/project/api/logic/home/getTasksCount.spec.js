import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Task } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getTasksCount from './getTasksCount.js'

describe('getTasksCount', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds and returns task count for existing user with assigned tasks', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(user => {
            const task1 = new Task({
                creator: user._id,
                assignes: [user._id],
                text: 'Task 1',
                date: new Date('2024-12-20'),
            })

            const task2 = new Task({
                creator: user._id,
                assignes: [user._id],
                text: 'Task 2',
                date: new Date('2024-12-21'),
            })

            return Promise.all([task1.save(), task2.save()])
                .then(() => getTasksCount(user._id.toString()))
                .then(taskCount => {
                    expect(taskCount).to.equal(2)
                })
        })
    })

    it('succeeds and returns 0 when user has no assigned tasks', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(user => {
            return getTasksCount(user._id.toString()).then(taskCount => {
                expect(taskCount).to.equal(0)
            })
        })
    })

    it('fails on non-existing user', () =>
        expect(
            getTasksCount('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => getTasksCount(true)).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getTasksCount('0123')).to.throw(ValidationError, /^invalid userId length$/)
    )
    after(() => db.disconnect())
})