import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User, Pack, Activity, Payment } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors


import assignPack from './assignPack.js'


describe('assignPack', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => Promise.all([User.deleteMany(), BasePack.deleteMany()]))

    it('succeeds on new assign pack by userName', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
        const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })

        const customerSearchByUsername = 'ristoCustomer'
        const customerSearchByEmail = 'ristoc@risto.com'

        const newBasePack = await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })

        const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })

        await assignPack(newUserProvider._id.toString(), customerSearchByUsername, createdBasePack._id.toString(), 'Descripción del pack asignado', 500, 'cash')

        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        expect(checkpackAssigned).to.exist //.not.to.be.null
        expect(checkpackAssigned.description).to.equal('Descripción del pack asignado')
        expect(checkpackAssigned.description).to.be.a.string
        expect(checkpackAssigned.originalQuantity).to.equal(5)
        expect(checkpackAssigned.unit).to.equal('hours')
        expect(checkpackAssigned.price).to.equal(1000)
        expect(checkpackAssigned.currency).to.equal('EUR')
    })

    it('succeeds on new assign pack by email', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
        const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })

        const customerSearchByUsername = 'ristoCustomer'
        const customerSearchByEmail = 'ristoc@risto.com'

        const newBasePack = await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
        const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })

        await assignPack(newUserProvider._id.toString(), customerSearchByEmail, createdBasePack._id.toString(), 'Descripción del pack asignado', 500, 'cash')

        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        expect(checkpackAssigned).to.exist //.not.to.be.null
        expect(checkpackAssigned.description).to.equal('Descripción del pack asignado')
        expect(checkpackAssigned.description).to.be.a.string
        expect(checkpackAssigned.originalQuantity).to.equal(5)
        expect(checkpackAssigned.unit).to.equal('hours')
        expect(checkpackAssigned.price).to.equal(1000)
        expect(checkpackAssigned.currency).to.equal('EUR')
    })

    it('fails on non existing customer by username', () =>
        expect((async () => {
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })
            const customerNotfound = 'ristoCustomeratopedepower'
            const customerSearchByEmail = 'ristoc@risto.com'
            const newBasePack = await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
            const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })
            await assignPack(newUserProvider._id.toString(), customerNotfound, createdBasePack._id.toString(), 'Descripción del pack asignado', 500, 'cash')
        })()).to.be.rejectedWith(NotFoundError, 'Customer not found')
    )

    it('fails on non existing customer by email', () =>
        expect((async () => {
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })
            const customerNotfound = 'ristoCustomeratopedepower'
            const customerSearchByEmailNotFound = 'ristococoloco@risto.com'
            const newBasePack = await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
            const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })
            await assignPack(newUserProvider._id.toString(), customerSearchByEmailNotFound, createdBasePack._id.toString(), 'Descripción del pack asignado', 500, 'cash')
        })()).to.be.rejectedWith(NotFoundError, 'Customer not found')
    )

    it('fails on non existing userId', () =>
        expect((async () => {
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })
            const customerSearchByEmail = 'ristoCustomer'
            const newBasePack = await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
            const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })
            await assignPack('6794119f31f2834e80a3a5c7', customerSearchByEmail, createdBasePack._id.toString(), 'Descripción del pack asignado', 500, 'cash')
        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on invalid packId', () =>
        expect((async () => {
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })
            const customerSearchByEmail = 'ristoCustomer'
            const newBasePack = await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
            const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })
            await assignPack(newUserProvider._id.toString(), customerSearchByEmail, '6794119f2834e80a3a5c7', 'Descripción del pack asignado', 500, 'cash')
        })()).to.be.rejectedWith(ValidationError, 'invalid packId')
    )

    it('fails on non existing basePack', () =>
        expect((async () => {
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })
            const customerSearchByEmail = 'ristoCustomer'
            const newBasePack = await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
            const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })
            await assignPack(newUserProvider._id.toString(), customerSearchByEmail, '6790f8437cfb3273d03f336c', 'Descripción del pack asignado', 500, 'cash')
        })()).to.be.rejectedWith(NotFoundError, 'Base pack not found')
    )

    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})
