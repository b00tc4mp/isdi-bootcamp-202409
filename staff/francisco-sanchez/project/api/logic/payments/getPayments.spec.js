import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User, Pack, Payment, Activity } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors


import getPayments from './getPayments.js'


describe('getPayments', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => Promise.all([User.deleteMany(), BasePack.deleteMany(), Payment.deleteMany(), Pack.deleteMany(), Activity.deleteMany()]))


    it('succeeds on fetch pack payments', async () => {
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

        const payment1 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 30, currency: 'EUR', method: 'cash', status: 'partially payed', date: new Date() })
        const payment2 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 40, currency: 'EUR', method: 'cash', status: 'partially payed', date: new Date() })
        const payment3 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 50, currency: 'EUR', method: 'stripe', status: 'partially payed', date: new Date() })


        expect(payment1).to.exist
        expect(payment1.amount).to.equal(30)
        expect(payment1.currency).to.equal('EUR')
        expect(payment1.method).to.equal('cash')

        expect(payment2).to.exist
        expect(payment2.amount).to.equal(40)
        expect(payment2.currency).to.equal('EUR')
        expect(payment2.method).to.equal('cash')

        expect(payment3).to.exist
        expect(payment3.amount).to.equal(50)
        expect(payment3.currency).to.equal('EUR')
        expect(payment3.method).to.equal('stripe')

        const paymentsList = await getPayments(newUserProvider._id.toString(), checkpackAssigned._id.toString())
        expect(paymentsList).to.be.an('array').that.has.lengthOf(4)
        expect(paymentsList[0].amount).to.equal(10)
        expect(paymentsList[0].currency).to.equal('EUR')
        expect(paymentsList[0].method).to.equal('cash')

        expect(paymentsList[1].amount).to.equal(30)
        expect(paymentsList[1].currency).to.equal('EUR')
        expect(paymentsList[1].method).to.equal('cash')

        expect(paymentsList[2].amount).to.equal(40)
        expect(paymentsList[2].currency).to.equal('EUR')
        expect(paymentsList[2].method).to.equal('cash')

        expect(paymentsList[3].amount).to.equal(50)
        expect(paymentsList[3].currency).to.equal('EUR')
        expect(paymentsList[3].method).to.equal('stripe')

    })

    it('fails on non existing userId', () =>
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

            const payment1 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 30, currency: 'EUR', method: 'cash', status: 'partially payed', date: new Date() })
            const payment2 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 40, currency: 'EUR', method: 'cash', status: 'partially payed', date: new Date() })
            const payment3 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 50, currency: 'EUR', method: 'stripe', status: 'partially payed', date: new Date() })
            /***************************************** */

            await getPayments('67979df1baf3c6aef44e0d07', checkpackAssigned._id.toString())
            const checkPayment = await Payment.findOne({ pack: checkpackAssigned._id.toString(), amount: 30 })

        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )



    it('fails on invalid userId', () =>
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

            const payment1 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 30, currency: 'EUR', method: 'cash', status: 'partially payed', date: new Date() })
            const payment2 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 40, currency: 'EUR', method: 'cash', status: 'partially payed', date: new Date() })
            const payment3 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 50, currency: 'EUR', method: 'stripe', status: 'partially payed', date: new Date() })
            /***************************************** */

            await getPayments(98769876987, checkpackAssigned._id.toString())
            const checkPayment = await Payment.findOne({ pack: checkpackAssigned._id.toString(), amount: 30 })

        })()).to.be.rejectedWith(ValidationError, 'invalid userId')
    )




    it('fails on pack not found', () =>
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

            const payment1 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 30, currency: 'EUR', method: 'cash', status: 'partially payed', date: new Date() })
            const payment2 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 40, currency: 'EUR', method: 'cash', status: 'partially payed', date: new Date() })
            const payment3 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 50, currency: 'EUR', method: 'stripe', status: 'partially payed', date: new Date() })
            /***************************************** */

            await getPayments(newUserProvider._id.toString(), '679803e754c88ee156e542dc')

        })()).to.be.rejectedWith(NotFoundError, 'pack not found')
    )




    it('fails on invalid packId', () =>
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

            const payment1 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 30, currency: 'EUR', method: 'cash', status: 'partially payed', date: new Date() })
            const payment2 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 40, currency: 'EUR', method: 'cash', status: 'partially payed', date: new Date() })
            const payment3 = await Payment.create({ pack: checkpackAssigned._id.toString(), amount: 50, currency: 'EUR', method: 'stripe', status: 'partially payed', date: new Date() })
            /***************************************** */

            await getPayments(newUserProvider._id.toString(), 76987698769)

        })()).to.be.rejectedWith(ValidationError, 'invalid packId')
    )



    it('succeds on no payments added', () =>
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


            /***************************************** */

            await getPayments(newUserProvider._id.toString(), newPack._id.toString())

        })()).to.be.rejectedWith(NotFoundError, 'no payments found for this pack')
    )


    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})