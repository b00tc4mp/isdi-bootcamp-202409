import db from "dat";

import removeComments from "./removeComments.js";

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            removeComments('67321cb077f45c936bc2b2a0', '6734e0ccdca0dc9254650fbc', '6734ed54f67832a75ef4d586')
                .then(() => console.log('Comment deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)