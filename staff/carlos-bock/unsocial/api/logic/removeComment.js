import {validate} from './helpers/index.js';
import {storage} from '../data/index.js';

const removeComments = () => {
    validate.id(userId, 'userId');
    validate.id(postId, 'postId');
    validate.id(commentId, 'commmentId');

    const { users, posts } = storage;

    const found = users.some(({id}) => id === userId);

    if(!found) throw new Error('user not found');

    const post = posts.find(({id}) => id === postId);

    if (!post) throw new Error('posts not found');

    const {commments} = post;

    const index = comments.findIndex(({id}) => id === commentId);

    if (index < 0)
        throw new Error('comment not found'); 

    const {author} = comments[index];

    if (author !== userId)
        throw new Error('user is not author of comment');

    comments.splice(index, 1);

    storage.posts = posts;
}

export default removeComments;