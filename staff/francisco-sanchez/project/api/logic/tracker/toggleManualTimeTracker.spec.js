import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User, Pack, Payment, Activity } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors


import toggleManualTimeTracker from './toggleManualTimeTracker.js'


describe('toggle Manual Time Tracker', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => Promise.all([User.deleteMany(), BasePack.deleteMany(), Payment.deleteMany(), Pack.deleteMany(), Activity.deleteMany()]))


    it('succeeds on add manual time', async () => {
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


        expect(addActivity).to.exist
        expect(addActivity.description).to.equal('Pack added')
        expect(addActivity.operation).to.equal('add')


        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        const updatedPack = await toggleManualTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), newUserCustomer._id.toString(), 'añado 1,5h al pack', '01:30:00')
        expect(updatedPack.remainingQuantity).to.equal(6.5)
        expect(updatedPack.originalQuantity).to.equal(5)

        const packs = await Activity.find({ pack: checkpackAssigned._id.toString() })

        expect(packs).to.be.an('array').that.has.lengthOf(2)

        expect(packs[0].description).to.equal('Pack added')
        expect(packs[0].operation).to.equal('add')
        expect(packs[0].remainingQuantity).to.equal(5)

        expect(packs[1].description).to.equal('añado 1,5h al pack')
        expect(packs[1].operation).to.equal('add')
        expect(packs[1].remainingQuantity).to.equal(6.5)
    })

    it('succeeds on substract manual time', async () => {
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


        expect(addActivity).to.exist
        expect(addActivity.description).to.equal('Pack added')
        expect(addActivity.operation).to.equal('add')


        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        const updatedPack = await toggleManualTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), newUserCustomer._id.toString(), 'quito 1,5h al pack', '-01:30:00')
        expect(updatedPack.remainingQuantity).to.equal(3.5)
        expect(updatedPack.originalQuantity).to.equal(5)

        const packs = await Activity.find({ pack: checkpackAssigned._id.toString() })

        expect(packs).to.be.an('array').that.has.lengthOf(2)

        expect(packs[0].description).to.equal('Pack added')
        expect(packs[0].operation).to.equal('add')
        expect(packs[0].remainingQuantity).to.equal(5)

        expect(packs[1].description).to.equal('quito 1,5h al pack')
        expect(packs[1].operation).to.equal('substract')
        expect(packs[1].remainingQuantity).to.equal(3.5)
    })


    it('succeeds on substract manual time and no description added', async () => {
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


        expect(addActivity).to.exist
        expect(addActivity.description).to.equal('Pack added')
        expect(addActivity.operation).to.equal('add')


        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        const updatedPack = await toggleManualTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), newUserCustomer._id.toString(), '', '-01:30:00')
        expect(updatedPack.remainingQuantity).to.equal(3.5)
        expect(updatedPack.originalQuantity).to.equal(5)

        const packs = await Activity.find({ pack: checkpackAssigned._id.toString() })

        expect(packs).to.be.an('array').that.has.lengthOf(2)

        expect(packs[0].description).to.equal('Pack added')
        expect(packs[0].operation).to.equal('add')
        expect(packs[0].remainingQuantity).to.equal(5)

        expect(packs[1].description).to.equal('No description')
        expect(packs[1].operation).to.equal('substract')
        expect(packs[1].remainingQuantity).to.equal(3.5)
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
            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })


            await toggleManualTimeTracker('678640d38e72f4f81f327b89', checkpackAssigned._id.toString(), newUserCustomer._id.toString(), 'quito 1,5h al pack', '-01:30:00')
            /***************************************** */

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
            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })


            await toggleManualTimeTracker(123456, checkpackAssigned._id.toString(), newUserCustomer._id.toString(), 'quito 1,5h al pack', '-01:30:00')
            /***************************************** */

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
            const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })


            await toggleManualTimeTracker(newUserProvider._id.toString(), '6799511d29bbdc2f01504004', newUserCustomer._id.toString(), 'quito 1,5h al pack', '-01:30:00')
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


            await toggleManualTimeTracker(newUserProvider._id.toString(), 123456, newUserCustomer._id.toString(), 'quito 1,5h al pack', '-01:30:00')
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


            await toggleManualTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), 123456, 'quito 1,5h al pack', '-01:30:00')
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

            await toggleManualTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), checkpackAssigned._id.toString(), 'quito 1,5h al pack', '-01:30:00')
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

            await toggleManualTimeTracker(newUserProvider._id.toString(), checkpackAssigned._id.toString(), checkpackAssigned._id.toString(), 'quito 1,5h al pack', '-01:30:00')
            /***************************************** */

        })()).to.be.rejectedWith(ValidationError, 'This pack has expired and cannot be used anymore')
    )


    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})