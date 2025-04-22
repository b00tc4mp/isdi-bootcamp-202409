import {storage} from '../data/index.js';
import {validate} from '../data/index.js';

const getPosts = () => {
    validate.id(userId, 'userId');

    const {users, posts} = storage;

    const found = users.some(({id}) => id === userId);

    if (!found) throw new Error('user not found');

    posts.forEach(post => {
        const { author: authorId } = post;

        const { username } = users.find(({id})=> id === authorId);

        post.author = {id: authorId, username};

        post.liked = post.likes.includes(userId);

        post.comments = posts.comments.length;
    });

    return posts.toReversed();
};

export default getPosts;
