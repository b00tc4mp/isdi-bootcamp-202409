import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { BasePack, User } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError } = errors

import getBasePackDetails from './getBasePackDetails.js'

describe('getBasePackDetails', () => {
    let newUser;
    let newBasePack;

    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(async () => {
        // Limpia las colecciones antes de cada test
        await Promise.all([User.deleteMany(), BasePack.deleteMany()])

        // Crea un usuario y un BasePack para los tests
        newUser = await User.create({ username: 'Risto', password: 'risto123', email: 'risto@risto.com' })
        newBasePack = await BasePack.create({
            user: newUser._id.toString(),
            packName: 'pack de 5h',
            description: 'Descripción del pack',
            quantity: 5,
            unit: 'hours',
            expiringTime: 12,
            price: 1000,
            currency: 'EUR'
        })
    })

    it('succeeds on valid user and basePack', async () => {
        const result = await getBasePackDetails(newUser._id.toString(), newBasePack._id.toString())

        expect(result).to.exist
        expect(result.packName).to.equal('pack de 5h')
        expect(result.description).to.equal('Descripción del pack')
        expect(result.quantity).to.equal(5)
        expect(result.unit).to.equal('hours')
        expect(result.expiringTime).to.equal(12)
        expect(result.price).to.equal(1000)
        expect(result.currency).to.equal('EUR')
        expect(result.user.toString()).to.equal(newUser._id.toString())
    })

    it('fails on non existing user', () =>
        expect((async () => {
            await getBasePackDetails('9790e3bd44bebbc8db317786', newBasePack._id.toString())
        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non existing basePack', () =>
        expect((async () => {
            await getBasePackDetails(newUser._id.toString(), '9790e3bd44bebbc8db117086')
        })()).to.be.rejectedWith(NotFoundError, 'The pack does not exist')
    )

    it('fails on basePack not owned by user', () =>
        expect((async () => {
            const otherUser = await User.create({ username: 'Rista', password: 'password123', email: 'rista@rista.com' })
            await getBasePackDetails(otherUser._id.toString(), newBasePack._id.toString())
        })()).to.be.rejectedWith(OwnershipError, 'Your user is not the owner of this pack')
    )

    after(() => db.disconnect())
})
