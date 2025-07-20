import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import { errors } from 'com'
import emailRegisterWelcome from './emailRegisterWelcome.js'

const { ValidationError } = errors

describe('emailRegisterWelcome', () => {

    it('succeeds on valid inputs', async () => {
        const info = await emailRegisterWelcome(
            'apps@nomadwebs.com',
            'Pepe',
        )
        expect(info).to.exist
    })

    /* it('fails on invalid email', async () => {
        await expect(emailRegisterWelcome(
            'INVALID',
            'Pepe',
            new Date()
        )).to.be.rejectedWith(ValidationError, 'invalid email')
    }) */
})