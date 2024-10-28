import { validate } from './helpers'

//logic used to get the comments once the user clicks on the button "view comments"
//we just need the postId for that
export default postId => {
    validate.id(postId, 'postId')
    //i receive the posts and the users
    const users = JSON.parse(localStorage.users)
    const posts = JSON.parse(localStorage.posts)
    //i take the post whose id is the same than the postId
    const post = posts.find(({ id }) => id === postId)
    //if not found...
    if (!post) throw new Error("Post not found")

    const { comments } = post

    comments.forEach(comment => {
        const { author: authorId } = comment

        const { username } = users.find(({ id }) => id === authorId) //de los usuarios, quiero el ID

        comment.author = { id: authorId, username }
    })

    return comments
}