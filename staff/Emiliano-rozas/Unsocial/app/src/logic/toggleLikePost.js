import { validate } from './helpers'

export default (postId) => {
    validate.id(postId, 'postId')

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('Post not found')

    const { likedby } = post
    const { userId } = sessionStorage

    const index = likedby.indexOf(userId)

    if (index < 0) likedby.push(userId)

    else likedby.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}