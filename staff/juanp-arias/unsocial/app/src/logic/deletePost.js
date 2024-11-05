import { validate } from 'com'

export default postId => {
    validate.id(postId, 'postId')
    const posts = JSON.parse(localStorage.posts)

    const index = posts.findIndex(({ id }) => id === postId)


    if (index < 0) throw new Error('post not found')

    posts.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}
//función deletePost para eliminar los posts que queremos, le estamos dando funcionalidad a el botón delete