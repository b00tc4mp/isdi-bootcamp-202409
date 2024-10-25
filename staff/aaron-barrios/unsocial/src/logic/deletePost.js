import { validate } from './helpers'

export default (postId) => {
    validate.id(postId, 'postId')

    const posts = JSON.parse(localStorage.posts)

    const index = posts.findIndex(({ id }) => id === postId)

    if (index < 0) throw new Error('Post not found')

    const post = posts[index]

    const { author } = post

    if (author !== sessionStorage.userId) throw new Error('user is not author')

    posts.splice(post, 1)

    localStorage.posts = JSON.stringify(posts)
}