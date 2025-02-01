import 'dotenv/config'
import db, { User } from 'dat'
import updateCenterInfo from './updateCenterInfo.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    // Create user to update
    const user = await User.create({
        name: 'Tossa Divers',
        email: 'tossadivers@test.com',
        password: '123123123',
        role: 'center',
        address: 'Avenida del Mar, 1',
        country: 'Spain',
        city: 'Tortosa',
        postcode: '17320',
        telephone: '972123456',
    })

    // Valid update test
    try {
        const data = { name: 'Tossa Super Divers', city: 'Tossa de Mar', telephone: '9726543210' }
        const updatedUser = await updateCenterInfo(user._id.toString(), data)
        console.log("Updated User:", updatedUser)
    } catch (error) {
        console.error("Unexpected Error (Valid Update):", error)
    }

    // Invalid userId (non-existing user)
    try {
        const data = { name: 'Madrid Divers', city: 'Madrid' }
        await updateCenterInfo("605c72ef8cfa4a3d60e3a53", data)
        console.error("Expected NotFoundError, but got success!")
    } catch (error) {
        console.log("Expected NotFoundError:", error.message)
    }

    // Validation failure (invalid email)
    try {
        const data = { email: "invalid@email" }
        await updateCenterInfo(user._id.toString(), data)
        console.error("Expected SystemError, but got success!")
    } catch (error) {
        console.log("Expected SystemError:", error.message)
    }

    // Validation failure (empty name)
    try {
        const data = { name: "" }
        await updateCenterInfo(user._id.toString(), data)
        console.error("Expected SystemError, field cannot be empty")
    } catch (error) {
        console.log("Expected SystemError:", error.message)
    }

} catch (error) {
    console.error("Unexpected test runner error:", error)
} finally {
    await db.disconnect()
    console.log("Disconnected from test database.")
}