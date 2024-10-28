function toggleLikePost(postId) {
    if (typeof postId !== 'string') throw new Error('invalid postId')

        const posts = JSON.parse(localStorage.posts)

        const post = posts.find(({id}) => id === postId)

        const {likes } = post
        const { userId } = sessionStorage
        const index = likes.indexOf(userId)

        if (index < 0) likes.push(userId)
        else likes.splice(index, 1)

        localStorage.posts = JSON.stringify(posts)
}

export default toggleLikePost