import validate from './helpers/validate.js'
import { storage } from '../data/storage.js'

export default (postId, commentId) => {
    validate.id(postId, 'Post ID')
    validate.id(commentId, 'Comment ID')

    const { posts } = storage
    const post = posts.find(({ id }) => id === postId)

    const { comments } = post

    const index = comments.findIndex(({ id }) => id === commentId)

    if (index < 0) throw new Error('comment not found')

    const { author } = comments[index]

    if (author !== sessionStorage.userId) throw new Error('not your post')

    comments.splice(index, 1)

    storage.posts = posts
}
