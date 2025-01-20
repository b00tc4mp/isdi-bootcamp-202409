import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError } = errors

import registerUser from './registerUser.js'

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () =>
        registerUser('Carlos Tomas', 'ctcarlos25', '123123123', '+34682519205', 'ctcarlos25@gmail.com', '123123123')
            .then(() => User.findOne({ username: 'ctcarlos25' }))
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal('Carlos Tomas')
                expect(user.email).to.equal('ctcarlos25@gmail.com')
                expect(user.username).to.equal('ctcarlos25')
                expect(user.phone).to.equal('+34682519205')
                expect(user.role).to.equal('regular')
                expect(bcrypt.compareSync('123123123', user.password)).to.be.true
            })
    )

    it('fails on existing user', () =>
        expect(
            User.create({ name: 'Carlos Tomas', username: 'ctcarlos25', password: bcrypt.hashSync('123123123', 10), phone: '+34682519205', email: 'ctcarlos25@gmail.com', passwordRepeat: '123123123' })
                .then(() => registerUser('Carlos Tomas', 'ctcarlos25', '123123123', '+34682519205', 'ctcarlos25@gmail.com', '123123123'))
        ).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    after(() => db.disconnect())
})