import {validate} from './helpers/index.js';
import {storage} from '../data/index.js';

const toggleLikePost = (userId, postId) => {
    validate.id(userId, 'userId');
    validate.id(postId, 'postId');

    const {users, posts} = storage; 

    const found = users.some(({id}) => id === userId);

    if (!found) throw new Error('users not found');

    const post = posts.find(({id}) => id === postId);

    if (!post) throw new Error ('post not found');

    const  {like} = post;

    const index = likes.indexOf(userId)

    if (index < 0)
        likes.push(userId);
    else
        likes.splice(index,1);

    storage.posts = post;
};