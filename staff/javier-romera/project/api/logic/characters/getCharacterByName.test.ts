import 'dotenv/config'
import db from 'dat'

import getCharacterByName from './getCharacterByName.js'
import { TCharacter } from 'dat'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const character: TCharacter = await getCharacterByName('674b8e4aba7a4dfd6c16b8ea', 'Sogeking')

    console.log(character)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}