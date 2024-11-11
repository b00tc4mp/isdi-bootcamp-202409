import getPosts from './getPosts.js'

import db from 'dat'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return getPosts('672e3058090fcae7fd450528')
                .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, comments }) => ({ id, author, image, text, date, liked, likes, comments }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())