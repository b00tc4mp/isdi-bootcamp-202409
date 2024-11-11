import db from 'dat'

import createPost from './createPost.js';
db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            createPost("672cd989fcf48026d6c1c190", "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", "This is a new post!")
                .then(() => console.log('post created'))
                .catch(console.error)

        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)