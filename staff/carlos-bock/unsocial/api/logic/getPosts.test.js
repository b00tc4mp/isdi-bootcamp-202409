import db from 'dat';
import getPosts from './getPosts.js';

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return getPosts('67322777dc618687d7f2a664') //cambiar #
                .then(posts => console.log(post.map(({id, author, image, text, date, likes,comments}))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
    

    