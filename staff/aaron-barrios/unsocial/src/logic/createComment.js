
import getElapsedTime from '../utils/getElapsedTime'

export default (postId, textarea) => {
    if (typeof textarea !== 'string') throw new Error('invalid textarea')

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)
    // const post = posts[0]

    if (!post) throw new Error('post not found')

    const { comments } = post

    comments.push(textarea)

    localStorage.posts = JSON.stringify(posts)

    // date = getElapsedTime()
}