import {validate} from '.helpers/index.js';

import {storage, uuid} from '../data/index.js';

const createPost = (userId, image, text) => {
    validate.id(userId, 'userID');
    validate.image(image);
    validate.text(text);

    const {users, posts} = storage;

    const found = users.some(({id}) => id === userId);

    if (!found) throw new Error ('user not found');

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author, userId,
        date: new Date,
        likes: [],
        comments: []
    };

    post.push(post)

    storage.posts = posts;
}

export default createPost;