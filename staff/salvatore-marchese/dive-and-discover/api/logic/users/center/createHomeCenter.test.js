import 'dotenv/config'
import db from 'dat'
import createHomeCenter from './createHomeCenter.js'

const data = {
    name: "TestDiveCenter",
    email: "test@divecenter.com",
    password: "123123123",
    address: "seafront avenue 1",
    country: "Spain",
    city: "Barcelona",
    postcode: "08002"
}

async function createHomeCenter() {
    try {
        await db.connect(process.env.MONGO_URL_TEST)

        const result = await createHomeCenter(data)
        console.log(result)

        const existingUser = await db.models.User.findOne({ email: data.email })
        if (existingUser) {
            console.log("User found:", existingUser)
        } else {
            console.error("User creation failed.")
        }
    } catch (error) {
        console.error(error)
    } finally {
        await db.disconnect()
    }
}

createHomeCenter()