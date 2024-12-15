import 'dotenv/config'
import db from 'dat'
import updateBasePack from './updateBasePack.js'

await db.connect(process.env.MONGO_URL)

const userId = '675b619e599ea5061e869e9c'
const basePackId = '675e29f34f531a5c3a25b5da'

const packName = 'Single hour updated 2'
const description = 'Single hour service updated 2'
const quantity = 100
const unit = 'units'
const expiringTime = 12
const price = 50
const currency = 'EUR'

try {
    const note = await updateBasePack(userId, basePackId,
        packName, description, quantity, unit, expiringTime, price, currency)
    console.log(note)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}