import 'dotenv/config'
import db from 'dat'

import getRankingScores from './getRankingScores.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const scores = await getRankingScores('675d63cacb9b0a0360761c21', 20)

    console.log(scores)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}