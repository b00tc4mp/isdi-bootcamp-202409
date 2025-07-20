import 'dotenv/config'
import db from 'dat'

import getUserPets from './getUserPets.js'

await db.connect(process.env.MONGO_URL_TEST)

try {

    const pets = await getUserPets('678d17c2757eabc026055fbf')

    console.log(pets)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}

