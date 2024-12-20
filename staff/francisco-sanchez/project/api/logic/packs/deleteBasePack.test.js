import 'dotenv/config'
import db from 'dat'
import deleteBasePack from './deleteBasePack.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            const userId = '675036c010473f3d809e5359'
            const basePackId = '675d6c83d45baf76f262c8d6'

            return deleteBasePack(userId, basePackId)
                .then(console.log)
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect)