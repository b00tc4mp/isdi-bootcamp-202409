import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import { errors } from 'com'
import sendEmail from './sendEmail.js'

const { ValidationError } = errors

describe('sendEmail', () => {

    it('succeeds on valid inputs', async () => {
        const info = await sendEmail(
            'apps@nomadwebs.com',
            'This is the subject of the email',
            'Este es un correo de prueba, en texto plano',
            '<h1>Correo de Prueba</h1><p>Este es un correo de prueba desde Hourify by nomadwebs en html</p>',
        )
        expect(info).to.exist
    })

    it('fails on invalid email', async () => {
        await expect(sendEmail(
            'invalid',
            'This is the subject of the email',
            'Este es un correo de prueba, en texto plano',
            '<h1>Correo de Prueba</h1><p>Este es un correo de prueba desde Hourify by nomadwebs en html</p>',
        )).to.be.rejectedWith(ValidationError, 'invalid email')
    })

    it('fails on invalid text', async () => {
        await expect(sendEmail(
            'apps@nomadwebs.com',
            'This is the subject of the email',
            123,
            '<h1>Correo de Prueba</h1><p>Este es un correo de prueba desde Hourify by nomadwebs en html</p>',
        )).to.be.rejectedWith(ValidationError, 'invalid text text')
    })

    it('fails on invalid html', async () => {
        await expect(sendEmail(
            'apps@nomadwebs.com',
            'This is the subject of the email',
            'Este es un correo de prueba, en texto plano',
            1234,
        )).to.be.rejectedWith(ValidationError, 'invalid text html')
    })
})