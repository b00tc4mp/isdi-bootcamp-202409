import 'dotenv/config'
import db, { OpeningHours, User } from 'dat'
import updateCenterInfo from './updateCenterInfo.js'

await db.connect(process.env.MONGO_URL_TEST)

const data = {
    name: 'La Mama diver',
    email: 'lamama@delamama.com',
    telephone: '899345543',
    openingHours: {
        day: 1,
        openTime: "10:30-14:00",
        closeTime: "17:00"
    }
}

try {
    await updateCenterInfo('67a0fe1b85b19dac9dd8af2b', '67a0fe1b85b19dac9dd8af2b', data)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}
