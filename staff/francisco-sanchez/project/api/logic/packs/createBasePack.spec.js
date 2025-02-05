import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import createBasePack from './createBasePack.js'

describe('createBasePack', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => Promise.all([User.deleteMany(), BasePack.deleteMany()]))


    it('succeeds on new basePack', async () => {
        const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })

        await createBasePack(newUser._id.toString(), 'pack de 5h', 'Descripción del pack', 5, 'hours', '12', 1000, 'EUR')

        const pack = await BasePack.findOne({ user: newUser._id })

        expect(pack).to.exist //.not.to.be.null
        expect(pack.packName).to.equal('pack de 5h')
        expect(pack.packName).to.be.a.string
        expect(pack.description).to.equal('Descripción del pack')
        expect(pack.quantity).to.equal(5)
        expect(pack.unit).to.equal('hours')
        expect(pack.expiringTime).to.equal(12)
        expect(pack.price).to.equal(1000)
        expect(pack.currency).to.equal('EUR')
    })

    it('fails on non existing user', () =>
        expect((async () => {
            await createBasePack('9790e3bd44bebbc8db317786', 'pack de 5h', 'Descripción del pack', 5, 'hours', '12', 1000, 'EUR')
        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on invalid packName', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
            await createBasePack(newUser._id.toString(), 'asd', 'Descripción del pack', 5, 'hours', 12, 1000, 'EUR')
        })()).to.be.rejectedWith(ValidationError, 'pack name should have more than 5 chars and less than 50')
    )

    it('fails on invalid empty packName', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
            await createBasePack(newUser._id.toString(), '', 'Descripción del pack', 5, 'hours', 12, 1000, 'EUR')
        })()).to.be.rejectedWith(ValidationError, 'pack name is required')
    )

    /* it('fails on invalid price', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
            await createBasePack(newUser._id.toString(), 'aaaaaaaaa', 'Descripción del pack', 5, 'hours', 12, '1000', 'EUR')
        })()).to.be.rejectedWith(ValidationError, 'Value provided should be a valid number')
    ) */

    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})
