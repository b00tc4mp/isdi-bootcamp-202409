import 'dotenv/config'
import db from 'dat'
import deletePost from './deletePost.js';

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return deletePost("672cd989fcf48026d6c1c190", "6736099d48bb047dd2731151")
                .then(console.log)
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
