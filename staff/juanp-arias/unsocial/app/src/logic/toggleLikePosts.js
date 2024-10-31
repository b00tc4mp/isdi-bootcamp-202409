import validate from './helpers/validate'

export default (postId) => {
    validate.id(postId, 'PostID')
    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { likes } = post
    const { userId } = sessionStorage

    const index = likes.indexOf(userId)

    if (index < 0) likes.push(userId)
    else likes.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}
