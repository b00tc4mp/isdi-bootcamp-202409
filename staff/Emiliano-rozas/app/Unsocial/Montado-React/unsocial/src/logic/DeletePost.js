function deletePost(post) {

    let posts = JSON.parse(localStorage.posts)

    let postIndex = posts.findIndex(element => {
        return element.id === post.id
    })

    posts.splice(postIndex, 1)

    posts.toReversed()

    localStorage.posts = JSON.stringify(posts)

}

export default deletePost