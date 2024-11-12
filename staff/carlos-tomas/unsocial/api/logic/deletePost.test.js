import db from 'dat'

import deletePost from './deletePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            console.log(deletePost('672e22eada8aaa7e1073c59b', '672e3dea045ad56a34c6140d'))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(console.error)

