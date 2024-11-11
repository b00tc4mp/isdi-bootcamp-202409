import db from 'dat'
import getUserName from './getUserName.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return getUserName('672e1ed8d36186d1eaf683b1', '672e1ed8d36186d1eaf683b1')
                .then(console.log) //...
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())