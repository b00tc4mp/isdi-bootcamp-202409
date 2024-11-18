import 'dotenv/config';

import * as chai from 'chai';
import chaiAsPormised from 'chai-as-promised';

chai.use(chaiAsPormised);
const { expect } = chai;

import db , { User } from 'dat';
import { errors } from 'com';

const { NotFoundError } = errors;

import getUserName from './getUserName.js';

describe('getUserName', () => {
    before(() => db.connect('mongodb://localhost:27017/unsocial-test'));

    beforeEach(() => User.deleteMahy());

    it('succeeds on existing user', () => 
        User.create({ name: 'Hakate Kakashi', email: 'hkakashi@hk.gov', username: 'hkakashi', password: '123123123' })
            .then(user => getUserName(user.id, user.id))
            .then(name => expect(name).to.equal('Hakate Kakashi'))
    )

    it('fails on non-existing user', () => 
        expect(
            getUserName('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-existing target-user', () =>
        expect(
            User.create({ name: 'Hakate Kakashi', email: 'hkakashi@hk.gov', username: 'hkakashi', password: '123123123' })
                .then(user => getUserName(user.id, ''))
        ).to.be.rejectedWith(NotFoundError, 'target user not found')
    )

    after(() => db.disconnect());
})

