import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL)

//TEST: 
const name = 'Gandalf'
const username = 'greyGandalf'
const password = 'youshallnotpass'
const passwordRepeat = 'youshallnotpass'
const email = 'gandalf@themiddleearth.com'
const plan = 'free'
const creationStatus = 'true'


try {
    const result = await registerUser(name, username, password, passwordRepeat, email, plan, creationStatus)

    console.log(result)

} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}