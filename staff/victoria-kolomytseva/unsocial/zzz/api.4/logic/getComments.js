import db from 'dat';
import { validate } from 'com'

const { ObjectId } = db;

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const objectUserId = ObjectId.createFromHexString(userId);
    return db.users
        .findOne({ _id: objectUserId })
        .catch((error) => new Error(error.message))
        .then((user) => {
            if (!user) throw new Error("user not found");

            return db.posts
                .findOne({ _id: ObjectId.createFromHexString(postId) })
                .catch((error) => new Error(error.message))
                .then((post) => {
                    if (!post) throw new Error("post not found");

                    return db.users
                        .find()
                        .toArray()
                        .then((users) => {
                            const { comments } = post;

                            comments.forEach((comment) => {
                                const { author: authorId } = comment;
                                const { username } = users.find((user) =>
                                    user._id.equals(authorId)
                                );
                                comment.author = { _id: authorId, username };
                            });
                            return comments;
                        });
                });
        });
};



