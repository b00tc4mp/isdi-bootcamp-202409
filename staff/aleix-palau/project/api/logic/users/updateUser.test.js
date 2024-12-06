import 'dotenv/config'
import db from 'dat'
import updateUser from './updateUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await updateUser('674f52139e10627bd820a562', {
        name: 'Ruquet',
        dateOfBirth: '1996-10-12'
    })

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}