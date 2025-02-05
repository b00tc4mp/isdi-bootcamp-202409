import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User, Pack } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getCustomerPacks from './getCustomerPacks.js'
import assignPack from '../packs/assignPack.js'

describe('getCustomerPacks', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() =>
        Promise.all([User.deleteMany(),
        BasePack.deleteMany(),
        Pack.deleteMany()
        ]))


    it('succeeds on user have asigned packs', async () => {
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

        // Llamamos a getCustomerPacks y verificamos el resultado
        const customerPacks = await getCustomerPacks(newUserProvider._id.toString(), newUserCustomer._id.toString())

        // Verificamos que sea un array con exactamente 1 elemento
        expect(customerPacks).to.be.an('array')
        expect(customerPacks).to.have.lengthOf(1)
        expect(customerPacks[0].paymentStatus).to.equal('partially payed')

        // Podemos verificar el contenido del primer elemento del array
        const [assignedPack] = customerPacks
        expect(assignedPack.description).to.equal('Descripción del pack asignado')
        expect(assignedPack.unit).to.equal('hours')
        expect(assignedPack.price).to.equal(1000)
        expect(assignedPack.currency).to.equal('EUR')
    })


    it('succeeds on user have asigned packs without payments', async () => {
        const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
        const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })

        const customerSearchByUsername = 'ristoCustomer'
        const customerSearchByEmail = 'ristoc@risto.com'

        const newBasePack = await BasePack.create({ user: newUserProvider._id.toString(), packName: 'pack de 5h', description: 'Descripción del pack', quantity: 5, unit: 'hours', expiringTime: 12, price: 1000, currency: 'EUR' })

        const createdBasePack = await BasePack.findOne({ user: newUserProvider._id.toString() })

        await assignPack(newUserProvider._id.toString(), customerSearchByUsername, createdBasePack._id.toString(), 'Descripción del pack asignado', 0, 'others')

        const checkpackAssigned = await Pack.findOne({ provider: newUserProvider._id.toString() })

        expect(checkpackAssigned).to.exist //.not.to.be.null
        expect(checkpackAssigned.description).to.equal('Descripción del pack asignado')
        expect(checkpackAssigned.description).to.be.a.string
        expect(checkpackAssigned.originalQuantity).to.equal(5)
        expect(checkpackAssigned.unit).to.equal('hours')
        expect(checkpackAssigned.price).to.equal(1000)
        expect(checkpackAssigned.currency).to.equal('EUR')

        // Llamamos a getCustomerPacks y verificamos el resultado
        const customerPacks = await getCustomerPacks(newUserProvider._id.toString(), newUserCustomer._id.toString())

        // Verificamos que sea un array con exactamente 1 elemento
        expect(customerPacks).to.be.an('array')
        expect(customerPacks).to.have.lengthOf(1)
        expect(customerPacks[0].paymentStatus).to.equal('pending')


        // Podemos verificar el contenido del primer elemento del array
        const [assignedPack] = customerPacks
        expect(assignedPack.description).to.equal('Descripción del pack asignado')
        expect(assignedPack.unit).to.equal('hours')
        expect(assignedPack.price).to.equal(1000)
        expect(assignedPack.currency).to.equal('EUR')

    })

    it('fails on userId not found', () =>
        expect((async () => {
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })
            await getCustomerPacks('9790e3bd4bc8db3177862ed1', newUserCustomer._id.toString())
        })()).to.be.rejectedWith(NotFoundError, 'userId not found')
    )

    it('fails on non existing targetUserId', () =>
        expect((async () => {
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })
            await getCustomerPacks(newUserProvider._id.toString(), '9790e3bd44bebbc8db317786')
        })()).to.be.rejectedWith(NotFoundError, 'targetUserId not found')
    )

    it('fails on targetUserId have no asigned packs', () =>
        expect((async () => {
            const newUserProvider = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com' })
            const newUserCustomer = await User.create({ username: 'ristoCustomer', password: 'risto123', email: 'ristoc@risto.com' })

            const customerSearchByUsername = 'ristoCustomer'
            const customerSearchByEmail = 'ristoc@risto.com'

            await getCustomerPacks(newUserProvider._id.toString(), newUserCustomer._id.toString())
        })()).to.be.rejectedWith(NotFoundError, 'There are not packs registered for this customer')
    )


    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})
