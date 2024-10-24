const deletePost = (postId) => {
    let posts = JSON.parse(localStorage.posts)
    
    let postIndex = posts.findIndex(element =>{ 
        return element.id === postId })
    
    posts.splice(postIndex, 1)
    
    posts.toReversed()

    localStorage.posts = JSON.stringify(posts)

}  

export default deletePost