import {validate} from './helpers'

const removeComment = (postId, commentId) => {
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const posts = JSON.parse(localStorage.posts);

    const post = posts.find(({id}) => id === postId)

    const {comments} = post

    const index = comments.findIndex(({id}) => id === commentId)

    if (index < 0) throw new Error('comment not found')

    const {author} = comments[index]

    if (author !== sessionStorage.usderId) throw new Error('user is not is not author of comment')

    comments.splice(index,1)

    localStorage.posts = JSON.stringify(posts)
}

export default removeComment