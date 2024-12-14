import 'dotenv/config'
import db from 'dat'
import updateUser from './updateUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await updateUser('6755e0278b1c668012bbdba6', {
        name: 'Aleix',
        dateOfBirth: '1991-08-19'
    })

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}