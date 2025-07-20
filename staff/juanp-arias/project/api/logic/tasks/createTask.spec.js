import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Task, Group } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import createTask from './createTask.js'
describe('createTask', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany(), Group.deleteMany()]))

    it('succeeds for existing user and group with students', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const group = new Group({
            name: 'Test Group',
            teacher: user._id,
            students: [],
        })

        return Promise.all([user.save(), group.save()])
            .then(([savedUser, savedGroup]) => {
                savedGroup.students.push(savedUser._id)
                return savedGroup.save().then(() => {
                    return createTask(savedUser._id.toString(), savedGroup._id.toString(), '2024-12-20', 'Task Text')
                        .then(() => Task.findOne())
                        .then(task => {
                            expect(task).to.exist
                            expect(task.creator.toString()).to.equal(savedUser._id.toString())
                            expect(task.assignes).to.include(savedUser._id.toString())
                            expect(task.text).to.equal('Task Text')
                            expect(new Date(task.date)).to.deep.equal(new Date('2024-12-20'))
                        })
                })
            })
    })

    it('succeeds for group without students', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const group = new Group({
            name: 'Empty Group',
            teacher: user._id,
            students: [],
        })

        return Promise.all([user.save(), group.save()])
            .then(([savedUser, savedGroup]) => {
                return createTask(savedUser._id.toString(), savedGroup._id.toString(), '2024-12-20', 'Task Text')
                    .then(() => Task.findOne())
                    .then(task => {
                        expect(task).to.exist
                        expect(task.assignes).to.be.an('array').that.is.empty
                    })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            createTask('012345678901234567890123', '012345678901234567890124', '2024-12-20', 'Task Text')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing group', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(savedUser => {
            return expect(
                createTask(savedUser._id.toString(), '012345678901234567890123', '2024-12-20', 'Task Text')
            ).to.be.rejectedWith(NotFoundError, /^group not found$/)
        })
    })

    it('fails on non-string user-id', () =>
        expect(() => createTask(true, '012345678901234567890124', '2024-12-20', 'Task Text'))
            .to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-string group-id', () =>
        expect(() => createTask('012345678901234567890123', true, '2024-12-20', 'Task Text'))
            .to.throw(ValidationError, /^invalid groupId$/)
    )

    it('fails on non-string text', () =>
        expect(() => createTask('012345678901234567890123', '012345678901234567890124', '2024-12-20', true))
            .to.throw(ValidationError, /^invalid text$/)
    )

    after(() => db.disconnect())
})