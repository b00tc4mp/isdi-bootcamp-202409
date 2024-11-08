import db from 'dat'
import registerUser from './registerUser.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            registerUser('Juan Pablo', 'juan@pablo.com', 'juanpablo', '123456', '123456')
                .then(() => console.log('user registered'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
