//import 'dotenv/config';
console.log(process.env.MONGO_URL_TEST)
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from 'dat';
import { errors } from 'com';

const { DuplicityError } = errors;

import registerUser from './registerUser.js';

describe('registerUser', () => {
    before(() => db.connect('mongodb://localhost:27017/unsocial-test')) // pasar string directamente para test esta fallando env

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () => 
        registerUser('Hakate Kakashi', 'hkakashi@kh.gov', 'hkakashi', '123123123', '123123123')
        .then(() => User.findOne({ username: 'hkakashi'}))    
        .then(() => {
                expect(user).to.exist;
                expect(user.name).to.equal('Hakate Kakashi')
                expect(user.email).to.equal('hkakashi@kh.gov')
                expect(user.username).to.equal('hkakshi')
                expect(user.password).to.equal('123123123')
                
            })
        )

    it('fails on existing user', () => 
        expect(
            User.create({ name: 'Hakate Kakashi', email: 'hkakashi@kh.gov', username: 'hkakshi', password: '123123123' })
                .then(() => registerUser('Hakate Kakashi', 'hkakashi@kh.gov', 'hkakashi', '123123123', '123123123'))
        ).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    after(() => db.disconnect);
    
})