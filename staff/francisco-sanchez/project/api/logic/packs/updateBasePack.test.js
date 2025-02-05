import 'dotenv/config'
import db from 'dat'
import updateBasePack from './updateBasePack.js'

await db.connect(process.env.MONGO_URL)

const userId = '67a1d44e01572f37bc099310'
const basePackId = '67a1d4c001572f37bc09932c'

const packName = 'Single hour updated 2'
const description = 'Single hour service updated 2'
const quantity = 10
const unit = 'hours'
const expiringTime = '10'
const price = 5000000
const currency = 'EUR'

try {
    await updateBasePack(userId, basePackId,
        packName, description, quantity, unit, expiringTime, price, currency)
    console.log('OK')
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}