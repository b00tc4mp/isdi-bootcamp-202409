import 'dotenv/config'
import db from 'dat'

import getRandomCharacter from './getRandomCharacter.js'
import { TCharacter } from 'dat'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const character: TCharacter = await getRandomCharacter('675820d28f825fc26bf289c3')

    console.log(character)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}