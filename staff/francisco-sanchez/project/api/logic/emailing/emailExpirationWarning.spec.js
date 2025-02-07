import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import { errors } from 'com'
import emailExpirationWarning from './emailExpirationWarning.js'

const { ValidationError } = errors

describe('emailExpirationWarning', () => {

    it('succeeds on valid inputs', async () => {
        // Llamada con parámetros válidos
        const info = await emailExpirationWarning(
            'apps@nomadwebs.com',
            'Pepe',
            'My Pack',
            new Date()
        )

        expect(info).to.exist
    })

    it('fails on invalid email', async () => {
        // Llamada con un email inválido
        await expect(emailExpirationWarning(
            'INVALID',
            'Pepe',
            'My Pack',
            new Date()
        )).to.be.rejectedWith(ValidationError, 'invalid email')
    })

    it('fails on invalid date', async () => {
        // Llamada con un valor no Date
        await expect(emailExpirationWarning(
            'valid@test.com',
            'Pepe',
            'My Pack',
            'not-a-date'
        )).to.be.rejectedWith(ValidationError, 'Invalid date: the value must be a valid Date object.')
    })
})