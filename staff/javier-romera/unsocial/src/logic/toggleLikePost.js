function toggleLikePost(postId) {
    if (typeof postId !== 'string') throw new Error('invalid postId')

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { likedBy } = post
    const { loggedInUserId } = sessionStorage

    const index = likedBy.indexOf(loggedInUserId)

    if (index < 0) likedBy.push(loggedInUserId)
    else likedBy.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}

export default toggleLikePost