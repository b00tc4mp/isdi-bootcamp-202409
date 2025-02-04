import 'dotenv/config'
import db from 'dat'
import updateProfile from "./updateProfile.js"

await db.connect(process.env.MONGO_URL_TEST)

const data = {
    name: 'John',
    email: 'nemo2@gmail.com'
}

try{
    await updateProfile('67a0b64031c08c5684742d30','67a0b64031c08c5684742d30', data)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}