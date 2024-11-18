import 'dotenv/config';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from 'dat';
import { errors } from 'com';

const { CredentialsError } = errors;

import authenticateUser from './authenticateUser.js';

debugger;

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST) );

    beforeEach(() => User.deleteMany());

    it('succeeds on existing user', () => 
        User.create( { name: 'Hakate Kakashi', email: 'hkakashi@hk.gov', username: 'hkakshi', password: '123123123'})
            .then(() => authenticateUser('kakashi', '123123123'))        
            .then(user => {
                expect(user).to.exist;
                expect(user.id).to.be.a.string;
                expect(user.id).to.have.lengthOf(24);
                expect(user.role).to.equal('regular');
            })
)

    it('fails on non-existing user', () => 
        expect(
            authenticateUser('hkakashi', '123123123')
        ).to.be.rejectedWith(CredentialsError, 'wrong credentials')
    )

    after(() => db.disconnect)
});