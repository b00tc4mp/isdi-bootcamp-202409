import {validate} from './helpers/index';
import {storage, uuid} from '../data/index.js';

const addComment = (userId, postId, text) => {
    validate.id(userId, 'userId');
    validate.id(postId,'postId');
    validate.text(text);

    const { users, posts} = storage;

    const found = users.some(({id}) => id === userId);

    if (!found) throw new Error('user not found');

    const post = posts.find(({id}) => id === postId);

    if (!post) throw new Error('post not found');

    const { comments } = posts;

    comments.push({
        id: uuid(),
        author: userId,
        text,
        date: new Date().toISOString()
    });

    storage.posts = posts;   
};

export default addComment;