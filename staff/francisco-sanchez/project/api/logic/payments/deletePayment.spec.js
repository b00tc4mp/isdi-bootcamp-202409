import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User, Pack, Payment, Activity } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors


import deletePayment from './deletePayment.js'


describe('deletePayment', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => Promise.all([User.deleteMany(), BasePack.deleteMany(), Payment.deleteMany(), Pack.deleteMany(), Activity.deleteMany()]))


    it('succeeds on delete payment', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
        const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })


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
            description: `Pack added: ${newPack.description}`,
            operation: 'add',
            quantity: newPack.originalQuantity,
            remainingQuantity: newPack.originalQuantity
        })


        let payedAmount = 10
        const initialPayment = await Payment.create({
            pack: newPack._id,
            amount: payedAmount,
            currency: newPack.currency,
            date: new Date(),
            method: 'cash'
        })

        const addedPayment = await Payment.findById(initialPayment._id.toString())

        await deletePayment(newUserProvider._id.toString(), addedPayment._id.toString())


    })

    it('fails on non existing payment', () =>
        expect((async () => {
            //*********************************** */
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })


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
                description: `Pack added: ${newPack.description}`,
                operation: 'add',
                quantity: newPack.originalQuantity,
                remainingQuantity: newPack.originalQuantity
            })


            let payedAmount = 10
            const initialPayment = await Payment.create({
                pack: newPack._id,
                amount: payedAmount,
                currency: newPack.currency,
                date: new Date(),
                method: 'cash'
            })

            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })
            /***************************************** */

            const addedPayment = await Payment.findById(initialPayment._id.toString())
            await deletePayment(newUserProvider._id.toString(), '67979df1baf3c6aef44e0d00')


        })()).to.be.rejectedWith(NotFoundError, 'payment not found')
    )


    it('fails on user not found', () =>
        expect((async () => {
            //*********************************** */
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })


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
                description: `Pack added: ${newPack.description}`,
                operation: 'add',
                quantity: newPack.originalQuantity,
                remainingQuantity: newPack.originalQuantity
            })


            let payedAmount = 10
            const initialPayment = await Payment.create({
                pack: newPack._id,
                amount: payedAmount,
                currency: newPack.currency,
                date: new Date(),
                method: 'cash'
            })

            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })
            /***************************************** */

            const addedPayment = await Payment.findById(initialPayment._id.toString())
            await deletePayment('67979df1baf3c6aef44e0d00', addedPayment._id.toString())


        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )


    it('fails invalid userId', () =>
        expect((async () => {
            //*********************************** */
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })


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
                description: `Pack added: ${newPack.description}`,
                operation: 'add',
                quantity: newPack.originalQuantity,
                remainingQuantity: newPack.originalQuantity
            })


            let payedAmount = 10
            const initialPayment = await Payment.create({
                pack: newPack._id,
                amount: payedAmount,
                currency: newPack.currency,
                date: new Date(),
                method: 'cash'
            })

            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })
            /***************************************** */

            const addedPayment = await Payment.findById(initialPayment._id.toString())
            await deletePayment(12343343432, addedPayment._id.toString())


        })()).to.be.rejectedWith(ValidationError, 'invalid userId')
    )


    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})