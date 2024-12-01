import 'dotenv/config'
import db from 'dat'

import getRandomCharacter from './getRandomCharacter.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const character = await getRandomCharacter('674b8e4aba7a4dfd6c16b8ea')

    console.log(character)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}