import 'dotenv/config'
import db from "dat";
import removeComments from "./removeComments.js";

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            removeComments('67321cb077f45c936bc2b2a0', '6734e0ccdca0dc9254650fbc', '6735d70303f276230ca843ec')
                .then(() => console.log('Comment deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)