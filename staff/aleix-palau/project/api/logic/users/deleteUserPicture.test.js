import 'dotenv/config'
import db from 'dat'
import deleteUserPicture from './deleteUserPicture.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const pictureToRemove = 'data:image/jpeg;base64,picture2'

    const result = await deleteUserPicture('68429f2ff01ff02aab70f0d4', pictureToRemove)

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}