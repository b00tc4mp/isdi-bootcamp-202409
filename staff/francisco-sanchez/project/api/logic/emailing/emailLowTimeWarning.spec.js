import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import { errors } from 'com'
import emailLowTimeWarning from './emailLowTimeWarning.js'

const { ValidationError } = errors

describe('emailLowTimeWarning', () => {

    it('succeeds on valid inputs', async () => {
        const info = await emailLowTimeWarning(
            'apps@nomadwebs.com',
            'Pepe',
            'Description of the pack',
            'hours',
            '1.34534',
            new Date()
        )
        expect(info).to.exist
    })

    it('fails on invalid email', async () => {
        await expect(emailLowTimeWarning(
            'INVALID',
            'Pepe',
            'Description of the pack',
            'hours',
            '1.34534',
            new Date()
        )).to.be.rejectedWith(ValidationError, 'invalid email')
    })

    it('fails on invalid unit', async () => {
        await expect(emailLowTimeWarning(
            'valid@test.com',
            'Pepe',
            'Description of the pack',
            123,
            '1.34534',
        )).to.be.rejectedWith(ValidationError)
    })

    it('fails on invalid string unit', async () => {
        await expect(emailLowTimeWarning(
            'valid@test.com',
            'Pepe',
            'Description of the pack',
            'kilograms',
            '1.987654',
        )).to.be.rejectedWith(ValidationError, 'units shoud be "hours" or "units"')
    })


})