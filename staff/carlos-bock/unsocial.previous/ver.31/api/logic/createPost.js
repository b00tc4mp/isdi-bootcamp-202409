import db from 'dat';
import {validate} from 'com';

const {ObjectId} =db;

    const createPost = (userId, image, text) => {
        validate.id(userId, 'userID');
        validate.image(image);
        validate.text(text);

        const userObjectId = ObjectId.createFromHexString(userId);

        return db.users.findOne({_id: userObjectId})
            .catch(error => { throw new Error (error.message)})
            .then(user => {
                if(!user) throw new Error('user not found')

                    return db.posts.insertOne({author: userObjectId, image, text, date: new Date, likes: [], comments: []})
                        .catch(error => {throw new Error(error.message)});
            })
            .then(_=> {});
    };
    export default createPost;