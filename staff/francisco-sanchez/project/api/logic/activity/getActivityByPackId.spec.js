import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User, Pack, Payment, Activity } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors


import getActivityByPackId from './getActivityByPackId.js'


describe('getActivities by packId', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => Promise.all([User.deleteMany(), BasePack.deleteMany(), Payment.deleteMany(), Pack.deleteMany(), Activity.deleteMany()]))


    it('succeeds on fetch activities', async () => {
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
            description: `Pack added`,
            operation: 'add',
            quantity: newPack.originalQuantity,
            remainingQuantity: newPack.originalQuantity
        })

        const addActivity2 = await Activity.create({
            pack: newPack._id,
            date: new Date(),
            description: `Quito una hora del tiempo`,
            operation: 'substract',
            quantity: 1,
            remainingQuantity: 4
        })

        const addActivity3 = await Activity.create({
            pack: newPack._id,
            date: new Date(),
            description: `Quito 2 horas mas`,
            operation: 'substract',
            quantity: 2,
            remainingQuantity: 2
        })

        expect(addActivity).to.exist
        expect(addActivity.description).to.equal('Pack added')
        expect(addActivity.operation).to.equal('add')

        expect(addActivity2).to.exist
        expect(addActivity2.description).to.equal('Quito una hora del tiempo')
        expect(addActivity2.operation).to.equal('substract')

        expect(addActivity3).to.exist
        expect(addActivity3.description).to.equal('Quito 2 horas mas')
        expect(addActivity3.operation).to.equal('substract')
        expect(addActivity3.remainingQuantity).to.equal(2)


        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })


        const activityList = await getActivityByPackId(newUserProvider._id.toString(), checkpackAssigned._id.toString())
        expect(activityList).to.be.an('array').that.has.lengthOf(3)
        expect(activityList[0].description).to.equal('Pack added')
        expect(activityList[0].operation).to.equal('add')
        expect(activityList[0].remainingQuantity).to.equal(5)

        expect(activityList[1].description).to.equal('Quito una hora del tiempo')
        expect(activityList[1].operation).to.equal('substract')
        expect(activityList[1].remainingQuantity).to.equal(4)

        expect(activityList[2].description).to.equal('Quito 2 horas mas')
        expect(activityList[2].operation).to.equal('substract')
        expect(activityList[2].remainingQuantity).to.equal(2)
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
                description: `Pack added`,
                operation: 'add',
                quantity: newPack.originalQuantity,
                remainingQuantity: newPack.originalQuantity
            })

            const addActivity2 = await Activity.create({
                pack: newPack._id,
                date: new Date(),
                description: `Quito una hora del tiempo`,
                operation: 'substract',
                quantity: 1,
                remainingQuantity: 4
            })

            const addActivity3 = await Activity.create({
                pack: newPack._id,
                date: new Date(),
                description: `Quito 2 horas mas`,
                operation: 'substract',
                quantity: 2,
                remainingQuantity: 2
            })

            expect(addActivity).to.exist
            expect(addActivity.description).to.equal('Pack added')
            expect(addActivity.operation).to.equal('add')

            expect(addActivity2).to.exist
            expect(addActivity2.description).to.equal('Quito una hora del tiempo')
            expect(addActivity2.operation).to.equal('substract')

            expect(addActivity3).to.exist
            expect(addActivity3.description).to.equal('Quito 2 horas mas')
            expect(addActivity3.operation).to.equal('substract')
            expect(addActivity3.remainingQuantity).to.equal(2)


            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })


            /***************************************** */

            await getActivityByPackId('67979df1baf3c6aef44e0d07', checkpackAssigned._id.toString())

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
                description: `Pack added`,
                operation: 'add',
                quantity: newPack.originalQuantity,
                remainingQuantity: newPack.originalQuantity
            })

            const addActivity2 = await Activity.create({
                pack: newPack._id,
                date: new Date(),
                description: `Quito una hora del tiempo`,
                operation: 'substract',
                quantity: 1,
                remainingQuantity: 4
            })

            const addActivity3 = await Activity.create({
                pack: newPack._id,
                date: new Date(),
                description: `Quito 2 horas mas`,
                operation: 'substract',
                quantity: 2,
                remainingQuantity: 2
            })

            expect(addActivity).to.exist
            expect(addActivity.description).to.equal('Pack added')
            expect(addActivity.operation).to.equal('add')

            expect(addActivity2).to.exist
            expect(addActivity2.description).to.equal('Quito una hora del tiempo')
            expect(addActivity2.operation).to.equal('substract')

            expect(addActivity3).to.exist
            expect(addActivity3.description).to.equal('Quito 2 horas mas')
            expect(addActivity3.operation).to.equal('substract')
            expect(addActivity3.remainingQuantity).to.equal(2)


            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })
            /***************************************** */

            await getActivityByPackId(98769876987, checkpackAssigned._id.toString())

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
                description: `Pack added`,
                operation: 'add',
                quantity: newPack.originalQuantity,
                remainingQuantity: newPack.originalQuantity
            })

            const addActivity2 = await Activity.create({
                pack: newPack._id,
                date: new Date(),
                description: `Quito una hora del tiempo`,
                operation: 'substract',
                quantity: 1,
                remainingQuantity: 4
            })

            const addActivity3 = await Activity.create({
                pack: newPack._id,
                date: new Date(),
                description: `Quito 2 horas mas`,
                operation: 'substract',
                quantity: 2,
                remainingQuantity: 2
            })

            expect(addActivity).to.exist
            expect(addActivity.description).to.equal('Pack added')
            expect(addActivity.operation).to.equal('add')

            expect(addActivity2).to.exist
            expect(addActivity2.description).to.equal('Quito una hora del tiempo')
            expect(addActivity2.operation).to.equal('substract')

            expect(addActivity3).to.exist
            expect(addActivity3.description).to.equal('Quito 2 horas mas')
            expect(addActivity3.operation).to.equal('substract')
            expect(addActivity3.remainingQuantity).to.equal(2)


            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })
            /***************************************** */

            await getActivityByPackId(newUserProvider._id.toString(), '679803e754c88ee156e542dc')

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
                description: `Pack added`,
                operation: 'add',
                quantity: newPack.originalQuantity,
                remainingQuantity: newPack.originalQuantity
            })

            const addActivity2 = await Activity.create({
                pack: newPack._id,
                date: new Date(),
                description: `Quito una hora del tiempo`,
                operation: 'substract',
                quantity: 1,
                remainingQuantity: 4
            })

            const addActivity3 = await Activity.create({
                pack: newPack._id,
                date: new Date(),
                description: `Quito 2 horas mas`,
                operation: 'substract',
                quantity: 2,
                remainingQuantity: 2
            })

            expect(addActivity).to.exist
            expect(addActivity.description).to.equal('Pack added')
            expect(addActivity.operation).to.equal('add')

            expect(addActivity2).to.exist
            expect(addActivity2.description).to.equal('Quito una hora del tiempo')
            expect(addActivity2.operation).to.equal('substract')

            expect(addActivity3).to.exist
            expect(addActivity3.description).to.equal('Quito 2 horas mas')
            expect(addActivity3.operation).to.equal('substract')
            expect(addActivity3.remainingQuantity).to.equal(2)


            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })
            /***************************************** */

            await getActivityByPackId(newUserProvider._id.toString(), 76987698769)

        })()).to.be.rejectedWith(ValidationError, 'invalid packId')
    )



    it('succeds on no activities yet', () =>
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

            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

            /***************************************** */

            await getActivityByPackId(newUserProvider._id.toString(), newPack._id.toString())

        })()).to.be.rejectedWith(NotFoundError, 'There are not activities registered for this pack')
    )

    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})