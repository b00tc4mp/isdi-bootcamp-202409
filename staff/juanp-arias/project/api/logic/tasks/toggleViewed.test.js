import 'dotenv/config'
import db from 'dat'
import toggleViewed from './toggleViewed.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return toggleViewed('6762eb57f654002a1de05231', '6762f591088eebfdc2ec8791')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())