import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User, Pack } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors


import getBasePacks from './getBasePacks.js'


describe('getBasePacks', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => Promise.all([User.deleteMany(), BasePack.deleteMany()]))


    it('succeeds on get user BasePacks', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })

        const newBasePack = await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })

        const findBasePack = await getBasePacks(newUserProvider._id.toString())
        expect(findBasePack).to.be.an('array')
        expect(findBasePack).to.have.lengthOf(1)
        expect(findBasePack[0].packName).to.equal('pack de 5h')
        expect(findBasePack[0].description).to.equal('Descripción del pack')
        expect(findBasePack[0].quantity).to.equal(5)
        expect(findBasePack[0].unit).to.equal('hours')
        expect(findBasePack[0].expiringTime).to.equal(12)
        expect(findBasePack[0].price).to.equal(1000)
        expect(findBasePack[0].currency).to.equal('EUR')
    })

    it('fails on non existing userId', () =>
        expect((async () => {
            //*********************************** */
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
            const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })
            const checkpackAssigned = await BasePack.findOne({ provider: newUserProvider._id.toString() })
            /***************************************** */

            await getBasePacks('67a1e06edfb13a2f2b416ff3')

        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )
    after(() => db.disconnect())
})