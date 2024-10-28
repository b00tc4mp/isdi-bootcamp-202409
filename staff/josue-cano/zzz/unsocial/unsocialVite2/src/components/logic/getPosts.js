const getPosts = () => {
    const posts = JSON.parse(localStorage.getItem("posts"))

    return posts.toReversed()
}

const likePost = (postId, usuario) => {
    const posts = JSON.parse(localStorage.getItem("posts"))
    const post = posts.find(item => item.id == postId)

    if (post != undefined) {
        const user = post.fans.find(item => item == usuario)
        if (user == undefined) {
            post.fans.push(usuario)
            post.fans=post.fans.filter(x=>x)
            localStorage.setItem("posts", JSON.stringify(posts));
        }
        else {
            const fans = post.fans.filter(fan => fan != user)
            post.fans = fans
            localStorage.setItem("posts", JSON.stringify(posts));
        }
    }

}

const isFan = (postId, usuarioId) => {
    const posts = JSON.parse(localStorage.getItem("posts"))
    const post = posts.find(item => item.id == postId)

    if (post != undefined) {
        const user = post.fans.find(item => item == usuarioId)
        if (user == undefined) {
            return false

        } else {
            return true
        }
    }
}

// export default getPosts
export { likePost, getPosts, isFan }