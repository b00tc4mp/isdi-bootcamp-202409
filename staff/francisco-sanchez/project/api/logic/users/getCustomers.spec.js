import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User, Pack } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getCustomers from './getCustomers.js'
import assignPack from '../packs/assignPack.js'
import getCustomerPacks from './getCustomerPacks.js'

describe('getCustomerPacks', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() =>
        Promise.all([User.deleteMany(),
        BasePack.deleteMany(),
        Pack.deleteMany()
        ]))


    it('succeeds on userId have customers', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
        const newUserCustomer2 = await User.create({ username: 'ristoCustomer1', password: 'risto123', email: 'ristoc1@risto.com' })
        const newUserCustomer3 = await User.create({ username: 'ristoCustomer2', password: 'risto123', email: 'ristoc2@risto.com' })
        const newUserCustomer4 = await User.create({ username: 'ristoCustomer3', password: 'risto123', email: 'ristoc3@risto.com' })

        const customerSearchByUsername1 = 'ristoCustomer1'
        const customerSearchByUsername2 = 'ristoCustomer2'
        const customerSearchByUsername3 = 'ristoCustomer3'
        const customerSearchByEmail = 'ristoc@risto.com'

        const newBasePack = await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })

        const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })

        await assignPack(newUserProvider._id.toString(), customerSearchByUsername1, createdBasePack._id.toString(), 'Descripción del pack asignado', 500, 'cash')
        await assignPack(newUserProvider._id.toString(), customerSearchByUsername2, createdBasePack._id.toString(), 'Descripción del pack asignado', 500, 'cash')
        await assignPack(newUserProvider._id.toString(), customerSearchByUsername3, createdBasePack._id.toString(), 'Descripción del pack asignado', 500, 'cash')

        // Ahora comprobamos que se hayan creado 3 packs
        const checkpacksAssigned = await Pack.find({
            provider: newUserProvider._id.toString()
        })

        expect(checkpacksAssigned).to.exist
        expect(checkpacksAssigned).to.be.an('array')
        expect(checkpacksAssigned).to.have.lengthOf(3)

        checkpacksAssigned.forEach(assigned => {
            expect(assigned.description).to.equal('Descripción del pack asignado')
            expect(assigned.description).to.be.a('string')
            expect(assigned.originalQuantity).to.equal(5)
            expect(assigned.unit).to.equal('hours')
            expect(assigned.price).to.equal(1000)
            expect(assigned.currency).to.equal('EUR')
        })

        const customerPacks = await getCustomers(newUserProvider._id.toString())

        expect(customerPacks).to.be.an('array')
        expect(customerPacks).to.have.lengthOf(3)

    })

    it('fails on invalid userId', () =>
        expect((async () => {
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })
            await getCustomers('9790e3bd4b2ed1')
        })()).to.be.rejectedWith(ValidationError, 'invalid userId')
    )

    it('fails on non existing userId', () =>
        expect((async () => {
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })
            await getCustomers('6780f8fe58255d20563d6a5f')
        })()).to.be.rejectedWith(NotFoundError, 'User not found')
    )


    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})
