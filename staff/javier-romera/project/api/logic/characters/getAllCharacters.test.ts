import 'dotenv/config'
import db from 'dat'

import getAllCharacters from './getAllCharacters.js'
import { TCharacter } from 'dat'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const characters: TCharacter[] = await getAllCharacters('675a08ffec407c3e85aff04c')

    console.log(characters)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}