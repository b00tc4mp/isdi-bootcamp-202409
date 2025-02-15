import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, LogBook as Log } from 'dat'
import { errors } from 'com'

const { NotFoundError, SystemError } = errors

import getLog from './getLog.js'

describe('getLog', () => {
    const userId = '67a127a2f0f8a331c710e137'
    const logId = '67a1de8054cdc6e22b6f2507'

    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => {
        // Mocking database operations
        User.findById = async (id) => {
            if (id === userId) {
                return { _id: id, name: 'Salva' }
            }
            return null
        }

        Log.find = async (query) => {
            if (query.diver === userId && query._id === logId) {
                return [{ _id: logId, diver: userId, depth: 30, time: 45 }]
            }
            return []
        }
    })

    it('should return the log if the user and log exist', async () => {
        const result = await getLog(userId, logId)

        expect(result).to.be.an('array').that.is.not.empty
        expect(result[0]).to.have.property('_id', logId)
        expect(result[0]).to.have.property('diver', userId)
        expect(result[0]).to.have.property('depth', 30)
        expect(result[0]).to.have.property('time', 45)
    })

    it('should throw NotFoundError if the user does not exist', async () => {
        User.findById = async () => null // Simulate user not found

        await expect(async () => {
            await getLog(userId, logId)
        }).to.be.rejectedWith(NotFoundError, 'User not found')
    })

    it('should return an empty array if the log does not exist for the user', async () => {
        Log.find = async () => [] // Simulate log not found

        const result = await getLog(userId, logId)
        expect(result).to.be.an('array').that.is.empty
    })

    after(() => db.disconnect())
})
