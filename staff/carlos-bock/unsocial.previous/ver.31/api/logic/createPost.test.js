import db from 'dat';
import createPost from './createPost.js';

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return createPost('67322777dc618687d7f2a664', 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg', 'likes por fa')
                .then(console.log) //undefined
                .catch(console.error)
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)    
    //.finally(() => db.disconnect());

