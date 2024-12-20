import 'dotenv/config'
import db from 'dat'
import updateNote from './updateNote.js'

await db.connect(process.env.MONGO_URL_TEST)
try {
    const note = await updateNote('6756c70b9727715b72a5daa5', 'intentando editar')
    console.log(note)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}