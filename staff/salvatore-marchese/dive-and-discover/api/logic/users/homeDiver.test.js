import 'dotenv/config'
import db from 'dat'
import homeDiver from './homeDiver.js'

const data = {
    name: "John",
    email: "nemo2@gmail.com",
    password: "123123123"
}

async function createHomeDiver() {
    try {
        await db.connect(process.env.MONGO_URL_TEST)

        const result = await homeDiver(data)
        console.log(result)

        const existingUser = await db.models.User.findOne({ email: data.email })
        if (existingUser) {
            console.log("USer found:", existingUser)
        } else {
            console.error("User creation failed.")
        }
    } catch (error) {
        console.error(error)
    } finally {
        await db.disconnect()
    }
}

createHomeDiver()