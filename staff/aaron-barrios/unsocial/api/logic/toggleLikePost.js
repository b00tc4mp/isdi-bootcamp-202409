import { validate } from './helpers/index.js'

import db from 'dat'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const userObjectId = ObjectId.createFromHexString(userId)
    const postObjectId = ObjectId.createFromHexString(postId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found');

            // Declaramos la variable userLiked fuera de las promesas para que te lo coja 
            let userLiked;

            return db.posts.findOne({ _id: postObjectId })
                .catch(error => { throw new Error(error.message) })
                .then(post => {
                    if (!post) throw new Error('post not found');

                    // Asignamos el valor de userLiked
                    userLiked = post.likes.some(like => like._id.equals(userObjectId));

                    // Dependiendo de si ya existe o no el like, usa $pull(quito el like) o $push(doy el like)
                    return db.posts.updateOne(
                        { _id: postObjectId },
                        userLiked
                            ? { $pull: { likes: { _id: userObjectId } } }
                            : { $push: { likes: { _id: userObjectId } } }
                    );
                })
                .then(() => {
                    //imprimo si el post está liked or not
                    console.log(userLiked ? 'unliked post' : 'liked post');
                })
                .catch(error => {
                    throw new Error(error.message);
                });
        });

}