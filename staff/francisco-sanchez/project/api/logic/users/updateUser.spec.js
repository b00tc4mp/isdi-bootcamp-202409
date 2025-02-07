import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

import updateUser from './updateUser.js'

const { NotFoundError, ValidationError, OwnershipError } = errors

describe('update User', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => User.deleteMany())


    it('succeeds update user details', async () => {
        const newUser = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto', surname1: 'Valiente' })

        expect(newUser.username).to.equal('ristoProvider')
        expect(newUser.email).to.equal('ristop@risto.com')
        expect(newUser.plan).to.equal('free')
        expect(newUser.role).to.equal('standard')
        expect(newUser.creationStatus).to.equal('true')

        const username = 'risto'
        const email = 'evolucionayvive@gmail.com'
        const name = 'risto'
        const surname1 = 'New Surname 1'
        const surname2 = 'New Surname 2'
        const dni = '47822716N'
        const biography = 'new text for the user bio'
        const country = 'Spain'
        const province = 'Tarragona'
        const city = 'Alcanar'
        const postalCode = '43530'
        const address1 = 'aspirantat sant jordi'
        const address2 = ''
        const number = '14'
        const flat = '2'
        const legalName = 'new legal name s.l'
        const website = 'https://thegreatwebsite.com'

        const userUpdated = await updateUser(newUser._id.toString(), newUser._id.toString(),
            username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website)

        expect(userUpdated.username).to.equal('risto')
        expect(userUpdated.email).to.equal('evolucionayvive@gmail.com')
        expect(userUpdated.name).to.equal('risto')
        expect(userUpdated.surname1).to.equal('New Surname 1')
        expect(userUpdated.surname2).to.equal('New Surname 2')
        expect(userUpdated.dni).to.equal('47822716N')
        expect(userUpdated.biography).to.equal('new text for the user bio')
        expect(userUpdated.country).to.equal('Spain')
        expect(userUpdated.province).to.equal('Tarragona')
        expect(userUpdated.city).to.equal('Alcanar')
        expect(userUpdated.postalCode).to.equal('43530')
        expect(userUpdated.address1).to.equal('aspirantat sant jordi')
        expect(userUpdated.address2).to.equal('') // Asume que está vacío como en tu valor
        expect(userUpdated.number).to.equal('14')
        expect(userUpdated.flat).to.equal(2)
        expect(userUpdated.legalName).to.equal('new legal name s.l')
        expect(userUpdated.website).to.equal('https://thegreatwebsite.com')
    })


    it('fails on invalid userId', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto', surname1: 'Valiente' })

            const username = 'risto'
            const email = 'evolucionayvive@gmail.com'
            const name = 'risto'
            const surname1 = 'New Surname 1'
            const surname2 = 'New Surname 2'
            const dni = '47822716N'
            const biography = 'new text for the user bio'
            const country = 'Spain'
            const province = 'Tarragona'
            const city = 'Alcanar'
            const postalCode = '43530'
            const address1 = 'aspirantat sant jordi'
            const address2 = ''
            const number = '14'
            const flat = '2'
            const legalName = 'new legal name s.l'
            const website = 'https://thegreatwebsite.com'

            await updateUser('679d5aafcbfc45ebd33502fe', newUser._id.toString(),
                username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website) // Non-existent user ID
        })()).to.be.rejectedWith(NotFoundError, 'User not found')
    )


    it('fails on ownership error', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto', surname1: 'Valiente' })
            const newUser2 = await User.create({ username: 'ristoProvider3', password: 'risto123', email: 'ristfop@risto.com', name: 'Risffdto', surname1: 'Valienter' })

            const username = 'risto'
            const email = 'evolucionayvive@gmail.com'
            const name = 'risto'
            const surname1 = 'New Surname 1'
            const surname2 = 'New Surname 2'
            const dni = '47822716N'
            const biography = 'new text for the user bio'
            const country = 'Spain'
            const province = 'Tarragona'
            const city = 'Alcanar'
            const postalCode = '43530'
            const address1 = 'aspirantat sant jordi'
            const address2 = ''
            const number = '14'
            const flat = '2'
            const legalName = 'new legal name s.l'
            const website = 'https://thegreatwebsite.com'

            await updateUser(newUser._id.toString(), newUser2._id.toString(),
                username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website) // Non-existent user ID
        })()).to.be.rejectedWith(OwnershipError, 'You cannot update the profile from other user')
    )


    it('fails on invalid userId', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto', surname1: 'Valiente' })

            const username = 'risto'
            const email = 'evolucionayvive@gmail.com'
            const name = 'risto'
            const surname1 = 'New Surname 1'
            const surname2 = 'New Surname 2'
            const dni = '47822716N'
            const biography = 'new text for the user bio'
            const country = 'Spain'
            const province = 'Tarragona'
            const city = 'Alcanar'
            const postalCode = '43530'
            const address1 = 'aspirantat sant jordi'
            const address2 = ''
            const number = '14'
            const flat = '2'
            const legalName = 'new legal name s.l'
            const website = 'https://thegreatwebsite.com'

            await updateUser(123456, 123456,
                username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website) // Non-existent user ID
        })()).to.be.rejectedWith(ValidationError, 'invalid userId')
    )


    it('fails on invalid email', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto', surname1: 'Valiente' })

            const username = 'risto'
            const email = 'evolucionayv+`+`1232dfds_:;_:MZ>ZCCVive@gmailcom'
            const name = 'risto'
            const surname1 = 'New Surname 1'
            const surname2 = 'New Surname 2'
            const dni = '47822716N'
            const biography = 'new text for the user bio'
            const country = 'Spain'
            const province = 'Tarragona'
            const city = 'Alcanar'
            const postalCode = '43530'
            const address1 = 'aspirantat sant jordi'
            const address2 = ''
            const number = '14'
            const flat = '2'
            const legalName = 'new legal name s.l'
            const website = 'https://thegreatwebsite.com'

            await updateUser(newUser._id.toString(), newUser._id.toString(),
                username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website) // Non-existent user ID
        })()).to.be.rejectedWith(ValidationError, 'invalid email')
    )



    it('fails on invalid name', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto', surname1: 'Valiente' })

            const username = 'lombardia33'
            const email = 'evolucionayvive@gmail.com'
            const name = 'R'
            const surname1 = 'New Surname 1'
            const surname2 = 'New Surname 2'
            const dni = '47822716N'
            const biography = 'new text for the user bio'
            const country = 'Spain'
            const province = 'Tarragona'
            const city = 'Alcanar'
            const postalCode = '43530'
            const address1 = 'aspirantat sant jordi'
            const address2 = ''
            const number = '14'
            const flat = '2'
            const legalName = 'new legal name s.l'
            const website = 'https://thegreatwebsite.com'

            await updateUser(newUser._id.toString(), newUser._id.toString(),
                username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website) // Non-existent user ID
        })()).to.be.rejectedWith(ValidationError, 'invalid name')
    )


    it('fails on invalid to short userName', () =>
        expect((async () => {
            const newUser = await User.create({ username: 'ristoProvider', password: 'risto123', email: 'ristop@risto.com', name: 'Risto', surname1: 'Valiente' })

            const username = 'L'
            const email = 'evolucionayvive@gmail.com'
            const name = 'Risto'
            const surname1 = 'New Surname 1'
            const surname2 = 'New Surname 2'
            const dni = '47822716N'
            const biography = 'new text for the user bio'
            const country = 'Spain'
            const province = 'Tarragona'
            const city = 'Alcanar'
            const postalCode = '43530'
            const address1 = 'aspirantat sant jordi'
            const address2 = ''
            const number = '14'
            const flat = '2'
            const legalName = 'new legal name s.l'
            const website = 'https://thegreatwebsite.com'

            await updateUser(newUser._id.toString(), newUser._id.toString(),
                username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website) // Non-existent user ID
        })()).to.be.rejectedWith(ValidationError, 'Username should be between 4 to 25 chars')
    )


    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})