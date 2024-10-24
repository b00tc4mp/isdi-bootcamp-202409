export default (postId) => {
    const posts = JSON.parse(localStorage.posts)

    const index = posts.findIndex(element => {
        return element.id === postId
    })

    posts.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}