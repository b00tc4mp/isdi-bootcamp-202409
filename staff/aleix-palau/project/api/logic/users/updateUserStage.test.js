import 'dotenv/config'
import db from 'dat'
import updateUserStage from './updateUserStage.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const stage = await updateUserStage('6755e0278b1c668012bbdba6', 'gender')

    console.log(stage)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}