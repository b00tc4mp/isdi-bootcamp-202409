const likesInteraction = (likes, postId) => {

    const posts = JSON.parse(localStorage.posts)

    posts.forEach(post => {
        if (post.id === postId) {
            post.likedBy.push(likes);
        }
    })
    localStorage.posts = JSON.stringify(posts)
}



// if (!post.likedBy.includes(likes)) {
export default likesInteraction