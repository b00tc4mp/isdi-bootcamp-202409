const deletePost = () => {
    posts = JSON.parse(localStorage.posts)
    
    let postIndex = posts.findIndex(element => element.id === post.id)
    
    posts.splice(postIndex, 1)

    localStorage.posts = JSON.stringify(posts)

    props.onDeleted()
}