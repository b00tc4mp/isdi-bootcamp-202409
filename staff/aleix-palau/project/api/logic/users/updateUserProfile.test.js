import 'dotenv/config'
import db from 'dat'
import updateUserProfile from './updateUserProfile.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await updateUserProfile('6775c9a41ad72c1a72b70d89', {
        name: 'Aleix',
        dateOfBirth: '1991-08-19',
        bio: 'Hei!',
        location: 'Lleida'
    })

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}