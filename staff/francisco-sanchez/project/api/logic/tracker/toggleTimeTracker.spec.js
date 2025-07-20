import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User, Pack, Payment, Activity } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, OwnershipError } = errors


import toggleTimeTracker from './toggleTimeTracker.js'


describe('toggle Time Tracker', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => Promise.all([User.deleteMany(), BasePack.deleteMany(), Payment.deleteMany(), Pack.deleteMany(), Activity.deleteMany()]))


    it('succeeds on Start timmer', async () => {
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


        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        const startPackTimmer = await toggleTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), newUserCustomer._id.toString(), 'test to start/stop timer', 'substract')

        const packs = await Activity.find({ pack: checkpackAssigned._id.toString() })


        const checkpackAssigned2 = await Pack.findOne({ provider: newUserProvider._id.toString() })

        expect(checkpackAssigned2.timerActivated).to.not.equal(null)
        expect(checkpackAssigned2.descriptionActivityTemp).to.equal('test to start/stop timer')
    })


    it('succeeds on Start and Stop timmer after 5 seconds', async () => {
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


        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        const startPackTimmer = await toggleTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), newUserCustomer._id.toString(), 'test to start/stop timer', 'substract')

        const packs = await Activity.find({ pack: checkpackAssigned._id.toString() })


        const checkpackAssigned2 = await Pack.findOne({ provider: newUserProvider._id.toString() })

        expect(checkpackAssigned2.timerActivated).to.not.equal(null)
        expect(checkpackAssigned2.descriptionActivityTemp).to.equal('test to start/stop timer')


        const stopTimmer = await toggleTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), newUserCustomer._id.toString(), 'test to start/stop timer', 'substract')
        const checkpackAssigned3 = await Pack.findOne({ provider: newUserProvider._id.toString() })

        expect(checkpackAssigned3.timerActivated).to.equal(null)
        expect(checkpackAssigned3.descriptionActivityTemp).to.equal(null)
    })


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


            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

            const startPackTimmer = await toggleTimeTracker(123456, checkpackAssigned._id.toString(), newUserCustomer._id.toString(), 'test to start/stop timer', 'substract')

            /***************************************** */

        })()).to.be.rejectedWith(ValidationError, 'invalid userId')
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
            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })


            await toggleTimeTracker(123456, checkpackAssigned._id.toString(), newUserCustomer._id.toString(), 'descripción de la tarea', 'substract')
            /***************************************** */

        })()).to.be.rejectedWith(ValidationError, 'invalid userId')
    )


    it('fails on ownership error', () =>
        expect((async () => {
            //*********************************** */
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserProvider2 = await User.create({ username: 'ristoProvider3', password: 'risto123', email: 'ristop3@risto.com' })
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
            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })


            await toggleTimeTracker(newUserProvider2._id.toString(), checkpackAssigned._id.toString(), newUserCustomer._id.toString(), 'descripción de la tarea', 'substract')
            /***************************************** */

        })()).to.be.rejectedWith(OwnershipError, 'Your user is not the owner of this pack relationship')
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
            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })


            await toggleTimeTracker(newUserProvider._id.toString(), '679a3bf729a62d5060908e31', newUserCustomer._id.toString(), 'descripción de la tarea', 'substract')
            /***************************************** */

        })()).to.be.rejectedWith(NotFoundError, 'Pack to track not found')
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
            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })


            await toggleTimeTracker(newUserProvider._id.toString(), 123456, newUserCustomer._id.toString(), 'descripción de la tarea', 'substract')
            /***************************************** */

        })()).to.be.rejectedWith(ValidationError, 'invalid packId')
    )



    it('fails on invalid customerId', () =>
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
            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })


            await toggleTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), 123456, 'description of the tast', 'substract')
            /***************************************** */

        })()).to.be.rejectedWith(ValidationError, 'invalid customerId')
    )


    it('fails on invalid pack status', () =>
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

            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

            await Pack.findByIdAndUpdate(
                checkpackAssigned._id.toString(),
                { $set: { status: 'Finished', remainingQuantity: 0 } },
                { new: true, runValidators: true }
            )

            await toggleTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), checkpackAssigned._id.toString(), 'description task', 'substract')
            /***************************************** */

        })()).to.be.rejectedWith(ValidationError, 'This pack has an invalid status to work (Finished, Pending or Expired)')
    )



    it('fails on expired pack date', () =>
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

            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

            await Pack.findByIdAndUpdate(
                checkpackAssigned._id.toString(),
                { $set: { expiryDate: new Date('2024-01-01'), remainingQuantity: 3 } },
                { new: true, runValidators: true }
            )

            await toggleTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), checkpackAssigned._id.toString(), 'pack description', 'substract')
            /***************************************** */

        })()).to.be.rejectedWith(ValidationError, 'This pack has expired and cannot be used anymore')
    )


    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})