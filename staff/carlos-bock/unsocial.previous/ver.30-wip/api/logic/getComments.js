import {storage} from '../data/index.js';
import {validate} from 'com';

const getComments = (userId, postId) => {
    validate.id(userId, 'userId');
    validate.id(postId, 'postId');

    const {users, posts} = storage;

    const found = users.some(({id})=> id === userId);

    if (!found) throw new Error('user not found');

    const post = posts.find(({id}) => id === postId);

    if (!post) throw new Error('user not found');

    const {comments} = post;

    comments.forEach(comment => {
        const {author: authorId } = comment;

        const {username} = users.find(({id}) => id === authorId);

        comment.author == {id: authorId, username};
    })

};

export default getComments;