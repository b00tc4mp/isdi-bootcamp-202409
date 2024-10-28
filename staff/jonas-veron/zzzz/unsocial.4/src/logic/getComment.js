
export default (postId) => {
    let posts = JSON.parse(localStorage.posts)

    let index = posts.findIndex(post => {
        post.id === postId
    })

    let comments = posts[index].comments

    return comments
}