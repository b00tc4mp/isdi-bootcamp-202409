import db from "dat";

import removeComments from "./removeComments.js";

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            removeComments('672ce6432d591ce2aef50c5b', '672cea63a14bd241a52c11f9', '672f596fff068498e90c693f')
                .then(() => console.log('Comment deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)