import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUser from './getUser.js'

describe('getUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'salva', email: 'smarchese985@gmail.com', password: 'salva123', role: 'diver' })

        const profile = await getUser(user.id)

        expect(profile.name).to.equal('salva')
    })

    it('fails on non-exisiting user', async () => 
    await expect(
        getUser('012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, 'user not found')
    )
    after(() => db.disconnect())
})