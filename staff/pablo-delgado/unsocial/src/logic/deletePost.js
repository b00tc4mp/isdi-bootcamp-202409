import { validate } from './helpers'

export default postId => {
    validate.id(postId, 'postId')

    const posts = JSON.parse(localStorage.posts)

    const index = posts.findIndex(({ id }) => id === postId)

    if (index < 0) throw new Error('post not found')

    const post = posts[index]

    const { author } = post

    if (author !== sessionStorage.userId) throw new Error('udrt id not author of post')

    posts.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}