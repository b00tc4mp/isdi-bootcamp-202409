import 'dotenv/config'
import db from 'dat'
import deleteBasePack from './deleteBasePack.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            const userId = '67a1d44e01572f37bc099310'
            const basePackId = '67a1f01543a17dee99bfca3d'

            return deleteBasePack(userId, basePackId)
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect)