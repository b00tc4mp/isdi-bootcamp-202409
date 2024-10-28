import uuid from "../data/uuid"

export default (text, postId) => {
    if (typeof text !== 'string') throw new Error('invalid text')
    if (typeof postId !== 'string') throw new Error('invalid postID');

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found');


    const comment = {
        id: uuid(),
        author: sessionStorage.userId,
        text,
        date: new Date,
    }

    post.comments.push(comment)

    localStorage.posts = JSON.stringify(posts)
}