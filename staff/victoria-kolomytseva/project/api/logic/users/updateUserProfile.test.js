import 'dotenv/config'
import db from 'dat'
import updateUserProfile from './updateUserProfile.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await updateUserProfile('6762dd8e66e99872db6a5b84', 'María', 'López', '684734576', 'Barcelona', '08340')

    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()

}
