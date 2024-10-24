import uuid from "../data/uuid"

export default (loggedUser, text, postId) => {
    if (text.length < 6) { throw new Error('Comment is too short') }
    const posts = JSON.parse(localStorage.posts)

    const index = posts.findIndex(element => {
        return element.id === postId
    })

    const comment = {
        id: uuid(),
        author: loggedUser,
        text: text,
        date: new Date
    }

    posts[index].comments.push(comment)

    localStorage.posts = JSON.stringify(posts)
}