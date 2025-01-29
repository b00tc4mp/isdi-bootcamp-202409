import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User, Pack, Payment, Activity } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors


import checkPackAndUpdate from './checkPackAndUpdate.js'


describe('checkPackAndUpdate', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => Promise.all([User.deleteMany(), BasePack.deleteMany(), Payment.deleteMany(), Pack.deleteMany(), Activity.deleteMany()]))


    it('succeeds 0h/u remaining of the pack, change status', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto Proveedor' })
        const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com', name: 'Risto Cliente' })


        await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
        const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })


        const newPack = await Pack.create({ refPack: createdBasePack._id.toString(), provider: newUserProvider._id.toString(), customer: newUserCustomer._id.toString(), description: 'descripción de la asignación', originalQuantity: createdBasePack.quantity, remainingQuantity: createdBasePack.quantity, unit: createdBasePack.unit, price: createdBasePack.price, currency: createdBasePack.currency, purchaseDate: new Date(), expiryDate: new Date(new Date().setMonth(new Date().getMonth() + createdBasePack.expiringTime)), status: 'Active' })


        const updatedUsedProvider = await User.findByIdAndUpdate(
            newUserProvider._id.toString(),
            {
                $addToSet: { customers: newUserCustomer._id.toString() },
                $push: { ownPacks: newPack._id.toString() }
            },
            { new: true, runValidators: true }
        )


        const updatedUsedCustomer = await User.findByIdAndUpdate(
            newUserCustomer._id.toString(),
            { $push: { adquiredPacks: newPack._id.toString() } },
            { new: true, runValidators: true }
        )


        const addActivity = await Activity.create({
            pack: newPack._id,
            date: new Date(),
            description: `Pack added`,
            operation: 'add',
            quantity: newPack.originalQuantity,
            remainingQuantity: newPack.originalQuantity
        })

        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        await Pack.findByIdAndUpdate(
            checkpackAssigned._id.toString(),
            { $set: { remainingQuantity: 0 } },
            { new: true, runValidators: true }
        )

        await checkPackAndUpdate(checkpackAssigned._id.toString())

        const updatedPack = await Pack.findById(checkpackAssigned._id.toString()).lean();

        expect(updatedPack.status).to.equal('Finished')
    })



    it('succeeds when expired date', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto Proveedor' })
        const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com', name: 'Risto Cliente' })


        await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
        const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })


        const newPack = await Pack.create({ refPack: createdBasePack._id.toString(), provider: newUserProvider._id.toString(), customer: newUserCustomer._id.toString(), description: 'descripción de la asignación', originalQuantity: createdBasePack.quantity, remainingQuantity: createdBasePack.quantity, unit: createdBasePack.unit, price: createdBasePack.price, currency: createdBasePack.currency, purchaseDate: new Date(), expiryDate: new Date(new Date().setMonth(new Date().getMonth() + createdBasePack.expiringTime)), status: 'Active' })


        const updatedUsedProvider = await User.findByIdAndUpdate(
            newUserProvider._id.toString(),
            {
                $addToSet: { customers: newUserCustomer._id.toString() },
                $push: { ownPacks: newPack._id.toString() }
            },
            { new: true, runValidators: true }
        )


        const updatedUsedCustomer = await User.findByIdAndUpdate(
            newUserCustomer._id.toString(),
            { $push: { adquiredPacks: newPack._id.toString() } },
            { new: true, runValidators: true }
        )


        const addActivity = await Activity.create({
            pack: newPack._id,
            date: new Date(),
            description: `Pack added`,
            operation: 'add',
            quantity: newPack.originalQuantity,
            remainingQuantity: newPack.originalQuantity
        })


        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        await Pack.findByIdAndUpdate(
            checkpackAssigned._id.toString(),
            { $set: { remainingQuantity: 4, expiryDate: new Date('2024-01-01') } },
            { new: true, runValidators: true }
        )

        await checkPackAndUpdate(checkpackAssigned._id.toString())

        const updatedPack = await Pack.findById(checkpackAssigned._id.toString()).lean();

        expect(updatedPack.status).to.equal('Expired')
    })


    it('succeeds when 2h/u to end of the pack', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto Proveedor' })
        const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com', name: 'Risto Cliente' })


        await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
        const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })


        const newPack = await Pack.create({ refPack: createdBasePack._id.toString(), provider: newUserProvider._id.toString(), customer: newUserCustomer._id.toString(), description: 'descripción de la asignación', originalQuantity: createdBasePack.quantity, remainingQuantity: createdBasePack.quantity, unit: createdBasePack.unit, price: createdBasePack.price, currency: createdBasePack.currency, purchaseDate: new Date(), expiryDate: new Date(new Date().setMonth(new Date().getMonth() + createdBasePack.expiringTime)), status: 'Active' })


        const updatedUsedProvider = await User.findByIdAndUpdate(
            newUserProvider._id.toString(),
            {
                $addToSet: { customers: newUserCustomer._id.toString() },
                $push: { ownPacks: newPack._id.toString() }
            },
            { new: true, runValidators: true }
        )


        const updatedUsedCustomer = await User.findByIdAndUpdate(
            newUserCustomer._id.toString(),
            { $push: { adquiredPacks: newPack._id.toString() } },
            { new: true, runValidators: true }
        )


        const addActivity = await Activity.create({
            pack: newPack._id,
            date: new Date(),
            description: `Pack added`,
            operation: 'add',
            quantity: newPack.originalQuantity,
            remainingQuantity: newPack.originalQuantity
        })


        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        await Pack.findByIdAndUpdate(
            checkpackAssigned._id.toString(),
            { $set: { remainingQuantity: 1 } },
            { new: true, runValidators: true }
        )

        await checkPackAndUpdate(checkpackAssigned._id.toString())

        const updatedPack = await Pack.findById(checkpackAssigned._id.toString()).lean();

        expect(updatedPack.remainingQuantity).to.equal(1)
    })



    it('fails when packId not found', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto Proveedor' })
        const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com', name: 'Risto Cliente' })

        await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
        const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })

        const newPack = await Pack.create({ refPack: createdBasePack._id.toString(), provider: newUserProvider._id.toString(), customer: newUserCustomer._id.toString(), description: 'descripción de la asignación', originalQuantity: createdBasePack.quantity, remainingQuantity: createdBasePack.quantity, unit: createdBasePack.unit, price: createdBasePack.price, currency: createdBasePack.currency, purchaseDate: new Date(), expiryDate: new Date(new Date().setMonth(new Date().getMonth() + createdBasePack.expiringTime)), status: 'Active' })

        const updatedUsedProvider = await User.findByIdAndUpdate(
            newUserProvider._id.toString(),
            {
                $addToSet: { customers: newUserCustomer._id.toString() },
                $push: { ownPacks: newPack._id.toString() }
            },
            { new: true, runValidators: true }
        )

        const updatedUsedCustomer = await User.findByIdAndUpdate(
            newUserCustomer._id.toString(),
            { $push: { adquiredPacks: newPack._id.toString() } },
            { new: true, runValidators: true }
        )

        const addActivity = await Activity.create({
            pack: newPack._id,
            date: new Date(),
            description: `Pack added`,
            operation: 'add',
            quantity: newPack.originalQuantity,
            remainingQuantity: newPack.originalQuantity
        })

        await expect(
            checkPackAndUpdate('67996934ea9c1dc8a9a30ba5')
        ).to.be.rejectedWith(NotFoundError, 'The pack does not exist')
    })



    it('fails when invalid packId', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto Proveedor' })
        const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com', name: 'Risto Cliente' })

        await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })
        const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })

        const newPack = await Pack.create({ refPack: createdBasePack._id.toString(), provider: newUserProvider._id.toString(), customer: newUserCustomer._id.toString(), description: 'descripción de la asignación', originalQuantity: createdBasePack.quantity, remainingQuantity: createdBasePack.quantity, unit: createdBasePack.unit, price: createdBasePack.price, currency: createdBasePack.currency, purchaseDate: new Date(), expiryDate: new Date(new Date().setMonth(new Date().getMonth() + createdBasePack.expiringTime)), status: 'Active' })

        const updatedUsedProvider = await User.findByIdAndUpdate(
            newUserProvider._id.toString(),
            {
                $addToSet: { customers: newUserCustomer._id.toString() },
                $push: { ownPacks: newPack._id.toString() }
            },
            { new: true, runValidators: true }
        )

        const updatedUsedCustomer = await User.findByIdAndUpdate(
            newUserCustomer._id.toString(),
            { $push: { adquiredPacks: newPack._id.toString() } },
            { new: true, runValidators: true }
        )

        const addActivity = await Activity.create({
            pack: newPack._id,
            date: new Date(),
            description: `Pack added`,
            operation: 'add',
            quantity: newPack.originalQuantity,
            remainingQuantity: newPack.originalQuantity
        })

        await expect(
            checkPackAndUpdate(123456)
        ).to.be.rejectedWith(ValidationError, 'invalid packId')
    })


    after(() => db.disconnect())
})