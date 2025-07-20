import 'dotenv/config'
import db from 'dat'
import updatePack from './updatePack.js'

await db.connect(process.env.MONGO_URL)

const userId = '6780f8fe58255d20563d6a5f'
const packId = '6780fa7958255d20563d6a97'

const description = 'Pack updated from test javascript 6'
const remainingQuantity = undefined //'01:30:00' //undefined to not add activity
const expiryDate = new Date('2030-01-31')
const status = 'Active'


try {
    const pack = await updatePack(userId, packId, description, remainingQuantity, expiryDate, status)
    console.log(pack)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}