import db from 'dat'

import registerUser from './registerUser.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            registerUser('Coco Drilo', 'coco@drilo.com', 'cocodrilo', '123123123', '123123123')
                .then(() => console.log('user registered'))
                .catch(console.error)

            // registerUser('Coco Drilo', 'coco@drilo.com', 'cocodrilo', '123123123', '123123123')
            //     .then(() => console.log('user registered'))
            //     .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)