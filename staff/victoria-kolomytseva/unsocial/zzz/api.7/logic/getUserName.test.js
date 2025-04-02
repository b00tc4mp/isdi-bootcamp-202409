import db from 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getUserName('673102adab634f097e0719f9', '6731064da072cbd2088763d9')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }

    })
    .catch(console.error)
    .finally(() => db.disconnect())