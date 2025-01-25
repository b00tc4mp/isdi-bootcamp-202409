import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getUserByEmail from './getUserByEmail.js'


describe('getUserByEmail', () => {

    it('success on existing userId and email', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
        const user = await User.findById(newUserProvider._id.toString())

        const userId = await getUserByEmail(user._id.toString(), 'ristop@risto.com')

        expect(user).to.exist //.not.to.be.null
        expect(user.email).to.equal('ristop@risto.com')
        expect(user._id.toString()).to.equal(userId._id.toString())
    })

    /* it('fails on non existing customer by username', () =>
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
    ) */

    after(() => db.disconnect())
})
