import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import { errors } from 'com'
import emailNearExpiryTime from './emailNearExpiryTime.js'

const { ValidationError } = errors

describe('emailNearExpiryTime', () => {

    it('succeeds on valid inputs', async () => {
        const info = await emailNearExpiryTime(
            'apps@nomadwebs.com',
            'Pepe',
            'Description of the pack',
            new Date()
        )
        expect(info).to.exist
    })

    it('fails on invalid email', async () => {
        await expect(emailNearExpiryTime(
            'INVALID',
            'Pepe',
            'Description of the pack',
            new Date()
        )).to.be.rejectedWith(ValidationError, 'invalid email')
    })

    it('fails on invalid date', async () => {
        await expect(emailNearExpiryTime(
            'apps@nomadwebs.com',
            'Pepe',
            'Description of the pack',
            'invalid-date'
        )).to.be.rejectedWith(ValidationError, 'Invalid date: the value must be a valid Date object.')
    })
})