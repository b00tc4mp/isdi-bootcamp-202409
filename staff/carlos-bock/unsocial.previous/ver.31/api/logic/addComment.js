import db from 'dat';
import {validate} from './helpers/index.js';
import {uuid} from '../data/index.js';

const addComment = (userId, postId, text) => {
    validate.id(userId, 'userId');
    validate.id(postId,'postId');
    validate.text(text);

    const newComment = db.getCollection('posts');

    return posts.updateOne( // check this line, where inserted, 2nd attempt
        {id: postId},
        { 
            $push: {
                comments: {
                    id: uuid(),
                    author: userId,
                    text,
                    date: new Date().toISOString()
                }
            }
    })
        .then(_=> {})
        .catch(_=> {
            if (error.code === 11000) throw new Error('comment already exists') // check error code
            else console.log(error); // remove
        })
};

export default addComment;