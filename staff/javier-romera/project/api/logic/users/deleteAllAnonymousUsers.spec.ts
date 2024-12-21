import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'

import deleteAllAnonymousUsers from './deleteAllAnonymousUsers.js'

describe('deleteAllAnonymousUsers', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    it('succeeds', async () => {
        await Promise.all([
            User.create({
                email: 'anonymous1@gmail.com',
                username: 'anonymous1',
                password: bcrypt.hashSync('anonymous1', 10),
                role: 'anonymous'
            }), User.create({
                email: 'anonymous2@gmail.com',
                username: 'anonymous2',
                password: bcrypt.hashSync('anonymous2', 10),
                role: 'anonymous'
            }), User.create({
                email: 'anonymous3@gmail.com',
                username: 'anonymous3',
                password: bcrypt.hashSync('anonymous3', 10),
                role: 'anonymous'
            }), User.create({
                email: 'anonymous4@gmail.com',
                username: 'anonymous4',
                password: bcrypt.hashSync('anonymous4', 10),
                role: 'anonymous'
            }), User.create({
                email: 'anonymous5@gmail.com',
                username: 'anonymous5',
                password: bcrypt.hashSync('anonymous5', 10),
                role: 'anonymous'
            }),
        ])

        await deleteAllAnonymousUsers()

        const anonymousUsers = await User.find({ role: 'anonymous' })

        expect(anonymousUsers).to.have.lengthOf(0)
    })

    after(() => db.disconnect())
})