import {validite} from "./helpers"

const getComments = postId => {
    validite.id(postId, 'postId')

    const users = JSON.parse(localStorage.users)
    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({id}) => id === postId)

    if (!post) throw new Error('post not found')

    const {comments } = post

    comments.forEach(comment => {
        const {author: authorId} = comment

        const {username} = users.find(({id}) => id === authorId)

        comment.author = {id: authorId, username: username}
    })
}

export default getComments