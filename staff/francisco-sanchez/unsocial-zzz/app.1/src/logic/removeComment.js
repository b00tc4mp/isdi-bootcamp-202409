import validate from "./helpers/validate";
import readPost from "./readPost";

export default (postId, commentId) => {
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const posts = JSON.parse(localStorage.posts)
    const post = posts.find(({ id }) => id === postId)
    //const post = readPost(postId)

    const { comments } = post

    //Buscamos el el índex del comentario a eliminar
    const index = comments.findIndex(({ id }) => id === commentId)

    if (index < 0) throw new Error('Comment not found')

    const { author } = comments[index]

    //Validamos que solo el autor de un comentario lo pueda eliminar
    if (author !== sessionStorage.userId) throw new Error('user is not owner of the comment')

    comments.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)

}