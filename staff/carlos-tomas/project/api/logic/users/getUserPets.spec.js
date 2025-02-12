import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserPets from './getUserPets.js'

debugger

describe('getUserPets', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('get user pets', () => {
        User.create({ name: 'Carlos Tomas', username: 'ctcarlos25', password: bcrypt.hashSync('123123123', 10), phone: '+34682519205', email: 'ctcarlos25@gmail.com' })
            .then((user) =>
                getUserPets(user.id)
                    .then(user => {
                        expect(user[0].id).to.equal(user.id)
                        expect(user[0].name).to.equal(user.name)
                        expect(user[0].username).to.equal(user.username)
                        expect(user[0].phone).to.equal(user.phone)
                        expect(user[0].email).to.equal(user.email)
                    })
            )

    })
    // TODO fail pet not found 
    it('fails on non-existing user', () =>
        expect(
            getUserPets('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )


    after(() => db.disconnect())
})