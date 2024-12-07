import 'dotenv/config'
import db from 'dat'

import getAllCharacters from './getAllCharacters.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const characters = await getAllCharacters('67540f707dc9ab4a54ae8909')

    console.log(characters.length)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}