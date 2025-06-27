import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'
import { Types } from 'mongoose'

const { NotFoundError } = errors 

import getLogs from './getLogs.js'

describe('getLogs', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({name: 'salva', email: 'smarchese985@gmail.com', password: 'salva123', role: 'diver' })

        const logs = await getLogs(user.id)

        expect(logs).to.be.an('array')
        expect(logs).to.have.lengthOf(0)
    })

    
it('fails on non-existing user', async () => {
    const nonExistentUserId = new Types.ObjectId()  // Generate a valid ObjectId, but it doesn't exist in the DB

    await expect(getLogs(nonExistentUserId.toString()))
        .to.be.rejectedWith(NotFoundError, 'User not found')
    })
    after(() => db.disconnect())
})