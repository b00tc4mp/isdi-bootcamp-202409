import 'dotenv/config'
import db from 'dat'
import getPlayersState from './getPlayersState.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getPlayersState('67406baf26cfa1979092a912')
                .then(console.log) // ...
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())