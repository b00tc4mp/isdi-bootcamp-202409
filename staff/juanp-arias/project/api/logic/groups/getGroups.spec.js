import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Group } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getGroups from './getGroups.js'

describe('getGroups', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('succeeds when teacher has groups', () => {
        const teacher = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const students = [
            new User({ name: 'Student 1', email: 'student1@school.com', dateOfBirth: '2000-07-01', role: 'student', password: '123456' }),
            new User({ name: 'Student 2', email: 'student2@school.com', dateOfBirth: '2000-07-01', role: 'student', password: '123456' }),
        ]

        return Promise.all([teacher.save(), ...students.map(student => student.save())])
            .then(([teacher, student1, student2]) => {
                const group1 = new Group({
                    name: 'Math Class',
                    teacher: teacher._id,
                    students: [student1._id, student2._id],
                })

                const group2 = new Group({
                    name: 'Science Class',
                    teacher: teacher._id,
                    students: [student1._id],
                })

                return Promise.all([group1.save(), group2.save()])
                    .then(() => getGroups(teacher._id.toString()))
                    .then(groups => {

                        expect(groups[0].teacher.name).to.equal('Coco Loco')
                        expect(groups[0].students).to.be.an('array').with.lengthOf(2)
                        expect(groups[0].students.map(s => s.name)).to.include.members(['Student 1', 'Student 2'])
                        expect(groups[0].students.map(s => s.role)).to.include.members(['student', 'student'])

                        expect(groups[1].students).to.be.an('array').with.lengthOf(1)
                        expect(groups[1].students[0].name).to.equal('Student 1')
                        expect(groups[1].students[0].role).to.equal('student')
                    })
            })
    })


    it('fails on non-existing teacher', () =>
        expect(
            getGroups('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string teacher-id', () =>
        expect(() => getGroups(true)).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length teacher-id', () =>
        expect(() => getGroups('0123')).to.throw(ValidationError, /^invalid userId length$/)
    )

    after(() => db.disconnect())
})