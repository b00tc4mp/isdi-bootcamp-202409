import 'dotenv/config'
import db from 'dat'

import getCharactersByArc from './getCharactersByArc.js'
import { TCharacter } from 'dat'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const characters: TCharacter[] | undefined = await getCharactersByArc('675820d28f825fc26bf289c3', 'Romance-Dawn')

    console.log(characters)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}