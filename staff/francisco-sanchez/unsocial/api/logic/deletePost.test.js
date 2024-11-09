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
            deletePost('672e2ff11dbad3a5583531bf', "672e4590ca1d6caf6e538d70")
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error('Error in test: ', error)
        }
    })
    .catch(console.error);