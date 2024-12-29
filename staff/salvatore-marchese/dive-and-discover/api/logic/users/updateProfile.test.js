import 'dotenv/config'
import db from 'dat'
import updateProfile from "./updateProfile.js"

await db.connect(process.env.MONGO_URL_TEST)

const data = {
    name: 'John',
    email: 'nemo2@gmail.com'
}

try{
    const result = await updateProfile('67503f6a10182798c1418773', data)
    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}