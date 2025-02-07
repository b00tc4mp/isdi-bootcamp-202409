import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import updateBasePack from './updateBasePack.js'

describe('updateBasePack', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => Promise.all([User.deleteMany(), BasePack.deleteMany()]))

    it('succeeds on new basePack updated', async () => {
        const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })

        const newBasePack = await BasePack.create({ user: newUser._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: '12', price: 1000, currency: 'EUR' })

        await updateBasePack(newUser._id.toString(), newBasePack._id.toString(), 'pack de 10h', 'Descripción updated del pack', 10, 'units', '-1', 100, 'EUR')

        const checkpackUpdated = await BasePack.findOne({ user: newUser._id })

        expect(checkpackUpdated).to.exist //.not.to.be.null
        expect(checkpackUpdated.packName).to.equal('pack de 10h')
        expect(checkpackUpdated.packName).to.be.a.string
        expect(checkpackUpdated.description).to.equal('Descripción updated del pack')
        expect(checkpackUpdated.quantity).to.equal(10)
        expect(checkpackUpdated.unit).to.equal('units')
        expect(checkpackUpdated.expiringTime).to.equal(-1)
        expect(checkpackUpdated.price).to.equal(100)
        expect(checkpackUpdated.currency).to.equal('EUR')
    })

    it('fails on non existing user', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
            const newBasePack = await BasePack.create({ user: newUser._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: '12', price: 1000, currency: 'EUR' })
            await updateBasePack('9790e3bd44bebbc8db317786', newBasePack._id.toString(), 'pack de 5h', 'Descripción del pack', 5, 'hours', '12', 1000, 'EUR')
        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non existing basePack', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
            await updateBasePack(newUser._id.toString(), '9790e3bd54bebbc8db317786', 'pack de 5h', 'Descripción del pack', 5, 'hours', '12', 1000, 'EUR')
        })()).to.be.rejectedWith(NotFoundError, 'Pack not found')
    )

    it('fails on invalid packName', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
            const newBasePack = await BasePack.create({ user: newUser._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: '12', price: 1000, currency: 'EUR' })
            await updateBasePack(newUser._id.toString(), newBasePack._id.toString(), 'asd', 'Descripción del pack', 5, 'hours', '12', 1000, 'EUR')
        })()).to.be.rejectedWith(ValidationError, 'pack name should have more than 5 chars and less than 50')
    )

    it('fails on invalid empty packName', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
            const newBasePack = await BasePack.create({ user: newUser._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: '12', price: 1000, currency: 'EUR' })

            await updateBasePack(newUser._id.toString(), newBasePack._id.toString(), '', 'Descripción del pack', 5, 'hours', '12', 1000, 'EUR')
        })()).to.be.rejectedWith(ValidationError, 'pack name is required')
    )

    it('fails on invalid description', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
            const newBasePack = await BasePack.create({ user: newUser._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: '12', price: 1000, currency: 'EUR' })
            await updateBasePack(newUser._id.toString(), newBasePack._id.toString(), 'nombre del pack', 'a'.repeat(260), 5, 'hours', '12', 1000, 'EUR')
        })()).to.be.rejectedWith(ValidationError, 'Invalid description length: maximum allowed is 255 characters.')
    )


    it('fails on invalid currency more than 3 chars', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
            const newBasePack = await BasePack.create({ user: newUser._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: '12', price: 1000, currency: 'EUR' })

            await updateBasePack(newUser._id.toString(), newBasePack._id.toString(), 'nombre del pack', 'Descripción del pack', 5, 'hours', '12', 1000, 'euro')
        })()).to.be.rejectedWith(ValidationError, 'currency should have 3 characters')
    )

    after(() => db.disconnect())
})
