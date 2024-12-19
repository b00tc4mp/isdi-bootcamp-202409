import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Group } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import createGroup from './createGroup.js'
describe('createGroup', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('succeeds when a group is created with an existing teacher', () => {
        const teacher = new User({ name: 'Coco Loco', email: 'coco@loco.com', dateOfBirth: new Date('2000-07-01'), password: '123456', })
        const students = [
            new User({ name: 'Student 1', email: 'student1@school.com', dateOfBirth: new Date('2010-01-01'), password: '123456' }),
            new User({ name: 'Student 2', email: 'student2@school.com', dateOfBirth: new Date('2011-01-01'), password: '123456' })
        ]

        return Promise.all([teacher.save(), ...students.map(student => student.save())])
            .then(([teacher, student1, student2]) => {
                const studentIds = [student1._id, student2._id]

                return createGroup(teacher._id.toString(), 'Math Class', studentIds)
                    .then(() => Group.findOne({ name: 'Math Class' }))
                    .then(group => {
                        expect(group).to.exist
                        expect(group.name).to.equal('Math Class')
                        expect(group.teacher.toString()).to.equal(teacher._id.toString())
                        expect(group.students.map(id => id.toString())).to.have.members(studentIds.map(id => id.toString()))
                    })
            })
    })

    it('fails on non-existing teacher', () =>
        expect(
            createGroup('012345678901234567890123', 'Math Class', [])
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string teacher-id', () =>
        expect(() => createGroup(true, 'Math Class', [])).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length teacher-id', () =>
        expect(() => createGroup('0123', 'Math Class', [])).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('fails on non-string group name', () =>
        expect(() => createGroup('012345678901234567890123', true, [])).to.throw(ValidationError, /^invalid name$/)
    )

    it('succeeds with an empty student list', () => {
        const teacher = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return teacher.save().then(teacher => {
            return createGroup(teacher._id.toString(), 'No Students Class', [])
                .then(() => Group.findOne({ name: 'No Students Class' }))
                .then(group => {
                    expect(group).to.exist
                    expect(group.name).to.equal('No Students Class')
                    expect(group.teacher.toString()).to.equal(teacher._id.toString())
                    expect(group.students).to.be.an('array').that.is.empty
                })
        })
    })
    after(() => db.disconnect())
})