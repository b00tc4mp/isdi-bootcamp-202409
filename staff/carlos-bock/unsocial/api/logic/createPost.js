import db from 'dat';
import {validate} from 'com';
import {uuid} from '../data/index.js';

const createPost = (userId, image, text) => {
    validate.id(userId, 'userID');
    validate.image(image);
    validate.text(text);

    return db.posts.insertOne({
        id: uuid(),
        image: image,
        text: text,
        author: userId, //check logic
        date: new Date,
        like:[],
        comments: []
    })
        .then(_=> {})
        .catch(error => {
            if (error.code === 11000) throw new Error('post already exists'); //check error code

            throw new Error(error.message);
        });
}
export default createPost;