import 'dotenv/config'
import db from 'dat'
import removeComment from "./removeComment.js";

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return removeComment('672cd989fcf48026d6c1c190', '673227cfd6ac1ab481efb86d', '6736087ee7582a15fd307187')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())

