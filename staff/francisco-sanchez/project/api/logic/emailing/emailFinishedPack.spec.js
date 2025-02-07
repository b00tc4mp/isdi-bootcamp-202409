import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import { errors } from 'com'
import emailFinishedPack from './emailFinishedPack.js'

const { ValidationError } = errors

describe('emailFinishedPack', () => {

    it('succeeds on valid inputs', async () => {
        // Llamada con parámetros válidos
        const info = await emailFinishedPack(
            'apps@nomadwebs.com',
            'Pepe',
            'My Pack',
            new Date()
        )

        // Tu lógica real de envío de email devolverá algo (p.ej. info del transporter)
        // Aquí solo verificamos que retorne algo (o no falle).
        expect(info).to.exist
    })

    it('fails on invalid email', async () => {
        // Llamada con un email inválido
        await expect(emailFinishedPack(
            'INVALID',
            'Pepe',
            'My Pack',
            new Date()
        )).to.be.rejectedWith(ValidationError, 'invalid email')
    })

})