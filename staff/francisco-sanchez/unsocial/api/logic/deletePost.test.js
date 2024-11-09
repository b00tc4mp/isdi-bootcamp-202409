//import getUserName from './getUserName.js'
import db from 'dat'
import deletePost from "./deletePost.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        console.log('database connected')

        try {
            //En principio aquí no haría falta ningún console log 
            /**
             * userId / postId
             */
            deletePost('672e2707de7dde80ec9233c6', "672f7af04ee4e332926502ac")
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error('Error in test: ', error)
        }
    })
    .catch(console.error);