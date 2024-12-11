import 'dotenv/config'
import db from 'dat'

import getAllCharacters from './getAllCharacters.js'
import { TCharacter } from 'dat'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const characters: TCharacter[] = await getAllCharacters('67540f707dc9ab4a54ae8909')

    console.log(characters.length)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}