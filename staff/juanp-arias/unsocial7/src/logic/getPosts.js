const getPosts = () => {
    const posts = JSON.parse(localStorage.posts)
    return posts.toReversed()
}
export default getPosts
//TODO lógica en la misma función de author