import uuid from '../data/uuid'

export default(userId, postId, text) => {
 
    let posts = JSON.parse(localStorage.getItem('posts'))

    let index = posts.findIndex(post =>
        post.id === postId
    )

    if (index < 0) {
        throw new Error('Post not found')
    }

    let comment = {
        id: uuid(),
        author: userId,
        text: text,
        date: new Date
    }

    posts[index].comments.push(comment)

    localStorage.posts = JSON.stringify(posts)
}