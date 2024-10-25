import { validate } from './helpers'

export default (postId) => {
    validate.id(postId, 'postId')

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { likedBy } = post
    const { userId } = sessionStorage

    const index = likedBy.indexOf(userId)

    if (index < 0) likedBy.push(userId)
    else likedBy.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}