import 'dotenv/config';

import * as chai from 'chai';
import chaiAsPormised from 'chai-as-promised';

chai.use(chaiAsPormised);
const { expect } = chai;

import db, { User } from 'dat';
import { errors } from 'com';

const { NotFoundError } = errors;

import getUserName from './getUserName.js';

describe('getUserName', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));//'mongodb://localhost:27017/unsocial-test'

    beforeEach(() => User.deleteMany());

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Hakate Kakashi', email: 'hkakashi@hk.gov', username: 'hkakashi', password: '123123123' })

        const name = await getUserName(user.id, user.id)

        expect(name).to.be.equal('Hakate Kakashi')
    })

    it('fails on non-existing user', () =>
        expect(
            getUserName('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-existing target-user', () =>
        expect(
            User.create({ name: 'Hakate Kakashi', email: 'hkakashi@hk.gov', username: 'hkakashi', password: '123123123' })
                .then(user => getUserName(user.id, '012345678901234567890123'))
        ).to.be.rejectedWith(NotFoundError, 'target user not found')
    )

    after(() => db.disconnect());
})

