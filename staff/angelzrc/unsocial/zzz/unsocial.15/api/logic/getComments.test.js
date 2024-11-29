import db from 'dat'
import getComments from './getComments.js'

db.connect('mongodb://localhost/unsocial')
    .then(() => {
        try {
            return getComments('673297bdc58730da7ad98132', '67329982470b2f23bee21dbc')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
/*   .finally(() => db.disconnect()) */