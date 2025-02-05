import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError } = errors

import deleteBasePack from './deleteBasePack.js'
import createBasePack from './createBasePack.js'

describe('deleteBasePack', () => {
    let newUser; // Declaramos una variable global
    let newBasePack;

    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(async () => {
        // Limpia las colecciones y crea un usuario nuevo para cada test
        await Promise.all([User.deleteMany(), BasePack.deleteMany()])

        // Crea un nuevo usuario antes de cada test
        newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
    })


    it('succeeds on new basePack', async () => {
        newBasePack = await createBasePack(newUser._id.toString(), 'pack de 5h', 'Descripción del pack', 5, 'hours', '12', 1000, 'EUR')

        // Verifica que el BasePack se haya creado correctamente
        const basePack = await BasePack.findOne({ user: newUser._id })
        expect(basePack).to.exist
        expect(basePack.packName).to.equal('pack de 5h')
        expect(basePack.description).to.equal('Descripción del pack')
        expect(basePack.quantity).to.equal(5)
        expect(basePack.unit).to.equal('hours')
        expect(basePack.expiringTime).to.equal(12)
        expect(basePack.price).to.equal(1000)
        expect(basePack.currency).to.equal('EUR')

        // Elimina el BasePack
        await deleteBasePack(newUser._id.toString(), basePack._id.toString())
    })

    it('fails on non existing user', () =>
        expect((async () => {
            // Intenta eliminar un BasePack con un userId inexistente
            await deleteBasePack('9790e3bd44bebbc8db317786', '9790e3bd44bebbc8db117086')
        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non existing basePack', () =>
        expect((async () => {

            // Intenta eliminar un BasePack que no existe
            await deleteBasePack(newUser._id.toString(), '9790e3bd44bebbc8db117086')
        })()).to.be.rejectedWith(NotFoundError, 'basepack not found')
    )

    it('fails on non basePack ownership', () =>
        expect((async () => {
            const newUser2 = await User.create({ username: 'Rista', password: 'risto123', email: 'rista@rista.com' });

            // Crea un BasePack asociado al primer usuario
            const newBasePack = await BasePack.create({
                user: newUser._id, // Asociado al primer usuario
                packName: 'pack de 5h',
                description: 'Descripción del pack',
                quantity: 5,
                unit: 'hours',
                expiringTime: 12,
                price: 1000,
                currency: 'EUR'
            });

            // Intenta eliminar el BasePack con un usuario diferente
            await deleteBasePack(newUser2._id.toString(), newBasePack._id.toString());
        })()).to.be.rejectedWith(OwnershipError, 'Your user is not the owner of this pack')
    );

    after(() => db.disconnect())
})