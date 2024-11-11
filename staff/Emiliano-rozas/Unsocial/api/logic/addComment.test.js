import db from 'dat'

import addComment from './addComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            addComment('672ce6432d591ce2aef50c5b', '672cea63a14bd241a52c11f9', 'la concha de tu madre carlit0')
                .then(() => console.log('Comment added'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)