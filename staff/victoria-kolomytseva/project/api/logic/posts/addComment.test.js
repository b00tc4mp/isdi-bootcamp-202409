import 'dotenv/config'
import db from 'dat'
import addComment from './addComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addComment('675c598e2c6a91af19441da8', '675c598f2c6a91af19441db4', "I'm, glad you have found your pet")
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())