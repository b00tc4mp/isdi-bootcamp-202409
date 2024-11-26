import 'dotenv/config';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import bcrypt from 'bcryptjs';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from 'dat';
import { errors } from 'com';

const { DuplicityError } = errors;

import registerUser from './registerUser.js';

describe('registerUser', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () =>
        registerUser('Hakate Kakashi', 'hkakashi@kh.gov', 'hkakashi', '123123123', '123123123')
            .then(() => User.findOne({ username: 'hkakashi' }))
            .then(user => {
                expect(user).to.exist;
                expect(user.name).to.equal('Hakate Kakashi')
                expect(user.email).to.equal('hkakashi@kh.gov')
                expect(user.username).to.equal('hkakashi')
                expect(bcrypt.compareSync('123123123', user.password)).to.be.true

            })
    )

    debugger
    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'Hakate Kakashi', email: 'hkakashi@kh.gov', username: 'hkakashi', password: bcrypt.hashSync('123123123', 10) })

            await registerUser('Hakate Kakashi', 'hkakashi@kh.gov', 'hkakashi', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})
