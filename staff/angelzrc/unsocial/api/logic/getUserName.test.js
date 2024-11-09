import db from 'dat'
import getUserName from './getUserName.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            getUserName('672cd8e6fcf48026d6c1c18e', '672cd989fcf48026d6c1c190')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)