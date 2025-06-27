import 'dotenv/config'
import db from 'dat'
import authenticateUser from './authenticateUser.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            authenticateUser('cocodrilo', '123123123')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }

    })
    .catch(console.error)